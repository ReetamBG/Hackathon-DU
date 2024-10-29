import json  # Import json to handle conversion
from flask import Blueprint, request, jsonify
import pandas as pd

ai_bp = Blueprint('ai', __name__)

@ai_bp.route('/api/getHint', methods=['POST'])
def get_hint():
    data = request.get_json()
    hint = "This is a hint for the question"  # You can customize the hint text here

    print(f"Request received on /api/getHint: {data}")
    json_response = {
        'hint': hint  # Send the actual hint text here
    }
    print('Json response generated', json_response)
    return jsonify(json_response)  # Return the hint response directly

