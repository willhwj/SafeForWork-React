import React from 'react';
import './snippet.css';

// function to display list of comments posted to a snippet
export default function DisplayCommentList(props) {
    return (
        props.snippet.comments.map(eachComment =>
            <React.Fragment key={props.snippet._id}>
                <div className="collapse show m-2" >
                    <div className="card card-body m-1">
                        {eachComment.comment}
                        <div class="card-footer text-muted m-0 p-0">
                            Posted on {eachComment.date}
                        </div>
                        <div>
                            <button className="btn btn-secondary ms-0 me-1 py-0" name="displayModal" data-crud="updateComment" onClick={(event) => { props.updateCommentState(eachComment, props.snippet._id, event) }}>Edit</button>
                            <button className="btn btn-secondary mx-1 py-0" name="displayModal" data-crud="deleteComment" onClick={(event) => { props.updateCommentState(eachComment, props.snippet._id, event) }}>Delete</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    )
}