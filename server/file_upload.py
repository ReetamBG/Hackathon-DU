import json  # Import json to handle conversion
from flask import Blueprint, request, jsonify
import pandas as pd
from database import DBHelper

file_upload_bp = Blueprint('file_upload', __name__)


@file_upload_bp.route('/api/uploadTest', methods=['POST'])
def upload_test():
    db = DBHelper()
    print("Request received on /api/uploadTest")  # Log the request

    test_name = request.form['testName']
    user_id = request.form.get('userId')  # Use .get() to avoid KeyError
    file = request.files['file']

    # Process the file inside the try block
    try:
        # Process the file (assuming it's a CSV or Excel file)
        if file.filename.endswith('.csv'):
            df = pd.read_csv(file)
        elif file.filename.endswith(('.xlsx', '.xls')):
            df = pd.read_excel(file)
        else:
            return jsonify({"error": "File type not supported"}), 400

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
