from flask import Flask, request
from facenet_utils import get_embedding
from base64 import b64decode
from datetime import datetime
from flask_cors import CORS, cross_origin
from ast import literal_eval



app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def hello():
    print('hey')
    return "Hello World"

@app.route('/requestEmbedding', methods=['POST'])
def requestEmbedding():
    b64img = request.values[0]
    image_name = 'images/' + str(datetime.now()) + '.jpg'
    with open(image_name, 'w') as outfile:
        img = b64decode(b64img)
        outfile.write(img)
    return get_embedding(image_name) #TODO: maybe make get_embedding write to disk, then just return when done

@app.route('/postTest', methods=['POST'])
def postTest():
    request_dict = literal_eval(request.data.decode('UTF-8'))
    return request_dict['base64img']


if __name__ == "__main__":
    app.run(port=8080)
