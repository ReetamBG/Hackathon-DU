from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

users = []  # This should ideally be replaced with a database

@app.route('/')
def hello():
    return 'Hello'

@app.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.get_json()

    if not data:
        return jsonify({"message": "No data received"}), 400


    # Hash the password
    # hashed_password = generate_password_hash(data['password'])

    # Append new signup to users table
    users.append({
        "Name": data['Name'],
        "email": data['email'],
        # "password": hashed_password,
        "password" : data['password'],
        "accountType": data.get('accountType', 'student')
    })

    print(users)
    return jsonify({"message": "Account created successfully"}), 201


@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    print(data)

    for user in users:
        if user['email'] == data['email'] and user['password'] == data['password']:
            return jsonify({'message': 'User authenticated successfully'}), 200

        return jsonify({'message': 'Either email or password not correct'}), 402


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
