/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import Button from './Button'

export default class Tree extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initial: props.data.initial,
            choices: props.data.choices,
            node: "",
        }
        this.path = [""]
    }

    handleBack(parent) {
        this.path.pop();
        this.setCurrent(parent)
    }

    setPath(current) {
        if (!this.path.includes(current)) {
            this.path.push(current)
        }
    }

    //
    setCurrent(current) {
        this.setState({ current: current })
        this.setPath(current)
        // this.addParent();


    }
    //
    getCurrent() {
        return this.state.current;
    }
    //
    containChild(data) {
        let obj = this.state.choices[data]
        try {
            return 'children' in obj
        } catch (err) {
            console.log(err)
            return false
        }
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
        if (data == null || data === undefined || this.path.length === 1) {
            return "Pick a start"
        }
        try {
            return this.state.choices[data].name
        } catch (err) {
            console.log("Node does not exist. Exiting.")
            return ["completed"]
        }
    }
    //
    getData(data) {
        if (this.getCurrent() == null || this.path.length === 1) {
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
        console.log(children)
        this.addNode(val[0], val[1], children[0] === "" ? null : [...children])
    }
    //for back button
    // addParent() {
    //     let children = this.getChild(this.parent)
    //     if (children[0] === "completed") {
    //         return null
    //     }
    //     for (let i = 0; i < children.length; i++) {
    //         this.setState((state) => {
    //             const updatedChoices = { ...state.choices }
    //             updatedChoices[children[i]]["parent"] = this.parent;
    //             return { choices: updatedChoices };
    //         });
    //     }

    // }

    render() {
        return (
            <div style={container}>
                <Button
                    onClick={(e) => this.setCurrent(e)}
                    data={this.getData(this.getCurrent())}
                    name={this.getName(this.getCurrent())}
                    parent={null}
                />
                <form >
                    <label>Add a new node, seperate by comma, <br></br> eg. key (stay-in), name(anything), children(seperated by space ONLY)<br></br>Also possible to add leaf node. Just remove children (but keep commas)</label><br></br>
                    <b>When adding children, do not include space between comma and first child</b><br></br>
                    <input value={this.state.node} onChange={(e) => this.handleNodeChange(e)} type={"text"} ></input>
                    <button type='button' onClick={() => this.handleSubmit()} >Submit</button>
                </form>
                {this.path.length === 1 ? "" : <button onClick={() => this.handleBack(this.path[this.path.length - 2])}>Back</button>}
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
