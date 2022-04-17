from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import json

app = Flask(__name__)

f = open('../lesson.json')
lesson = json.load(f)

# ROUTES
@app.route('/')
def home():
   return render_template('home.html', lesson = lesson)   

@app.route('/lesson')
def menu():
    return render_template('menu.html', lesson = lesson)

@app.route('/lesson/clef/<id>')
def clef(id = None):
    return render_template('clef.html', lesson = lesson["clef"][id], id = id)

@app.route('/lesson/staff/<id>')
def staff(id = None):
    return render_template('staff.html', lesson = lesson["staff"][id], id = id)

if __name__ == '__main__':
   app.run(debug = True)




