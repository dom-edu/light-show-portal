from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html", title="Home")

# todo: Look into dynamic routing.
@app.route("/arcade")
def arcade():
    return render_template("arcade.html", title="Arcade")
