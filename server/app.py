from flask import Flask
from flask_cors import CORS
from auth import auth_bp  # Import the auth blueprint
from file_upload import file_upload_bp  # Import the file upload blueprint
from ai import ai_bp
import pickle

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Register the blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(file_upload_bp)
app.register_blueprint(ai_bp)


@app.route('/')
def hello():
    return 'Hello, world!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
