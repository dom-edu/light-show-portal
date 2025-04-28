from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

state = {
    "cube_size": 4,          
    "sphere_radius": 3,
    "active_pattern": None,  # "Heart", "Cube", etc.
    "hex_data": ""           
}

@app.route("/")
def home():
    return render_template("index.html", title="Home")

@app.route("/arcade")
def arcade():
    return render_template("arcade.html", title="Arcade")

@app.route("/team")
def team():
    return render_template("team.html", title="Team")

@app.route("/light_show")
def light_show():
    return render_template(
        "light_show.html", 
        title="Light_Show", 
        state=state  
    )

@app.route("/light_show/update", methods=["POST"])
def handle_updates():
    """The ONLY endpoint needed for updates"""
    updates = request.get_json()
    state.update(updates)
    
    # Return FULL updated state to maintain consistency
    return jsonify(state)