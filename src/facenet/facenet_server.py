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
    image_path = literal_eval(request.data.decode('UTF-8'))['imagePath']
    input_name = literal_eval(request.data.decode('UTF-8'))['inputName']
    try:
        with open(embedding_dict_name, 'r') as embedding_dict:
            data = json.load(embedding_dict)
    except IOError:
        file = open(embedding_dict_name, 'w+')
        file.close()
        data = {}
    with open(embedding_dict_name, 'w') as embedding_dict:
        data[input_name] = get_embedding(image_path).tolist()[0]
        json.dump(data, embedding_dict)

    return 'Successfully wrote embedding to disk'

@app.route('/postTest', methods=['POST'])
def postTest():
    request_dict = literal_eval(request.data.decode('UTF-8'))
    return request_dict['base64img']


if __name__ == "__main__":
    app.run(port=8080)
