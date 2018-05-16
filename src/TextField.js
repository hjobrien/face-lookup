/**
 * Created by Hank on 5/16/18.
 */
import React, { Component } from 'react';

import './css/TextField.css'

class TextField extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (

            <form method="post">
                <label for="myInput">Name: </label>
                <input type="text" id="myInput" placeholder="Cersei Lannister"/>
            </form>
        );
    }
}

export default TextField;