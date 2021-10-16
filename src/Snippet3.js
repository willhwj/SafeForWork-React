import React from 'react';
import axios from 'axios';
import './snippet.css'

export default class Snippet3 extends React.Component {

    state = {
        snippetStatus: true,
        currentSnippet: "00001",
        commentStatus: true,
        addNewComment: false,
        allSnippets: [],
        newComment: '',
        newCommentUsername: '',
        displayModal: false,

        // state variables for add & edit snippet
        snippetCreator: '',
        snippetContent: '',
        snippetTheme: '',
        snippetOccasions: [],
        snippetType: '',
        snippetLength: -1,
        action: ""
    };

    // read all snippets into state variable
    async componentDidMount() {
        let response = await axios.get('./sample-data/snippets/snippetList.json')
        let snippets = response.data;
        this.setState({
            allSnippets: snippets
        })
    }

    // utility function to update state variable with new value entered by users
    updateField = (event) => {
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
                        value={this.state.newComment}
                        onChange={this.updateField}></input>
                </div>
                <div>
                    <label>Username: </label>
                    <input
                        name="newCommentUsername"
                        type="text"
                        value={this.state.newCommentUsername}
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
                        </div>
                    </div>
                </React.Fragment>
            )
        )
    }

    // function to initiate API call to communicate changes to server
    sendToServer = (action) => {
        console.log('action to the server is ', action);
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

    // function to update snippet related state variables so that the snippet form shows existing snippet for edit, empty for add, and re-set state variables to null when change is cancelled.
    updateSnippetState = (snippet) => {
        if ( typeof snippet._id ==="string"){
            this.setState({
                action: "updateSnippet",
                displayModal: true,
                snippetCreator: snippet.creator.username,
                snippetContent: snippet.content,
                snippetTheme: snippet.theme,
                snippetOccasions: [...snippet.occasions],
                snippetType: snippet.type,
                snippetLength: snippet.length
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
                case this.state[event.target.name] && this.state.currentSnippet === event.target.getAttribute('data-snippet-id'):
                    this.setState({
                        [event.target.name]: false,
                    });
                    break;
                // the clicked snippet is not open and user clicks on it again
                case !this.state[event.target.name] && this.state.currentSnippet === event.target.getAttribute('data-snippet-id'):
                    this.setState({
                        [event.target.name]: true,
                    });
                    break;
                // user clicks on a different snippet
                case this.state.currentSnippet !== event.target.getAttribute('data-snippet-id'):
                    this.setState({
                        [event.target.name]: true,
                        currentSnippet: event.target.getAttribute('data-snippet-id'),
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
            <React.Fragment>
                <div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" name='snippetCreator' value={this.state.snippetCreator} onChange={this.updateField} aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
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
            </React.Fragment>
        )
    }

    // utility function to display a modal popup for all CRUD operations related to snippets and comments
    displayModalBox() {
        if (this.state.displayModal) {
            return (
                <React.Fragment>
                    <div
                        className="modal show fade"
                        tabIndex="-1"
                        style={{
                            display: "block",
                            backgroundColor: "rgba(0.5, 0.5, 0.5, 0.5)"
                        }}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                {this.state.action==="delete"?
                                null:
                                <h5 className="modal-title">New Comment</h5>
                                }
                                <button type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        name="displayModal"
                                        onClick={this.updateSnippetState}></button>
                                </div>
                                <div className="modal-body">
                                    {this.state.action==="delete"? 
                                    <button className="btn btn-danger">Are You Sure You Want to Delete This Snippet?</button>:
                                    this.displaySnippetForm()}
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                        name="cancelSnippet"
                                        onClick={this.updateSnippetState}>
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        name="confirmSnippet"
                                        onClick={()=>{this.sendToServer(this.state.action)}}>
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
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
                        <button className="accordion-button fw-bold text-center text-capitalize" type="button" name="snippetStatus" data-current="currentSnippet" data-snippet-id={oneSnippet._id} onClick={this.updateShowHide} aria-expanded="true" aria-controls="collapseOne">
                            {oneSnippet.name}
                        </button>
                    </h2>
                    <div id="collapseOne" aria-labelledby="headingOne"
                        className={this.state.snippetStatus === true && this.state.currentSnippet === oneSnippet._id ?
                            "accordion-collapse collapse show" :
                            "accordion-collapse collapse"}>
                        <div className="accordion-body p-2 px-4">
                            {oneSnippet.content}
                        </div>
                        <div>
                            <button className="btn btn-secondary mx-1 py-0" name="displayModal" onClick={() => { this.updateSnippetState(oneSnippet)}}>Edit</button>
                            
                            {this.displayModalBox()}
                            
                            <button className="btn btn-secondary mx-1 py-0" name="displayModal" data-crud="deleteSnippet" onClick={this.updateShowHide}>Delete</button>
                            
                            {this.displayModalBox()}
                        </div>
                        <section className="m-2 attribute">
                            <span className="btn btn-primary mx-1 py-0 type">{oneSnippet.type}</span>
                            <span className="btn btn-primary m-1 py-0 theme">{oneSnippet.theme}</span>
                            <span className="btn btn-primary m-1 py-0 length">{oneSnippet.length} {oneSnippet.length > 1 ? 'mins' : 'min'}</span>
                            {oneSnippet.collectedBy.length > 0 ?
                                <span className="btn btn-primary m-1 py-0 collectedBy">Collected by {oneSnippet.collectedBy.length} users</span>
                                : null}
                            {this.displayOccasionList(oneSnippet)}
                            <span className="btn btn-primary m-1 py-0 creator">Contributed by {oneSnippet.creator.name}</span>
                        </section>
                        <p>
                            <button className="btn btn-primary m-2" type="button" onClick={this.updateShowHide} name="commentStatus" aria-expanded="false" aria-controls="collapseExample">
                                {oneSnippet.comments.length} Comments
                            </button>
                        </p>
                        {this.state.commentStatus ?
                            <div>
                                <div><button className="btn btn-secondary mx-1 py-0" name="displayModal" data-crud="deleteSnippet" onClick={this.updateShowHide}>Add New Comment</button></div>
                                {this.state.addNewComment ? this.displayAddComment() : null}
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
                    {this.state.allSnippets.map((eachSnippet) => this.displayOneSnippet(eachSnippet))}
                </div>
            </React.Fragment>
        )
    }

}