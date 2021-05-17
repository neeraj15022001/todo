import os
from flask import Flask, render_template, request, redirect, url_for, jsonify, json
from forms import ToDo
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS



app = Flask(__name__)
app.config["SECRET_KEY"] = 'password'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tmp/test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
port = int(os.environ.get('PORT', 33507))
CORS(app)

class ToDoModel(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    content = db.Column(db.Text, nullable = False)

    def __str__(self):
        return f'{self.id} {self.content}'


def todo_serializer(todo):
    return {
        'id' : todo.id,
        'content' : todo.content
    }

@app.route('/api', methods=['GET'])
def index():
    return jsonify([*map(todo_serializer, ToDoModel.query.all())])


@app.route('/api/create', methods=['POST'])
def create():
    request_data = json.loads(request.data)
    todo = ToDoModel(content=request_data['content'])

    db.session.add(todo)
    db.session.commit()

    return {'201':'todo created successfully'}


@app.route('/api/<int:id>', methods=['GET'])
def show(id):
    return jsonify([*map(todo_serializer, ToDoModel.query.filter_by(id=id))])


if __name__ == "__main__":
    app.run(debug=True, port=port)