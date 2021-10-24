import React from 'react';
import './snippet.css'

// function to display all occassions associated with a snippet as child buttons within the main button for occassions
export default function DisplayOccasionList(props) {
    return (
        <React.Fragment key={props.snippet._id}>
            <span className="btn btn-primary m-1 py-0 occasions">For {props.snippet.occasions.map(eachOccasion =>
                <span className="btn btn-primary mx-1 my-0 p-0 eachOccasion">{eachOccasion}</span>)}
            </span>
        </React.Fragment>
    )
}