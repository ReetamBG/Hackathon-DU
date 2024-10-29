import json  # Import json to handle conversion
from flask import Blueprint, request, jsonify
import pandas as pd
from huggingface_hub import InferenceClient

ai_bp = Blueprint('ai', __name__)


@ai_bp.route('/api/getHint', methods=['POST'])
def get_hint():
    data = request.get_json()
    print(f"Request received on /api/getHint: {data}")

    client = InferenceClient(api_key="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")

    # Define a single question
    question = data

    messages = [
        {"role": "user", "content": f"{question} Provide a minor hint of 10 words."}
    ]

    stream = client.chat.completions.create(
        model="Qwen/Qwen2.5-72B-Instruct",
        messages=messages,
        max_tokens=100,
        stream=True
    )

    hint = ""
    for chunk in stream:
        hint += chunk.choices[0].delta.content + " "

    json_response = {
        'hint': hint  # Send the actual hint text here
    }
    print('Json response generated', json_response)
    return jsonify(json_response)  # Return the hint response directly

