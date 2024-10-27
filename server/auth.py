from flask import Blueprint, request, jsonify
from data import users
from database import DBHelper

auth_bp = Blueprint('auth', __name__)
db = DBHelper()    # connecting to the database


@auth_bp.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.get_json()
    print(data)

    db.signup(name=data['name'],
              password=data['password'],
              email=data['email'],
              accountType=data['accountType'])

    return jsonify({'message': 'Account created successfully'}), 201


@auth_bp.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()

    for user in users:
        # Verify email and hashed password match
        if user['email'] == data['email'] and user['password'] == data['password']:
            return jsonify({'message': 'User authenticated successfully'}), 200

    return jsonify({'message': 'Either email or password not correct'}), 402
