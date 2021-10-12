import React from 'react';
import axios from 'axios';
import './snippet.css'

export default class Snippet extends React.Component {

    state = {
        name: '',
        content: '',
        occasions: [],
        type: '',
        creator: '',
        collectedBy: [],
        comments: [],
        theme: '',
        length: -1,
        commentStatus: false,
        snippetStatus: this.props.snippetInitialStatus,
        path: this.props.filePath,
        addNewComment:false,
        newComment: '',
        newCommentUsername: ''
    };

    async componentDidMount() {
        let snippet = {};
        let url = './sample-data/snippets/';
        await axios.get(url + this.state.path).then(response => snippet = response.data);

        this.setState({
            name: snippet.name,
            content: snippet.content,
            occasions: [...snippet.occasions],
            type: snippet.type,
            creator: snippet.creator.username,
            collectedBy: [...snippet.collectedBy],
            comments: [...snippet.comments],
            theme: snippet.theme,
            length: snippet.length
        })
    }

    // utility function to update state variable to change current view to show or hide
    updateShowHide = (event) => {
        this.state[event.target.name] === true ?
            this.setState({
                [event.target.name]: false
            }) :
            this.setState({
                [event.target.name]: true
            })
    }

    // utility function to update state variable with new value entered by users
    updateField = (event)=>{
        this.setState({
            [event.target.name]: event.target.value,
        })
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

    // main render function for the snippet view, which is in accordion style
    render() {
        return (
            <React.Fragment>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button fw-bold text-center text-capitalize" type="button" name="snippetStatus" onClick={this.updateShowHide} data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            {this.state.name}
                        </button>
                    </h2>
                    <div id="collapseOne" className={this.state.snippetStatus === true ? "accordion-collapse collapse show" : "accordion-collapse collapse"} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body p-2 px-4">
                            {this.state.content}
                        </div>
                        <section className="m-2 attribute">
                            <span className="btn btn-primary mx-1 py-0 type">{this.state.type}</span>
                            <span className="btn btn-primary m-1 py-0 theme">{this.state.theme}</span>
                            <span className="btn btn-primary m-1 py-0 length">{this.state.length} {this.state.length > 1 ? 'mins' : 'min'}</span>
                            {this.state.collectedBy.length > 0 ?
                                <span className="btn btn-primary m-1 py-0 collectedBy">Collected by {this.state.collectedBy.length} users</span>
                                : null}
                            <span className="btn btn-primary m-1 py-0 occasions">For {this.state.occasions.map(eachOccasion =>
                                <span className="btn btn-primary mx-1 my-0 p-0 eachOccasion">{eachOccasion}</span>)}
                            </span>
                            <span className="btn btn-primary m-1 py-0 creator">Contributed by {this.state.creator}</span>
                        </section>
                        <p>
                            <button className="btn btn-primary m-2" type="button" onClick={this.updateShowHide} name="commentStatus" aria-expanded="false" aria-controls="collapseExample">
                                {this.state.comments.length} Comments
                            </button>
                        </p>
                        {this.state.commentStatus === true ?
                            <div><button name="addNewComment" onClick={this.updateShowHide}>Add New Comment</button></div>
                            : null}
                        {this.state.addNewComment===false? null: this.displayAddComment()}
                        {this.state.comments.map(eachComment =>
                            this.state.commentStatus === true ?
                                <div className="collapse show m-2">
                                    <div className="card card-body m-1">
                                        {eachComment.comment}
                                    </div>
                                </div> :
                                <div className="collapse m-2">
                                    <div className="card card-body m-1">
                                        {eachComment.comment}
                                    </div>
                                </div>
                        )}
                    </div>
                </div>
            </React.Fragment>
        )
    }

}