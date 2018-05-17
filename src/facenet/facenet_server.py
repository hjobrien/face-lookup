from flask import Flask
from facenet_utils import get_embedding
from base64 import b64decode
from datetime import datetime


app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello World'

@app.route('/requestEmbedding/b64img', methods=['POST'])
def requestEmbedding(b64img):
    image_name = 'images/' + str(datetime.now()) + '.jpg'
    with open(image_name, 'w') as outfile:
        img = b64decode(b64img)
        outfile.write(img)
    return get_embedding(image_name) #TODO: maybe make get_embedding write to disk, then just return when done


if __name__ == "__main__":
    app.run(host='127.0.0.1')
