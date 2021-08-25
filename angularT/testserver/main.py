from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
data = [
    {
        "id": 7,
        "email": "michael.lawson@reqres.in",
        "first_name": "Michael",
        "last_name": "Lawson",
    },
    {
        "id": 8,
        "email": "lindsay.ferguson@reqres.in",
        "first_name": "Lindsay",
        "last_name": "Ferguson",
    },
    {
        "id": 9,
        "email": "tobias.funke@reqres.in",
        "first_name": "Tobias",
        "last_name": "Funke",
    },
    {
        "id": 10,
        "email": "byron.fields@reqres.in",
        "first_name": "Byron",
        "last_name": "Fields",
    },
    {
        "id": 11,
        "email": "george.edwards@reqres.in",
        "first_name": "George",
        "last_name": "Edwards",
    },
    {
        "id": 12,
        "email": "rachel.howell@reqres.in",
        "first_name": "Rachel",
        "last_name": "Howell",
    }
]


@app.route('/get', methods=['GET', 'POST'])
def get():
    print(data)
    return jsonify({'data': data})


@app.route('/create', methods=['GET', 'POST'])
def create():
    data = request.get_json()
    fname = data['fname']
    lname = data['lname']
    email = data['email']
    newdata = {
        id: 13,
        "email": email,
        "first_name": fname,
        "last_name": lname,

    }
    print(newdata)
    #print(data)
    return jsonify({"new":data})


if __name__ == '__main__':
    app.run(debug=True)
