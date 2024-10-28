from flask import Blueprint, request, jsonify
from data import users
from database import DBHelper

auth_bp = Blueprint('auth', __name__)
db = DBHelper()    # connecting to the database


@auth_bp.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.get_json()

    user_data = db.signup(name=data['name'],
                          password=data['password'],
                          email=data['email'],
                          accountType=data['accountType'])
    print(user_data)
    return jsonify({
        'message' : 'signup successfull',
        'user_data' : user_data
    }), 200


@auth_bp.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    print(data)

    user_data = db.login(email=data['email'],
                         password=data['password'])
    print(user_data)
    return jsonify({
        'message' : 'login successfull',
        'user_data' : user_data
    }), 200

    return jsonify({'message': 'Either email or password not correct'}), 402
