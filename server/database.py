import mysql.connector
import sys
from mysql.connector import Error

'''
database structure :
1. users table - user_id (primary auto inc), name, email, password, user_type
2. tests table - test_id (primary auto inc), test_name, test_content (questions and answers in json), 
'''


class DBHelper:

    def __init__(self):
        try:
            self.conn = mysql.connector.connect(host='localhost',
                                                user='root',
                                                password='',
                                                database='Hackathon DU')
            self.cursor = self.conn.cursor()
        except Error as e:
            sys.exit(f'Could not connect to database: {e}')
        else:
            print('Connected to database successfully')

    def signup(self, name, password, email, accountType):
        try:
            query = """
        INSERT INTO users (user_id, name, email, password, user_type)
        VALUES (NULL, %s, %s, %s, %s)
        """
            self.cursor.execute(query, (name, email, password, accountType))
            self.conn.commit()
            print("User added successfully")

            # Return newly created user information
            query = "SELECT * FROM users WHERE email=%s AND password=%s"
            self.cursor.execute(query, (email, password))
            query_response = self.cursor.fetchone()
            user_data = {
                'user_id': query_response[0],
                'user_name': query_response[1],
                'email': query_response[2],
                'password': query_response[3],
                'acc_type': query_response[4]
            }
            return user_data
        except Error as e:
            print(f"An error occurred: {e}")
            self.conn.rollback()
            return None

    def login(self, email, password):
        try:
            query = "SELECT * FROM users WHERE email=%s AND password=%s"
            self.cursor.execute(query, (email, password))
            query_response = self.cursor.fetchone()
            if query_response:
                user_data = {
                    'user_id': query_response[0],
                    'user_name': query_response[1],
                    'email': query_response[2],
                    'password': query_response[3],
                    'acc_type': query_response[4]
                }
                return user_data
            else:
                return -1
        except Error as e:
            print(f"An error occurred: {e}")
            self.conn.rollback()
            return None

    def save_test(self, test_name, test_data, user_id):
        try:
            query = """
        INSERT INTO tests (test_id, test_name, test_data, user_id)
        VALUES (NULL, %s, %s, %s)  -- Added placeholder for user_id
        """
            self.cursor.execute(query, (test_name, test_data, user_id))  # Now passing three values
            self.conn.commit()
            print("Test added successfully")

        except Error as e:
            print(f"An error occurred: {e}")
            self.conn.rollback()
            return None

    def close_connection(self):
        self.cursor.close()
        self.conn.close()
        print("Database connection closed.")
