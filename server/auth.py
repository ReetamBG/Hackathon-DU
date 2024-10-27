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
    print(data)

    status = db.login(email=data['email'],
                      password=data['password'])
    if status == 1:
        return jsonify({'message': 'User authenticated successfully'}), 200

    return jsonify({'message': 'Either email or password not correct'}), 402
