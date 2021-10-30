import React from 'react';
import './snippet.css';
import SwitchDisplay from './SwitchDisplay';

// utility function to display a modal popup for all CRUD operations related to snippets and comments
export default function DisplayModalBox(props) {
    if (props.displayModal) {
        return (
            <div className="modal show fade" tabIndex="-1" style={{display: "block", backgroundColor: "rgba(0.5, 0.5, 0.5, 0.5)"}}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <SwitchDisplay  snippetName={props.snippetName}
                                        snippetCreator={props.snippetCreator}
                                        snippetContent={props.snippetContent}
                                        snippetTheme={props.snippetTheme}
                                        snippetOccasions={props.snippetOccasions}
                                        snippetType={props.snippetType}
                                        snippetLength={props.snippetLength}
                                        comment={props.comment}
                                        commentUsername={props.commentUsername}
                                        action={props.action}
                                        inputErrors={props.inputErrors}

                                        updateField={props.updateField}
                                        updateArray={props.updateArray}
                                        updateCommentState={props.updateCommentState}
                                        sendToServer={props.sendToServer}
                                        updateSnippetState={props.updateSnippetState}
                                        updateShowHide={props.updateShowHide}
                                        validateForm={props.validateForm}
                                        printErrors={props.printErrors}
                                        goBack = {props.goBack}
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
}