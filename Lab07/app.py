from flask import Flask, render_template, redirect, url_for, flash, request, session
from flask_sqlalchemy import SQLAlchemy
from config import Config
from models import db, User
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

with app.app_context():
    db.create_all()

def validate_password(password):
    errors = []
    if not any(char.islower() for char in password):
        errors.append('Password must contain a lowercase letter')
    if not any(char.isupper() for char in password):
        errors.append('Password must contain an uppercase letter')
    if not password[-1].isdigit():
        errors.append('Password must end in a number')
    if len(password) < 8:
        errors.append('Password must be at least 8 characters long')
    return errors

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            return redirect(url_for('secretPage'))
        else:
            flash('Invalid username or password, if new user try to signup')
    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        email = request.form['email'].lower()
        password = request.form['password']
        errors = validate_password(password)
        confirm_password = request.form['confirm_password']
        if len(errors)!=0:
            flash(errors)
        elif password != confirm_password:
            flash('Passwords do not match')
        elif User.query.filter_by(email=email).first():
            flash('Email already exists try logging in')
        else:
            user = User(first_name=first_name, last_name=last_name, email=email)
            user.set_password(password)
            db.session.add(user)
            db.session.commit()
            return redirect(url_for('thankyou'))
    return render_template('signup.html')

@app.route('/secretPage')
def secretPage():
    return render_template('secretPage.html')

@app.route('/thankyou')
def thankyou():
    return render_template('thankyou.html')

if __name__ == '__main__':
    app.run(debug=True)
