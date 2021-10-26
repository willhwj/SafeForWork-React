import React from 'react';
import './snippet.css'
import DisplayCommentList from './DisplayCommentList';
import DisplayAddComment from './DisplayAddComment';
import DisplayOccasionList from './DisplayOccasionList';
import DisplayModalBox from './DisplayModalBox';

// function to display one snippet
export default function DisplayEachSnippet(props) {
    return (
        <div className="accordion" id="accordionExample">
            <div>
                <button className="btn btn-secondary mx-1 py-0" name="displayModal" data-crud="createSnippet" onClick={props.updateShowHide}>Add New Snippet</button>
                {props.displayModal=== "createSnippet" ? 
                <DisplayModalBox    snippetStatus={props.snippetStatus}
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
            : null}
            </div>
            {props.allSnippets.map(eachSnippet =>
                <div className="accordion-item" key={eachSnippet._id}>
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button fw-bold text-center text-capitalize" type="button" name="snippetStatus" data-current="currentSnippetID" data-snippet-id={eachSnippet._id} onClick={props.updateShowHide} aria-expanded="true" aria-controls="collapseOne">
                            {eachSnippet.name}
                        </button>
                    </h2>
                    <div id="collapseOne" aria-labelledby="headingOne"
                        className={props.snippetStatus === true && props.currentSnippetID === eachSnippet._id ?
                            "accordion-collapse collapse show" :
                            "accordion-collapse collapse"}>
                        <div className="accordion-body p-2 px-4">
                            {eachSnippet.content}
                        </div>
                        <div>
                            <button className="btn btn-secondary mx-1 py-0" name="displayModal" data-crud="updateSnippet" onClick={() => { props.updateSnippetState(eachSnippet) }}>Edit</button>

                            {props.displayModal=== "updateSnippet"? 
                            <DisplayModalBox    snippetStatus={props.snippetStatus}
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
                            : null}

                            <button className="btn btn-secondary mx-1 py-0" name="displayModal" data-crud="deleteSnippet" onClick={props.updateShowHide}>Delete</button>

                            {props.displayModal=== "deleteSnippet"? 
                            <DisplayModalBox    snippetStatus={props.snippetStatus}
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
                            : null}
                        </div>
                        <section className="m-2 attribute">
                            <span className="btn btn-primary mx-1 py-0 type">{eachSnippet.type}</span>
                            <span className="btn btn-primary m-1 py-0 theme">{eachSnippet.theme}</span>
                            <span className="btn btn-primary m-1 py-0 length">{eachSnippet.length} {eachSnippet.length > 1 ? 'mins' : 'min'}</span>
                            {typeof eachSnippet.collectedBy != 'undefined' && eachSnippet.collectedBy.length > 0 ?
                                <span className="btn btn-primary m-1 py-0 collectedBy">Collected by {eachSnippet.collectedBy.length} users</span>
                                : null}
                            <DisplayOccasionList snippet={eachSnippet} />
                            <span className="btn btn-primary m-1 py-0 creator">Contributed by {eachSnippet.creator.username}</span>
                        </section>
                        <p>
                            <button className="btn btn-primary m-2" type="button" onClick={props.updateShowHide} name="commentStatus" aria-expanded="false" aria-controls="collapseExample">
                                {typeof eachSnippet.comments != "undefined" ? eachSnippet.comments.length + " Comments" : "No Comments Yet"}
                            </button>
                        </p>
                        <div>
                            <button className="btn btn-secondary mx-1 py-0" name="displayModal" data-crud="createComment" onClick={props.updateShowHide}>Add New Comment</button>

                        </div>
                        {typeof eachSnippet.comments != "undefined" && props.commentStatus && eachSnippet.comments.length > 0 ?
                            <div>
                                <DisplayCommentList snippet={eachSnippet}
                                                    snippetStatus={props.snippetStatus}
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
                            : null}
                    </div>
                </div>)}
        </div>
    )
}