from flask import Flask, request
from facenet_utils import get_embedding
from flask_cors import CORS, cross_origin
from ast import literal_eval
import json
import numpy as np

embedding_dict_name = 'embeddings.json'

app = Flask(__name__)
CORS(app)

current_milli_time = lambda: int(round(time.time() * 1000))


@app.route('/', methods=['GET'])
def hello():
    return "Hello World"

@app.route('/requestEmbedding', methods=['POST'])
def requestEmbedding():
    request_data = literal_eval(request.data.decode('UTF-8'))
    image_path = request_data['imagePath']
    input_name = request_data['inputName']
    shouldWrite = request_data['shouldWrite']

    try:
        with open(embedding_dict_name, 'r') as embedding_dict:
            data = json.load(embedding_dict)
    except IOError:
        file = open(embedding_dict_name, 'w+')
        file.close()
        data = {}
    embedding = list(get_embedding(image_path).tolist()[0])
    if shouldWrite:
        with open(embedding_dict_name, 'w') as embedding_dict:
            data[input_name] = embedding
            json.dump(data, embedding_dict)

    return str(embedding)

@app.route('/postTest', methods=['POST'])
def postTest():
    request_dict = literal_eval(request.data.decode('UTF-8'))
    return request_dict['base64img']


if __name__ == "__main__":
    app.run(port=8080)
