from flask import Flask, request
from facenet_utils import get_embedding
from flask_cors import CORS, cross_origin
from ast import literal_eval



app = Flask(__name__)
CORS(app)

current_milli_time = lambda: int(round(time.time() * 1000))


@app.route('/', methods=['GET'])
def hello():
    return "Hello World"

@app.route('/requestEmbedding', methods=['POST'])
def requestEmbedding():
    imagePath = literal_eval(request.data.decode('UTF-8'))['imagePath']
    return str(get_embedding(imagePath)) #TODO: maybe make get_embedding write to disk, then just return when done

@app.route('/postTest', methods=['POST'])
def postTest():
    request_dict = literal_eval(request.data.decode('UTF-8'))
    return request_dict['base64img']


if __name__ == "__main__":
    app.run(port=8080)
