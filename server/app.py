from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

users = []


@app.route('/')
def hello():
    return 'Hello'


@app.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.get_json()

    # Validate the incoming data
    if not data:
        return jsonify({"message": "No data received"}), 400

    # Check if passwords match
    # if data['password'] != data['confirmPassword']:
    #     return jsonify({"message": "Passwords do not match"}), 400

    # append ne signup to users
    users.append({
        "firstName": data['firstName'],
        "lastName": data['lastName'],
        "email": data['email'],
        "password": data['password'],
        "accountType": data.get('accountType')
    })

    print(users)

    return jsonify({"message": "Account created successfully"}), 201


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
