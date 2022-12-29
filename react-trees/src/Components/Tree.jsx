/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import Button from './Button'

export default class Tree extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initial: props.data.initial,
            choices: props.data.choices,
        }
        this.parent = null
    }
    //
    setCurrent(current) {
        this.parent = current;
        this.setState({ current: current })
    }
    //
    getCurrent() {
        return this.state.current;
    }
    //
    containChild(data) {
        let obj = this.state.choices[data]
        return 'children' in obj
    }
    //
    getChild(data) {
        if (this.containChild(data)) {
            return this.state.choices[data].children
        }
        return ["completed"]
    }

    //
    getName(data) {
        if (this.getCurrent() == null) {
            return "Pick a start"
        }
        return this.state.choices[data].name
    }
    //
    getData(data) {
        if (this.getCurrent() == null) {
            return this.state.initial
        }
        return this.getChild(data)
    }

    //just need to implement back button
    render() {
        return (
            <div style={container}>
                <Button
                    onClick={(e) => this.setCurrent(e)}
                    data={this.getData(this.getCurrent())}
                    name={this.getName(this.getCurrent())}
                    parent={this.parent}
                />
                {this.parent == null ? "" : <button>Back</button>}
            </div >
        )
    }
}



const container = {
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: '0',
    right: '0',
    textAlign: 'center'
}
