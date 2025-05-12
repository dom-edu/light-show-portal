from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

def dynamic_origin(origin):
    # Return the origin string if valid, None otherwise
    if origin and (origin.endswith(".github.dev") or origin.endswith(".app.github.dev")):
        return origin
    return None

CORS(app, origins="*", supports_credentials=True)

@app.route("/")
def home():
    return "sdfds"

@app.route("/api/send-hex", methods=["POST", "OPTIONS"])
def send_hex():
    print("INSIDE BACKEND")
    if request.method == "OPTIONS":
        response = jsonify({"message": "Preflight Accepted"})
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "POST")
        return response, 204

    try:
        data = request.get_json()
        hex_data = data.get("hex")

        if not hex_data:
            return jsonify({"error": "Hex data is missing or invalid"}), 400

        print(f"Received hex data: {hex_data[:50]}...")
        return jsonify({
            "message": "Hex data received successfully!",
            "length": len(hex_data)
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
