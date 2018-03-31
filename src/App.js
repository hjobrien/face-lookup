import React, { Component } from 'react';
// import { Grid } from './grid.js'
import GridLayout from 'react-grid-layout'
import Webcam from 'react-webcam';

import './css/App.css';
import './css/react-grid-styles.css';
import './css/resizable-style.css';


class App extends Component {

    setRef = (webcam) => {
        this.webcam = webcam;
    }

    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
    };
    render() {
        const mainLayout = [
            {i: 'camera', x: 0, y: 0, w: 4, h: 11, static: false},
            {i: 'b', x: 4, y: 0, w: 5, h: 7},
            {i: 'c', x: 0, y: 5, w: 1, h: 3},
            {i: 'filler', x: 4, y: 0, w: 1, h: 2},
            {i: 'login', x: 1, y: 0, w: 3, h: 3}

        ];

        const cameraLayout = [
            {i: 'webcam', x: 0, y: 0, w: 4, h: 10, static: true},
            {i: 'screenshot', x: 0, y: 10, w: 4, h: 1, static: true},

        ];

        function loginHandler(){
            console.log("you tried to log in")
        }


        return (
            <div>
                <header className="heading">
                    <h1 className="Title">Title</h1>
                </header>
                <GridLayout className="layout" layout={mainLayout} margin={[0,0]} cols={12} rowHeight={30} width={1200}>
                    <div key="camera">
                        <GridLayout className="layout" layout={cameraLayout} margin={[0,0]} cols={12} rowHeight={30} width={1200}>
                            <div key="webcam" className="webcamComponent innerGridItem ">
                                <Webcam className="webcam"
                                        audio={false}
                                        width={400}
                                        ref={this.setRef}/>
                            </div>
                            <div key="screenshot" className="innerGridItem webcamComponent">
                                <button className="uiButton"
                                        onClick={this.capture}>Capture photo</button>
                            </div>
                        </GridLayout>

                    </div>
                    <div key="b">b</div>

                    <div key="c">c</div>

                    <div key="filler">filler</div>

                    <div key="login">
                        <button onClick={loginHandler} className="uiButton">
                            Login
                        </button>
                    </div>


                </GridLayout>
            </div>
        )
    }
}


export default App;
