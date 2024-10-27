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
    print(data)    # just to check

    # Validate the incoming data
    if not data:
        return jsonify({"message": "No data received"}), 400

    # append new signup to users table
    users.append({
        "firstName": data['firstName'],
        "lastName": data['lastName'],
        "email": data['email'],
        "password": data['password'],
        "accountType": data.get('accountType')
    })

    return jsonify({"message": "Account created successfully"}), 201


@app.route('/api/auth/login/', methods=['POST'])
def login():
    data = request.get_json()
    for user in users:
        if user['email'] == data['email'] and user['password'] == data['password']:
            return jsonify({'User Authenticated'})
        else:
            return jsonify({'Either user or password or both not correct'}), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
