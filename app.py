from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html", title="Home")

@app.route("/arcade")
def arcade():
    return render_template("arcade.html", title="Arcade")

@app.route("/team")
def team():
    return render_template("team.html", title="Team")

