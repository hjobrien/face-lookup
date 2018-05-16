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
            <div align="center">
                Name: <input type="text" placeholder="Cersei Lannister"/>
            </div>
        );
    }
}

export default TextField;