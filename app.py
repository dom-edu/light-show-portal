from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/")
def home():
    return "sdfds"

@app.route("/api/send-hex", methods=["POST"])
def send_hex():
    try:
        data = request.get_json()
        hex_data = data.get("hex")

        if not hex_data:
            return jsonify({"error": "Hex data is Missing or invalid"}), 400
        
        print(f"Received hex data with a value of {hex_data}", "...")
        
        # Response back to client
        return jsonify({"message": "Hex data received successfully!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)