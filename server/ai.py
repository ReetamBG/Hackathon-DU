import json  # Import json to handle conversion
from flask import Blueprint, request, jsonify
from huggingface_hub import InferenceClient
import re

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


@ai_bp.route('/api/getAiTest', methods=['POST'])
def get_ai_test():
    data = request.get_json()
    print('Request received on /api/getAiTest', data)


    #
    # args = [{'correctAnswer': 'Delhi', 'options': {'A': 'Delhi', 'B': 'Guwahati', 'C': 'Pune', 'D': 'Bihar'}, 'question': 'What is the capital of India? '}, {'correctAnswer': 'Red Fort', 'options': {'A': 'Sanchi Stupa', 'B': 'Rang Ghar', 'C': 'Red Fort', 'D': 'Kamakhya Temple'}, 'question': 'What is a historical monument located in Delhi? '}, {'correctAnswer': 'Delhi', 'options': {'A': 'Assam', 'B': 'Delhi', 'C': 'Rajasthan', 'D': 'J&K'}, 'question': 'Which among the following is an Union Territory?'}]



    client = InferenceClient(api_key="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")
    qa_data= data['questions']

    # Prompt for AI
    messages = [{"role": "user", "content": "change the questions so that the answers remain the same but the questions are different and provide them in JSON format with only the questions, options, and correct answers:"}]
    for item in qa_data:
        question_prompt = {
            "question": item["question"],
            "options": item["options"],
            "correctAnswer": item["correctAnswer"]
        }
        messages.append({"role": "user", "content": json.dumps(question_prompt)})

    # Pass the messages to the model
    response = client.chat.completions.create(
        model="Qwen/Qwen2.5-72B-Instruct",
        messages=messages,
        max_tokens=500
    )

    json_output = None

    # Attempt to parse the response as JSON
    try:
        # Print the raw response to understand the format
        raw_response = response.choices[0].message.content
        # print("kk")
        # print(raw_response)

        # Use a regex to extract JSON-like content from the response
        json_match = re.search(r'(\[.*\])', raw_response, re.DOTALL)

        if json_match:
            json_content = json_match.group(1)
            reframed_questions = json.loads(json_content)
            output_json = json.dumps(reframed_questions, indent=2)
            print("22")
            # print(output_json)
            print(type(output_json))

            # convert string to  object
            json_output = json.loads(output_json)

            # check new data type
            print(type(json_output))
            print(json_output)
        else:
            print("Error: No valid JSON found in the response.")
    except json.JSONDecodeError:
        print("Error: The model response was not valid JSON.")

    to_return = {
        'questions': json_output
    }

    print('sending response to client', to_return, jsonify(to_return))
    return jsonify(to_return)

