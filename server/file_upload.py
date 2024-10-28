import json  # Import json to handle conversion
from flask import Blueprint, request, jsonify
import pandas as pd
from database import DBHelper
import pickle

file_upload_bp = Blueprint('file_upload', __name__)


@file_upload_bp.route('/api/uploadTest', methods=['POST'])
def upload_test():
    db = DBHelper()
    print("Request received on /api/uploadTest")  # Log the request

    test_name = request.form['testName']
    user_id = pickle.load(open('user_id.pkl', 'rb'))
    file = request.files['file']

    # Process the file inside the try block
    # Process the file inside the try block
    try:
        # Process the file (assuming it's a CSV or Excel file)
        if file.filename.endswith('.csv'):
            df = pd.read_csv(file)
        elif file.filename.endswith(('.xlsx', '.xls')):
            df = pd.read_excel(file)
        else:
            return jsonify({"error": "File type not supported"}), 400

        # Remove any rows that are entirely NaN
        df = df.dropna(how='all')

        # Assuming the file has these specific columns
        questions_list = []
        for index, row in df.iterrows():
            question = row['Question']
            options = {
                "A": row['Option A'],
                "B": row['Option B'],
                "C": row['Option C'],
                "D": row['Option D']
            }
            correct_answer = row['Correct Answer']
            questions_list.append({
                "question": question,
                "options": options,
                "correctAnswer": correct_answer
            })

        # Convert questions_list to a JSON string
        questions_json = json.dumps(questions_list)

        # Create a JSON response
        json_response = {
            "testName": test_name,
            "questions": questions_list,
            "userId": user_id
        }

        # Print the response to the terminal
        print("Generated JSON Response:", json_response)

        # Insert into the database
        db.save_test(test_name=test_name, test_data=questions_json, user_id=user_id)

        return jsonify(json_response), 200  # Return the final response

    except Exception as e:
        print("Error processing file:", e)
        return jsonify({"error": "An error occurred while processing the file"}), 500


@file_upload_bp.route('/api/refreshTest', methods=['POST'])
def get_test():
    print('request on /api/refreshTest')
    db = DBHelper()
    user_id = pickle.load(open('user_id.pkl', 'rb'))
    test_list = db.get_test_list(user_id=user_id)
    print(test_list)
    return test_list, 200


@file_upload_bp.route('/api/refreshTestAll', methods=['POST'])
def get_test_all():
    print('request on /api/refreshTest')
    db = DBHelper()
    test_list = db.get_test_list_all()
    print(test_list)
    return test_list, 200


@file_upload_bp.route('/api/getTestById', methods=['POST'])
def fetch_test():
    db = DBHelper()
    data = request.get_json()
    test_id = data.get('test_id')
    print(f"Request received on /api/fetchTest with test_id: {test_id}")

    try:
        # Fetch the test data from the database
        test_data = db.get_test(test_id=test_id)

        # Log the output to inspect its structure
        print("Fetched test_data:", test_data)

        if test_data is None:
            return jsonify({"error": "Test not found"}), 404

        # Check if test_data is a tuple
        if isinstance(test_data, tuple):
            # Log tuple structure
            print("Tuple structure:", test_data)

            # Access the elements of the tuple using indices
            test_name = test_data[0]  # Adjust according to your database structure
            questions_list = json.loads(test_data[1])  # Assuming the second element is the JSON string
            user_id = test_data[2]  # Assuming the third element is the user ID

            json_response = {
                "testName": test_name,
                "questions": questions_list,
                "userId": user_id
            }
        else:
            # Handle the case where test_data is a dictionary
            questions_list = json.loads(test_data['test_data'])
            json_response = {
                "testName": test_data['test_name'],
                "questions": questions_list,
                "userId": test_data['user_id']
            }

        print("Generated JSON Response:", json_response)
        return jsonify(json_response), 200

    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({"error": "An error occurred while fetching the test"}), 500



