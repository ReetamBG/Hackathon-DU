import json  # Import json to handle conversion
from flask import Blueprint, request, jsonify
import pandas as pd

ai_bp = Blueprint('ai', __name__)


@ai_bp.route('/api/getHint', methods=['POST'])
def get_hint():
    data = request.get_json()
    hint = data.get('questionText')
    print(f"Request received on /api/getHint", data)
    json_response = {
        'hint': hint
    }
    print('Json response generated', jsonify(json_response))
    return jsonify({'hint': data})
