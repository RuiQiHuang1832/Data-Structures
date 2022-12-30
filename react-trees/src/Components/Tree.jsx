/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import Button from './Button'
//back button
//deal with if null cases, empty arrays, etc...

export default class Tree extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initial: props.data.initial,
            choices: props.data.choices,
            node: ""
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
    addNode(key, name, children = null) {
        const node = {
            [key]: {
                name: name,
                //https://stackoverflow.com/a/40560953
                //deconstruct {children: [...children] } with spread
                ...(children && { children: [...children] })
            }
        }
        this.setState((prevState => ({
            choices: {
                ...prevState.choices,
                ...node
            }
        })))
    }
    handleNodeChange(event) {
        this.setState({ node: event.target.value })
    }
    handleSubmit() {
        const val = this.state.node.split(",")
        const children = val[2].split(" ")
        this.addNode(val[0], val[1], [...children])
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
                <form >
                    <label>Add a new node, seperate by comma, <br></br> eg. key, name, children</label><br></br>
                    <input value={this.state.node} onChange={(e) => this.handleNodeChange(e)} type={"text"} ></input>
                    <button type='button' onClick={() => this.handleSubmit()} >Submit</button>
                </form>
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
