import React from 'react';
import './snippet.css'

// function to render form for adding new comment
export default function DisplayAddComment(props) {
    return (
        <React.Fragment>
            <div>
                <label>New Comment: </label>
                <input
                    name="newComment"
                    type="text"
                    value={props.comment}
                    onChange={props.updateField}></input>
            </div>
            <div>
                <label>Username: </label>
                <input
                    name="newCommentUsername"
                    type="text"
                    value={props.commentUsername}
                    onChange={props.updateField}></input>
            </div>
        </React.Fragment>
    )
}