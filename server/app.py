from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def hello():
    return 'Hello, world!'

@app.route('/api/uploadTest', methods=['POST'])
def upload_test():
    print("Request received on /api/uploadTest")  # Log the request

    # Check for the presence of a file and test name
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    if 'testName' not in request.form or request.form['testName'] == '':
        return jsonify({"error": "Test name is required."}), 400

    test_name = request.form['testName']
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

        # Create a JSON response
        json_response = {
            "testName": test_name,
            "questions": questions_list
        }

        # Print the response to the terminal
        print("Generated JSON Response:", json_response)

        return jsonify(json_response), 200  # Return the final response

    except Exception as e:
        print("Error processing file:", e)
        return jsonify({"error": "An error occurred while processing the file"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
