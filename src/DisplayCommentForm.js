import React from 'react';
import './snippet.css'

// function to display form for edit & add comment
export default function DisplayCommentForm(props) {
    return (
        <React.Fragment>
            <div>
                <div className="mb-3">
                    <label for="commentUsername" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="commentUsername" name='commentUsername' value={props.commentUsername} onChange={props.updateField} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="comment" className="form-label">Enter Your Comment</label>
                    <textarea row="3" className="form-control" id="comment" name='comment' value={props.comment} onChange={props.updateField} />
                </div>
            </div>
        </React.Fragment>
    )
}