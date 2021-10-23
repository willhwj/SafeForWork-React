import React from 'react';
import axios from 'axios';
import './snippet.css'

export default class Snippet extends React.Component {

    state = {
        // state variables for read n display snippets & comments
        snippetStatus: true,
        currentSnippetID: "",
        commentStatus: true,
        allSnippets: [],
        displayModal: false,

        // state variables for add & edit snippets
        snippetName: '',
        snippetCreator: '',
        snippetContent: '',
        snippetTheme: '',
        snippetOccasions: [],
        snippetType: '',
        snippetLength: -1,
        snippetID: '',

        // state variables for add & edit comments
        comment: '',
        commentUsername: '',
        addNewComment: false,
        snippetIDOfComment: '',
        commentID: '',

        // to indicate create, update or update to snippet or comment
        action: "",
    };

    // read all snippets into state variable
    async componentDidMount() {
        let response = await axios.get('http://localhost:8888/snippets')
        let snippets = response.data;
        this.setState({
            allSnippets: snippets
        })
    }

    // utility function to update state variable with new value entered by users
    updateField = (event) => {
        // console.log("event is ", event.target.name, event.target.value, event.target.id);
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    // utility function to update state variable of array with new values selected in checkboxes
    updateArray = (event) => {
        if (this.state[event.target.name].includes(event.target.value)) {
            let indexToRemove = this.state[event.target.name].indexOf(event.target.value);
            let cloned = [...this.state[event.target.name]];
            cloned.splice(indexToRemove, 1);
            this.setState({
                [event.target.name]: cloned
            })
        } else {
            this.setState({
                [event.target.name]: [...this.state[event.target.name], event.target.value]
            })
        }
    }

    // function to render form for adding new comment
    displayAddComment = () => {
        return (
            <React.Fragment>
                <div>
                    <label>New Comment: </label>
                    <input
                        name="newComment"
                        type="text"
                        value={this.state.comment}
                        onChange={this.updateField}></input>
                </div>
                <div>
                    <label>Username: </label>
                    <input
                        name="newCommentUsername"
                        type="text"
                        value={this.state.commentUsername}
                        onChange={this.updateField}></input>
                </div>
            </React.Fragment>
        )
    }

    // function to display list of comments posted to a snippet
    displayCommentList = (snippet) => {
        return (
            snippet.comments.map(eachComment =>
                <React.Fragment key={snippet._id}>
                    <div className="collapse show m-2" >
                        <div className="card card-body m-1">
                            {eachComment.comment}
                            <div class="card-footer text-muted m-0 p-0">
                                Posted on {eachComment.date}
                            </div>
                            <div>
                                <button className="btn btn-secondary ms-0 me-1 py-0" name="displayModal" data-crud="updateComment" onClick={(event) => { this.updateCommentState(eachComment, snippet._id, event) }}>Edit</button>
                                {this.displayModalBox()}
                                <button className="btn btn-secondary mx-1 py-0" name="displayModal" data-crud="deleteComment" onClick={(event) => { this.updateCommentState(eachComment, snippet._id, event) }}>Delete</button>
                                {this.displayModalBox()}
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        )
    }

    // function to populate comment form with current comment for edit
    updateCommentState = (comment, snippetID, event) => {
        if (typeof comment._id === "string") {
            this.setState({
                action: event.target.getAttribute("data-crud"),
                displayModal: true,
                commentUsername: comment.username,
                comment: comment.comment,
                commentID: comment._id,
                snippetIDOfComment: snippetID
            })
        } else {
            this.setState({
                action: "",
                displayModal: false,
                commentUsername: "",
                comment: "",
                commentID: "",
                sniipetIDOfComment: ""
            })
        }
    }

    // function to display form for edit & add comment
    displayCommentForm = () => {
        return (
            <div>
                <div className="mb-3">
                    <label for="commentUsername" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="commentUsername" name='commentUsername' value={this.state.commentUsername} onChange={this.updateField} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="comment" className="form-label">Enter Your Comment</label>
                    <textarea row="3" className="form-control" id="comment" name='comment' value={this.state.comment} onChange={this.updateField} />
                </div>
            </div>
        )
    }

    // function to initiate API call to communicate changes to server
    sendToServer = async (action) => {
        let url = 'http://localhost:8888/snippets';
        let [response, clonedSnippets, indexOfChange, newSnippet] = ["", "", "", ""];

        switch (action) {
            case "deleteSnippet":
                console.log("enter deleteSnippet in sendToServer");
                // method 1:
                // let response = await axios.delete(url + "/delete/"+ this.state.currentSnippetID);
                // method 2:
                response = await axios.delete(url + `/delete/${this.state.currentSnippetID}`);
                console.log("response of deleteSnippet is ", response);
                clonedSnippets = this.state.allSnippets
                indexOfChange = clonedSnippets.findIndex(deletedSnippet => deletedSnippet._id === this.state.currentSnippetID);
                clonedSnippets.splice(indexOfChange, 1);

                this.setState({
                    allSnippets: clonedSnippets,
                    action: "",
                    displayModal: false,
                    snippetCreator: "",
                    snippetContent: "",
                    snippetTheme: "",
                    snippetOccasions: [],
                    snippetType: "",
                    snippetLength: -1,
                    currentSnippetID: ""
                });
                break;
            case "updateSnippet":
                console.log("enter updateSnippet in sendToServer");
                // send update to express server for processing
                response = await axios.patch(url + `/update/${this.state.currentSnippetID}`, {
                    name: this.state.snippetName,
                    content: this.state.snippetContent,
                    occasions: [...this.state.snippetOccasions],
                    type: this.state.snippetType,
                    theme: this.state.snippetTheme,
                    length: this.state.snippetLength
                });
                // update the state variable allSnippets array with the modified snippet object
                // also update state variables used for tracking current snippet to null
                clonedSnippets = this.state.allSnippets;
                indexOfChange = clonedSnippets.findIndex(updatedSnippet => updatedSnippet._id === this.state.currentSnippetID);
                // target object is the current snippet before update. 
                // source object is the key value pairs which have been updated.
                newSnippet = Object.assign({ ...this.state.allSnippets[indexOfChange] }, {
                    name: this.state.snippetName,
                    content: this.state.snippetContent,
                    occasions: [...this.state.snippetOccasions],
                    type: this.state.snippetType,
                    theme: this.state.snippetTheme,
                    length: this.state.snippetLength
                });
                // console.log("newSnippet is ", newSnippet);
                clonedSnippets.splice(indexOfChange, 1, newSnippet);

                this.setState({
                    allSnippets: clonedSnippets,
                    action: "",
                    displayModal: false,
                    snippetCreator: "",
                    snippetContent: "",
                    snippetTheme: "",
                    snippetOccasions: [],
                    snippetType: "",
                    snippetLength: -1,
                    currentSnippetID: ""
                });
                break;
            case "createSnippet":
                console.log("enter createSnippet in sendToServer");
                // send new snippet to express server for processing
                response = await axios.post(url + `/create`, {
                    creator: {
                        _id: '100004',
                        username: this.state.snippetCreator
                    },
                    name: this.state.snippetName,
                    content: this.state.snippetContent,
                    occasions: [...this.state.snippetOccasions],
                    type: this.state.snippetType,
                    theme: this.state.snippetTheme,
                    length: this.state.snippetLength
                });
                // update the state variable allSnippets array with the new snippet object
                // also update state variables used for tracking current snippet to null
                clonedSnippets = this.state.allSnippets;
                // newSnippet object includes the MongoDB objectID. 
                newSnippet = {
                    _id: response.data.insertedId,
                    name: this.state.snippetName,
                    content: this.state.snippetContent,
                    occasions: [...this.state.snippetOccasions],
                    type: this.state.snippetType,
                    theme: this.state.snippetTheme,
                    length: this.state.snippetLength
                };
                console.log("newSnippet is ", newSnippet);
                clonedSnippets.push(newSnippet);
                console.log("clonedSnippets is ", clonedSnippets);

                this.setState({
                    allSnippets: clonedSnippets,
                    action: "",
                    displayModal: false,
                    snippetCreator: "",
                    snippetContent: "",
                    snippetTheme: "",
                    snippetOccasions: [],
                    snippetType: "",
                    snippetLength: -1,
                    currentSnippetID: ""
                });
                break;
            case "deleteComment":
                console.log("enter deleteComment in sendToServer");
                // send new snippet to express server for processing
                response = await axios.patch(url + `/${this.state.snippetIDOfComment}/comments/delete/${this.state.commentID}`);
                clonedSnippets = this.state.allSnippets;
                indexOfChange = clonedSnippets.findIndex(updatedSnippet => updatedSnippet._id === this.state.currentSnippetID);
                // method 1: get updated comment from state variable directly, use array filter function
                // newSnippet = {...this.state.allSnippets[indexOfChange]};
                // newSnippet.comments=newSnippet.comments.filter( eachComment => eachComment._id !== this.state.commentID);
                // method 2: use the updated snippet from express server response
                newSnippet = response.data.value;
                clonedSnippets.splice(indexOfChange, 1, newSnippet);
                console.log(clonedSnippets);
                this.setState({
                    allSnippets: clonedSnippets,
                    action: "",
                    displayModal: false,
                    commentUsername: "",
                    comment: "",
                    addNewComment: false,
                    commentID: "",
                    snippetIDOfComment: ""
                });
                break;
            case "updateComment":
                console.log("enter updateComment in sendToServer");
                // send new snippet to express server for processing
                response = await axios.patch(url + `/${this.state.snippetIDOfComment}/comments/update/${this.state.commentID}`, {
                    username: this.state.commentUsername,
                    comment: this.state.comment
                });
                clonedSnippets = this.state.allSnippets;
                indexOfChange = clonedSnippets.findIndex(updatedSnippet => updatedSnippet._id === this.state.currentSnippetID);
                // method 1: use array map function
                // newSnippet = {...this.state.allSnippets[indexOfChange]};
                // newSnippet.comments=newSnippet.comments.map( eachComment._id === this.state.commentID? eachComment.comment = this.state.comment : null);
                // method 2: get the updated snippet from express server response
                newSnippet = response.data.value;
                clonedSnippets.splice(indexOfChange, 1, newSnippet);
                console.log(clonedSnippets);
                this.setState({
                    allSnippets: clonedSnippets,
                    action: "",
                    displayModal: false,
                    commentUsername: "",
                    comment: "",
                    addNewComment: false,
                    commentID: "",
                    snippetIDOfComment: ""
                });
                break;
            case "createComment":
                console.log("enter createComment in sendToServer");
                // send new snippet to express server for processing
                response = await axios.patch(url + `/${this.state.currentSnippetID}/comments/create`, {
                    username: this.state.commentUsername,
                    comment: this.state.comment
                });
                clonedSnippets = this.state.allSnippets;
                indexOfChange = clonedSnippets.findIndex(updatedSnippet => updatedSnippet._id === this.state.currentSnippetID);
                newSnippet = {...this.state.allSnippets[indexOfChange]};
                newSnippet.comments.push({
                    "_id": response.data.value.comments[0]._id,
                    "username": response.data.value.comments[0].username,
                    "date": response.data.value.comments[0].date,
                    "comment": response.data.value.comments[0].comment
                });
                clonedSnippets.splice(indexOfChange, 1, newSnippet);

                this.setState({
                    allSnippets: clonedSnippets,
                    action: "",
                    displayModal: false,
                    commentUsername: "",
                    comment: "",
                    addNewComment: false
                });
                break;
            default:
                console.log("sendToServer function, no valid input");
        }




    }

    // function to populate snippet form with current snippet info for edit.
    updateSnippetState = (snippet) => {
        if (typeof snippet._id === "string") {
            this.setState({
                action: "updateSnippet",
                displayModal: true,
                snippetCreator: snippet.creator.username,
                snippetContent: snippet.content,
                snippetTheme: snippet.theme,
                snippetOccasions: [...snippet.occasions],
                snippetType: snippet.type,
                snippetLength: snippet.length,
                snippetName: snippet.name
            })
        } else {
            this.setState({
                action: "",
                displayModal: false,
                snippetCreator: "",
                snippetContent: "",
                snippetTheme: "",
                snippetOccasions: [],
                snippetType: "",
                snippetLength: -1
            })
        }
    }

    // utility function to show or hide any display modal and collapsible displays
    updateShowHide = (event) => {
        // scenarios when user clicks on a snippet
        if (event.target.name === 'snippetStatus') {
            switch (true) {
                // the clicked snippet is already open and user clicks on it again
                case this.state[event.target.name] && this.state.currentSnippetID === event.target.getAttribute('data-snippet-id'):
                    this.setState({
                        [event.target.name]: false,
                    });
                    break;
                // the clicked snippet is not open and user clicks on it again
                case !this.state[event.target.name] && this.state.currentSnippetID === event.target.getAttribute('data-snippet-id'):
                    this.setState({
                        [event.target.name]: true,
                    });
                    break;
                // user clicks on a different snippet
                case this.state.currentSnippetID !== event.target.getAttribute('data-snippet-id'):
                    this.setState({
                        [event.target.name]: true,
                        currentSnippetID: event.target.getAttribute('data-snippet-id'),
                        commentStatus: true,
                        addNewComment: false,
                    });
                    break;
                default:
                    console.log('invalid scenario in switch statement for updateShowHide function');
            }
        }
        // scenarios when user clicks on buttons within a snippet
        else {
            this.state[event.target.name] ?
                this.setState({
                    [event.target.name]: false
                }) :
                this.setState({
                    [event.target.name]: true,
                    // set action to delete, when user clicks on delete button
                    action: event.target.getAttribute('data-crud')
                })
        }
    }

    // function to display all occassions associated with a snippet as child buttons within the main button for occassions
    displayOccasionList = (snippet) => {
        return (
            <React.Fragment key={snippet._id}>
                <span className="btn btn-primary m-1 py-0 occasions">For {snippet.occasions.map(eachOccasion =>
                    <span className="btn btn-primary mx-1 my-0 p-0 eachOccasion">{eachOccasion}</span>)}
                </span>
            </React.Fragment>
        )
    }

    // function to display form for adding new snippets
    displaySnippetForm = () => {
        return (
            <div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name='snippetCreator' value={this.state.snippetCreator} onChange={this.updateField} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="snippetName" className="form-label">Snippet Name</label>
                    <input type="email" className="form-control" id="snippetName" name='snippetName' value={this.state.snippetName} onChange={this.updateField} />
                </div>
                <div className="mb-3">
                    <label for="snippetContent" className="form-label">Enter Your Snippet Content</label>
                    <textarea row="3" className="form-control" id="snippetContent" name='snippetContent' value={this.state.snippetContent} onChange={this.updateField} />
                </div>
                <div>On Which Occasions is this Snippet Suitable?</div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="work" name='snippetOccasions' value="work" onChange={this.updateArray} checked={this.state.snippetOccasions.includes('work')} />
                    <label className="form-check-label" for="work">
                        Work
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="networking" name='snippetOccasions' value="networking" onChange={this.updateArray} checked={this.state.snippetOccasions.includes('networking')} />
                    <label className="form-check-label" for="networking">
                        Networking
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="presentation" name='snippetOccasions' value="presentation" onChange={this.updateArray} checked={this.state.snippetOccasions.includes('presentation')} />
                    <label className="form-check-label" for="presentation">
                        Presentation
                    </label>
                </div>
                <div>What's the Theme of the Snippet?</div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="snippetTheme" value="life" id="life" checked={this.state.snippetTheme === "life"} onChange={this.updateField} />
                    <label className="form-check-label" for="life">
                        Life
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="snippetTheme" value="hardwork" id="hardwork" checked={this.state.snippetTheme === "hardwork"} onChange={this.updateField} />
                    <label className="form-check-label" for="hardwork">
                        Hardwork
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="snippetTheme" value="kindness" id="kindness" checked={this.state.snippetTheme === "kindness"} onChange={this.updateField} />
                    <label className="form-check-label" for="kindness">
                        Kindness
                    </label>
                </div>
                <div>What's the Type of the Snippet?</div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="snippetType" value="joke" id="joke" checked={this.state.snippetType === "joke"} onChange={this.updateField} />
                    <label className="form-check-label" for="joke">
                        Joke
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="snippetType" value="story" id="story" checked={this.state.snippetType === "story"} onChange={this.updateField} />
                    <label className="form-check-label" for="story">
                        Story
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="snippetType" value="quote" id="quote" checked={this.state.snippetType === "quote"} onChange={this.updateField} />
                    <label className="form-check-label" for="quote">
                        Quote
                    </label>
                </div>
                <div>How many minutes does it take to narrate this snippet?</div>
                <select className="form-select" name="snippetLength" onChange={this.updateField} value={this.state.snippetLength} aria-label="Default select example">
                    <option value={1}>Less than One Minute</option>
                    <option value={2}>One to Two Minutes</option>
                    <option value={3}>Two to Three Minutes</option>
                    <option value={4}>Above Three Minutes</option>
                </select>
            </div>
        )
    }

    // function to conditionally render display within the displayModalBox, depending on the user action of the state.
    switchDisplay = () => {
        switch (this.state.action) {
            case "deleteSnippet":
                return (
                    <React.Fragment>
                        <div className="modal-header">
                            <button type="button" className="btn-close" aria-label="Close" name="displayModal" onClick={this.updateShowHide}></button>
                        </div>
                        <div className="modal-body">
                            <button className="btn btn-danger">Are You Sure You Want to Delete This Snippet?</button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" name="displayModal" onClick={this.updateShowHide}>Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={() => { this.sendToServer(this.state.action) }}>Confirm</button>
                        </div>
                    </React.Fragment>
                );
            case "updateSnippet":
                return (
                    <React.Fragment>
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Snippet</h5>
                            <button type="button" className="btn-close" aria-label="Close" name="displayModal" onClick={this.updateSnippetState}></button>
                        </div>
                        <div className="modal-body">
                            {this.displaySnippetForm()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.updateSnippetState}>Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={() => { this.sendToServer(this.state.action) }}>Confirm</button>
                        </div>
                    </React.Fragment>
                );
            case "createSnippet":
                return (
                    <React.Fragment>
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Snippet</h5>
                            <button type="button" className="btn-close" aria-label="Close" name="displayModal" onClick={this.updateSnippetState}></button>
                        </div>
                        <div className="modal-body">
                            {this.displaySnippetForm()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.updateSnippetState}>Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={() => { this.sendToServer(this.state.action) }}>Confirm</button>
                        </div>
                    </React.Fragment>
                );
            case "deleteComment":
                    return (
                        <React.Fragment>
                            <div className="modal-header">
                                <button type="button" className="btn-close" aria-label="Close" name="displayModal" onClick={this.updateCommentState}></button>
                            </div>
                            <div className="modal-body">
                                <button className="btn btn-danger">Are You Sure You Want to Delete This Comment?</button>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" name="displayModal" onClick={this.updateCommentState}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={() => { this.sendToServer(this.state.action) }}>Confirm</button>
                            </div>
                        </React.Fragment>
                    );
            case "updateComment":
                return (
                    <React.Fragment>
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Comment</h5>
                            <button type="button" className="btn-close" aria-label="Close" name="displayModal" onClick={this.updateCommentState}></button>
                        </div>
                        <div className="modal-body">
                            {this.displayCommentForm()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.updateCommentState}>Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={() => { this.sendToServer(this.state.action) }}>Confirm</button>
                        </div>
                    </React.Fragment>
                );
            case "createComment":
                return (
                    <React.Fragment>
                        <div className="modal-header">
                            <h5 className="modal-title">Add New Comment</h5>
                            <button type="button" className="btn-close" aria-label="Close" name="displayModal" onClick={this.updateCommentState}></button>
                        </div>
                        <div className="modal-body">
                            {this.displayCommentForm()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.updateCommentState}>Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={() => { this.sendToServer(this.state.action) }}>Confirm</button>
                        </div>
                    </React.Fragment>
                );
            default:
                console.log("switchDisplay function, no valid input");
        }
    }

    // utility function to display a modal popup for all CRUD operations related to snippets and comments
    displayModalBox() {
        if (this.state.displayModal) {
            return (
                <div
                    className="modal show fade"
                    tabIndex="-1"
                    style={{
                        display: "block",
                        backgroundColor: "rgba(0.5, 0.5, 0.5, 0.5)"
                    }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            {this.switchDisplay()}
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }

    displayOneSnippet = (oneSnippet) => {
        return (
            <React.Fragment key={oneSnippet._id} >
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button fw-bold text-center text-capitalize" type="button" name="snippetStatus" data-current="currentSnippetID" data-snippet-id={oneSnippet._id} onClick={this.updateShowHide} aria-expanded="true" aria-controls="collapseOne">
                            {oneSnippet.name}
                        </button>
                    </h2>
                    <div id="collapseOne" aria-labelledby="headingOne"
                        className={this.state.snippetStatus === true && this.state.currentSnippetID === oneSnippet._id ?
                            "accordion-collapse collapse show" :
                            "accordion-collapse collapse"}>
                        <div className="accordion-body p-2 px-4">
                            {oneSnippet.content}
                        </div>
                        <div>
                            <button className="btn btn-secondary mx-1 py-0" name="displayModal" onClick={() => { this.updateSnippetState(oneSnippet) }}>Edit</button>

                            {this.displayModalBox()}

                            <button className="btn btn-secondary mx-1 py-0" name="displayModal" data-crud="deleteSnippet" onClick={this.updateShowHide}>Delete</button>

                            {this.displayModalBox()}
                        </div>
                        <section className="m-2 attribute">
                            <span className="btn btn-primary mx-1 py-0 type">{oneSnippet.type}</span>
                            <span className="btn btn-primary m-1 py-0 theme">{oneSnippet.theme}</span>
                            <span className="btn btn-primary m-1 py-0 length">{oneSnippet.length} {oneSnippet.length > 1 ? 'mins' : 'min'}</span>
                            {typeof oneSnippet.collectedBy != 'undefined' && oneSnippet.collectedBy.length > 0 ?
                                <span className="btn btn-primary m-1 py-0 collectedBy">Collected by {oneSnippet.collectedBy.length} users</span>
                                : null}
                            {this.displayOccasionList(oneSnippet)}
                            <span className="btn btn-primary m-1 py-0 creator">Contributed by {oneSnippet.creator.name}</span>
                        </section>
                        <p>
                            <button className="btn btn-primary m-2" type="button" onClick={this.updateShowHide} name="commentStatus" aria-expanded="false" aria-controls="collapseExample">
                                {typeof oneSnippet.comments != "undefined" ? oneSnippet.comments.length + " Comments" : "No Comments Yet"}
                            </button>
                        </p>
                        <div>
                            <button className="btn btn-secondary mx-1 py-0" name="displayModal" data-crud="createComment" onClick={this.updateShowHide}>Add New Comment</button>
                            {this.state.addNewComment ? this.displayAddComment() : null}
                        </div>
                        {typeof oneSnippet.comments != "undefined" && this.state.commentStatus && oneSnippet.comments.length > 0 ?
                            <div>
                                {this.displayCommentList(oneSnippet)}
                            </div>
                            : null}
                    </div>
                </div>
            </React.Fragment>
        )
    }

    render() {
        return (
            <React.Fragment>
                <div className="accordion" id="accordionExample">
                    <div>
                        <button className="btn btn-secondary mx-1 py-0" name="displayModal" data-crud="createSnippet" onClick={this.updateShowHide}>Add New Snippet</button>{this.displayModalBox()}
                    </div>
                    {this.state.allSnippets.map(eachSnippet => this.displayOneSnippet(eachSnippet))}
                </div>
            </React.Fragment>
        )
    }

}