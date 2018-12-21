### To Run:
must have python3, npm, electron installed

run
`npm start`
to start the development server

then run `npm run electron` to open the electron window

a small python webserver is used to perform model inference. to run this,
from this directory, run `python3 src/facenet/facenet_server.py`


there must be a folder in `src/facenet` called `model`

it should have the following contents:
```
model
|-facenet.ckpt-90.data-00000-of-00001
|-facenet.ckpt-90.index
|-facenet.meta
|-facenet.pb
```