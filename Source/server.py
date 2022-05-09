from os import times
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import json
# from waitress import serve

app = Flask(__name__)

with open('./static/lesson.json') as f:
    lesson = json.load(f)
with open('./static/quiz.json') as f1:
    quiz = json.load(f1)["quiz"]

right_choices = [-1 for i in range(10)]

# ROUTES
@app.route('/')
def home():
    global right_choices, quiz
    right_choices = [-1 for i in range(10)]
    for i in range(10):
        quiz[str(i+1)]["chosen"] = "Q"
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

@app.route('/quiz/<id>')
def quizyourself(id = None):
    global right_choices
    return render_template('quiz.html', quiz = quiz[id], id = id, right = right_choices)

@app.route('/quiz/<id>', methods=['POST'])
def add_right(id=None):
    global right_choices
    global quiz
    json_data = request.get_json() 
    print(json_data)
    value = json_data["right"]
    if value == "clear":
        right_choices = [-1 for i in range(10)]
        for i in range(10):
            quiz[str(i+1)]["chosen"] = "Q"
        return jsonify({"result":right_choices})
    else: 
        idx = json_data["id"]
        quiz[str(idx)]["chosen"] = value
        if quiz[str(idx)]["chosen"] == quiz[str(idx)]["answer"]:
            right_choices[idx-1] = 1
        else:
            right_choices[idx-1] = 0
    print(right_choices)
    return jsonify({"result":right_choices, "quiz":quiz[str(idx)]})



if __name__ == '__main__':
   app.run(debug=True)
   # serve(app, host='0.0.0.0', port=80)




