from flask import Blueprint, request, jsonify
from data import users

auth_bp = Blueprint('auth', __name__)

# In-memory user storage (use a database in production)
# users = []

@auth_bp.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.get_json()

    # Append new signup to users table
    users.append({
        "firstName": data['firstName'],
        "lastName": data['lastName'],
        "email": data['email'],
        "password": data['password'],
        "accountType": data.get('accountType', 'student')
    })

    for user in users:
        print(users)  # For debugging purposes only; remove in production

    return jsonify({"message": "Account created successfully"}), 201


@auth_bp.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()

    for user in users:
        # Verify email and hashed password match
        if user['email'] == data['email'] and user['password'] == data['password']:
            return jsonify({'message': 'User authenticated successfully'}), 200

    return jsonify({'message': 'Either email or password not correct'}), 402
