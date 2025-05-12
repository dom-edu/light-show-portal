from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": True,
        "max_age": 86400
    }
})

@app.route("/")
def home():
    return "sdfds"

@app.route("/api/send-hex", methods=["POST", "OPTIONS"])
def send_hex():
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
        
        print(f"Received hex data: {hex_data[:50]}...")  # Log first 50 chars
        
        return jsonify({
            "message": "Hex data received successfully!",
            "length": len(hex_data)
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500