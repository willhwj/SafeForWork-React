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
                        <SwitchDisplay  snippetStatus={props.snippetStatus}
                                        currentSnippetID={props.currentSnippetID}
                                        commentStatus={props.commentStatus}
                                        allSnippets={props.allSnippets}
                                        displayModal={props.displayModal}

                                        snippetName={props.snippetName}
                                        snippetCreator={props.snippetCreator}
                                        snippetContent={props.snippetContent}
                                        snippetTheme={props.snippetTheme}
                                        snippetOccasions={props.snippetOccasions}
                                        snippetType={props.snippetType}
                                        snippetLength={props.snippetLength}

                                        comment={props.comment}
                                        commentUsername={props.commentUsername}
                                        addNewComment={props.addNewComment}
                                        snippetIDOfComment={props.snippetIDOfComment}
                                        commentID={props.commentID}

                                        action={props.action}

                                        updateField={props.updateField}
                                        updateArray={props.updateArray}
                                        updateCommentState={props.updateCommentState}
                                        sendToServer={props.sendToServer}
                                        updateSnippetState={props.updateSnippetState}
                                        updateShowHide={props.updateShowHide}
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
}