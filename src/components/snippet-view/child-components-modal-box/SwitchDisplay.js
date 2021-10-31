import React from 'react';
import '../../../custom-css/snippet.css';
import SnippetForm from './SnippetForm';
import CommentForm from './CommentForm';

// function to conditionally render display within the displayModalBox, depending on the user action of the state.
export default function SwitchDisplay(props) {
    switch (props.action) {
        case "deleteSnippet":
            return (
                <React.Fragment>
                    <div className="modal-header">
                        <button type="button" className="btn-close" aria-label="Close" name="displayModal" onClick={props.updateShowHide}></button>
                    </div>
                    <div className="modal-body">
                        <button className="btn btn-danger">Are You Sure You Want to Delete This Snippet?</button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" name="displayModal" onClick={props.updateShowHide}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={() => { props.sendToServer(props.action) }}>Confirm</button>
                    </div>
                </React.Fragment>
            );
        case "updateSnippet":
            return (
                <React.Fragment>
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Snippet</h5>
                        <button type="button" className="btn-close" aria-label="Close" name="displayModal" onClick={props.updateShowHide}></button>
                    </div>
                    <div className="modal-body">
                        <SnippetForm snippetName={props.snippetName}
                            snippetCreator={props.snippetCreator}
                            snippetContent={props.snippetContent}
                            snippetTheme={props.snippetTheme}
                            snippetOccasions={props.snippetOccasions}
                            snippetType={props.snippetType}
                            snippetLength={props.snippetLength}

                            updateField={props.updateField}
                            updateArray={props.updateArray}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" name="displayModal" onClick={props.updateShowHide}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={(event) => { event.preventDefault(); props.validateForm() ? props.sendToServer(props.action) : props.printErrors() }}>Confirm</button>
                    </div>
                </React.Fragment>
            );
        case "createSnippet":
            return (
                <React.Fragment>
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Snippet</h5>
                        <button type="button" className="btn-close" aria-label="Close" name="displayModal" onClick={props.updateShowHide}></button>
                    </div>
                    <div className="modal-body">
                        <SnippetForm snippetName={props.snippetName}
                            snippetCreator={props.snippetCreator}
                            snippetContent={props.snippetContent}
                            snippetTheme={props.snippetTheme}
                            snippetOccasions={props.snippetOccasions}
                            snippetType={props.snippetType}
                            snippetLength={props.snippetLength}

                            updateField={props.updateField}
                            updateArray={props.updateArray}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" name="displayModal" onClick={props.updateShowHide}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={(event) => { event.preventDefault(); props.validateForm() ? props.sendToServer(props.action) : props.printErrors() }}>Confirm</button>
                    </div>
                </React.Fragment>
            );
        case "deleteComment":
            return (
                <React.Fragment>
                    <div className="modal-header">
                        <button type="button" className="btn-close" aria-label="Close" name="displayModal" onClick={props.updateCommentState}></button>
                    </div>
                    <div className="modal-body">
                        <button className="btn btn-danger">Are You Sure You Want to Delete This Comment?</button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" name="displayModal" onClick={props.updateCommentState}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={() => { props.sendToServer(props.action) }}>Confirm</button>
                    </div>
                </React.Fragment>
            );
        case "updateComment":
            return (
                <React.Fragment>
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Comment</h5>
                        <button type="button" className="btn-close" aria-label="Close" name="displayModal" onClick={props.updateCommentState}></button>
                    </div>
                    <div className="modal-body">
                        <CommentForm comment={props.comment}
                            commentUsername={props.commentUsername}
                            updateField={props.updateField}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" name="displayModal" onClick={props.updateCommentState}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={() => { props.validateForm() ? props.sendToServer(props.action) : props.printErrors() }}>Confirm</button>
                    </div>
                </React.Fragment>
            );
        case "createComment":
            return (
                <React.Fragment>
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Comment</h5>
                        <button type="button" className="btn-close" aria-label="Close" name="displayModal" onClick={props.updateShowHide}></button>
                    </div>
                    <div className="modal-body">
                        <CommentForm comment={props.comment}
                            commentUsername={props.commentUsername}
                            updateField={props.updateField}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" name="displayModal" onClick={props.updateShowHide}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={() => { props.validateForm() ? props.sendToServer(props.action) : props.printErrors() }}>Confirm</button>
                    </div>
                </React.Fragment>
            );
        case "errorMessages":
            return (
                <React.Fragment>
                    <div className="modal-header">
                        <h5 className="modal-title">Hmmm, We Need Your Help Here.</h5>
                        <button type="button" className="btn-close" aria-label="Close" name="displayModal" onClick={props.goBack}></button>
                    </div>
                    <div className="modal-body">
                        Please review the below errors, make amendments and submit again. Thank you.
                    <ul class="list-group">
                        {props.inputErrors.map(eachError =>
                            <li class="list-group-item">{eachError}</li>
                        )}
                    </ul>
                    </div>
                </React.Fragment>
            )
        default:
            console.log("switchDisplay function, no valid input");
    }
}