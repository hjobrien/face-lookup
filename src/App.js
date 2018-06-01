import React, { Component } from 'react';
import GridLayout from 'react-grid-layout'
import Webcam from 'react-webcam';
import TextField from './TextField.js'
import axios from 'axios';



import './css/App.css';
import './css/react-grid-styles.css';
import './css/resizable-style.css';


const fs = window.require('fs');
const loadJsonFile = window.require('load-json-file');

const EMBEDDING_DICT_PATH = 'embeddings.json';

class App extends Component {

    setWebcamRef = (webcam) => {
        this.webcam = webcam;
    };

    setNameFieldRef = (nameField) => {
        this.nameField = nameField;
    };

    getEmbedding = (shouldWrite) => {
        const imageSrc = this.webcam.getScreenshot().replace(/^data:image\/\w+;base64,/, "");
        const inputName = this.nameField.state.value;
        // inputName = '';
        const buf = new Buffer(imageSrc, 'base64');
        const screenshotPath = 'screenshot.jpg';
        fs.writeFileSync(screenshotPath, buf);

        return axios.post('http://127.0.0.1:8080/requestEmbedding', {
            imagePath: screenshotPath,
            inputName: inputName,
            shouldWrite: shouldWrite
        })

    };

    capture = () => {
        const shouldWrite = 1;
        this.getEmbedding(shouldWrite)
            .then(response => {
                alert('captured')
            })
            .catch(err => {
                alert(err.data)
            });
    };

    static euclidianDist(vec1, vec2){
        if(vec1.length !== vec2.length){
            throw "vectors are different length";
        }
        let accum = 0;
        for(let i = 0; i < vec1.length; i++){
            accum += Math.pow(vec1[i] - vec2[i], 2);
        }
        return Math.sqrt(accum);
    }

    static getBestMatch(embedding, dataDict){
        let bestNameSoFar = 'Error';
        let minDistSoFar = Infinity;
        for(let i = 0; i < Object.keys(dataDict).length; i++){
            const key = Object.keys(dataDict)[i];
            const dist = App.euclidianDist(embedding, dataDict[key]);
            console.log(key + ": " + dist);
            if(dist < minDistSoFar){
                minDistSoFar = dist;
                bestNameSoFar = key;
            }
        }
        return bestNameSoFar;
    }

    login = () => {
        const shouldWrite = 0;
        loadJsonFile(EMBEDDING_DICT_PATH)
            .then(jsonDict => {
                this.getEmbedding(shouldWrite)
                    .then(response => {
                        // console.log("embedding: " + response.data);
                        // console.log(Object.keys(jsonDict));
                        alert(App.getBestMatch(response.data, jsonDict));
                    })
                    .catch(err => {
                        alert(err)
                    })
            })
            .catch(err => {
                alert(err)
            })


    };

    render() {
        const mainLayout = [
            {i: 'webcam', x: 1, y: 0, w: 4, h: 10, static: true},
            {i: 'name-field', x: 1, y: 10, w: 4, h: 1, static: true},
            {i: 'screenshot', x: 1, y: 11, w: 4, h: 1, static: true},
            {i: 'info', x: 5, y: 0, w: 4, h: 14},
            {i: 'c', x: 1, y: 5, w: 4, h: 2},
            // {i: 'filler', x: 5, y: 0, w: 1, h: 2},
            {i: 'login', x: 1, y: 6, w: 4, h: 2}

        ];


        //TODO: make webcam only show square input
        return (
            <div>
                <header className="heading">
                    <h1 className="Title">Title</h1>
                </header>
                <GridLayout className="layout" layout={mainLayout} margin={[0,0]} cols={12} rowHeight={30} width={1200}>
                    <div key="webcam" className="webcamComponent innerGridItem ">
                        <Webcam className="webcam"
                                audio={false}
                                width={400}
                                screenshotFormat="image/jpeg"
                                ref={this.setWebcamRef}/>
                    </div>
                    <div key="name-field">
                        <TextField ref={this.setNameFieldRef}/>
                    </div>

                    <div key="screenshot" className="innerGridItem webcamComponent">
                        <button className="uiButton"
                                onClick={this.capture}>Capture photo</button>
                    </div>
                    <div key="info"> info </div>

                    <div key="c">c</div>

                    <div key="login">
                        <button onClick={this.login} className="uiButton">
                            Login
                        </button>
                    </div>


                </GridLayout>
            </div>
        )
    }
}


export default App;
