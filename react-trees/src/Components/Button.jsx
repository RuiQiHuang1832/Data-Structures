import React from 'react'

export default function Button(props) {
    function createList(data, onClickProp) {
        if (data[0] == "completed") {
            return <div data-parent={props.parent}>Completed</div>
        }
        return data.map((e, i) => {
            return (<span key={i}><a href="#" data-parent={props.parent} onClick={() => onClickProp(e)} style={button}>{e}</a>
                <div style={padding}></div></span>)

        })
    }

    return (
        <div>
            <h2>{props.name}</h2>
            {createList(props.data, props.onClick)}
        </div>
    )
}


const button = {
    fontSize: '50px',
    color: 'blue'
};

const padding = {
    padding: "20px"
}