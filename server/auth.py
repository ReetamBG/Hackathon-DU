from flask import Blueprint, request, jsonify
from data import users
from database import DBHelper
import pickle

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


    # storing user_id as global variable dont ask me why or how and what ye kaam nahi kar raha dimaag kharab ho gaya hai
    pickle.dump(user_data['user_id'], open('user_id.pkl', 'wb'))


    return jsonify({
        'message': 'signup successfull',
        'user_data': user_data
    }), 200


@auth_bp.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    print(data)

    user_data = db.login(email=data['email'],
                         password=data['password'])
    print(user_data)


    # storing user_id as global variable dont ask me why or how and what ye kaam nahi kar raha dimaag kharab ho gaya hai
    pickle.dump(user_data['user_id'], open('user_id.pkl', 'wb'))


    return jsonify({
        'message': 'login successfull',
        'user_data': user_data
    }), 200
