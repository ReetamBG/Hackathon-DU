import mysql.connector
import sys
from mysql.connector import Error

'''
database structure :
1. users table - user_id (primary auto inc), name, email, password, user_type
2. tests table - test_id (primary auto inc), test_name, test_data (questions and answers in json), user_id
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
        VALUES (NULL, %s, %s, %s)
        """
            self.cursor.execute(query, (test_name, test_data, user_id))
            self.conn.commit()
            print("Test added successfully")

        except Error as e:
            print(f"An error occurred: {e}")
            self.conn.rollback()
            return None

    def get_test_list(self, user_id):
        try:
            # Retrieve the user's name based on user_id
            query_user = "SELECT name FROM users WHERE user_id = %s"
            self.cursor.execute(query_user, (user_id,))  # Add a comma after user_id
            user_name = self.cursor.fetchone()

            # Check if the user exists
            if not user_name:
                return {"error": "User not found"}

            # Retrieve all tests created by the user
            query_tests = "SELECT test_id, test_name FROM tests WHERE user_id = %s"
            self.cursor.execute(query_tests, (user_id,))  # Add a comma after user_id
            test_data = self.cursor.fetchall()

            # Format the result
            test_list = [{
                "test_id": test[0],
                "test_name": test[1]
            } for test in test_data]

            return {
                "user_name": user_name[0],
                "test_list": test_list
            }

        except Error as e:
            print(f"An error occurred: {e}")
            return {"error": "An error occurred while fetching tests"}

    def get_test_list_all(self):
        try:
            # Retrieve all tests with user_id, test_id, test_name, and user_name by joining with the users table
            query_tests = """
        SELECT t.user_id, t.test_id, t.test_name, u.name AS user_name
        FROM tests t
        JOIN users u ON t.user_id = u.user_id
        """
            self.cursor.execute(query_tests)
            test_data = self.cursor.fetchall()

            # Format the result to include user_id, test_id, test_name, and user_name
            test_list = [{
                "test_id": test[1],
                "test_name": test[2],
                "user_name": test[3]
            } for test in test_data]

            return {
                "test_list": test_list
            }

        except Error as e:
            print(f"An error occurred: {e}")
            return {"error": "An error occurred while fetching tests"}


    def get_test(self, test_id):
        query = "SELECT * FROM tests WHERE test_id=%s"
        self.cursor.execute(query, (test_id,))
        response = self.cursor.fetchone()
        return response


    def close_connection(self):
        self.cursor.close()
        self.conn.close()
        print("Database connection closed.")
