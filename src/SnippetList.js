import React from 'react';
import axios from 'axios';
import './snippet.css';
import DisplayEachSnippet from './DisplayEachSnippet';
import DisplayModalBox from './DisplayModalBox'

export default class SnippetList extends React.Component {

    state = {
        // state variables for read n display snippets & comments
        snippetStatus: false,
        currentSnippetID: "",
        commentStatus: false,
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

        snippetNumComments: 0,
        snippetNumCollectedBy: 0,

        // state variables for add & edit comments
        comment: '',
        commentUsername: '',
        snippetIDOfComment: '',
        commentID: '',

        // to indicate create, update or update to snippet or comment
        action: "",
    };

    // read all snippets into state variable
    async componentDidMount() {
        let snippets = [];
        await axios.get('https://sfw-express.herokuapp.com/snippets').then(response => snippets = response.data);

        this.setState({
            allSnippets: snippets
        })
    }

    // utility function to update state variable with new value entered by users
    updateField = (event) => {
        // console.log("event is ", event.target.name, event.target.value);
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

    // function to populate comment form with current comment for edit
    updateCommentState = (comment, snippetID, event) => {
        if (this.state.displayModal === false) {
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
                snippetIDOfComment: ""
            })
        }
    }

    // function to initiate API call to communicate changes to server
    sendToServer = async (action) => {
        let url = 'https://sfw-express.herokuapp.com/snippets';
        let [response, clonedSnippets, indexOfChange, newSnippet] = ["", "", "", ""];

        switch (action) {
            case "deleteSnippet":
                console.log("enter deleteSnippet in sendToServer");
                // method 1:
                // let response = await axios.delete(url + "/delete/"+ this.state.currentSnippetID);
                // method 2:
                response = await axios.delete(url + `/delete/${this.state.currentSnippetID}`, {
                    data: {
                        categoryChange: {
                            "theme": this.state.snippetTheme,
                            "type": this.state.snippetType,
                            "length": this.state.snippetLength,
                            "occasions": this.state.snippetOccasions,
                            "changeInSnippets": -1,
                            "changeInComments": -this.state.snippetNumComments,
                            "changeInCollections": -this.state.snippetNumCollectedBy
                        }
                    }
                });
                console.log("response of deleteSnippet is ", response);
                clonedSnippets = this.state.allSnippets
                indexOfChange = clonedSnippets.findIndex(deletedSnippet => deletedSnippet._id === this.state.currentSnippetID);
                clonedSnippets.splice(indexOfChange, 1);

                this.setState({
                    allSnippets: clonedSnippets,
                    action: "",
                    displayModal: false,
                    snippetCreator: "",
                    snippetName: '',
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
                    'name': this.state.snippetName,
                    'content': this.state.snippetContent,
                    'occasions': [...this.state.snippetOccasions],
                    'type': this.state.snippetType,
                    'theme': this.state.snippetTheme,
                    'length': this.state.snippetLength
                });
                // update the state variable allSnippets array with the modified snippet object
                // also update state variables used for tracking current snippet to null
                clonedSnippets = this.state.allSnippets;
                indexOfChange = clonedSnippets.findIndex(updatedSnippet => updatedSnippet._id === this.state.currentSnippetID);
                // target object is the current snippet before update. 
                // source object is the key value pairs which have been updated.
                newSnippet = Object.assign({ ...this.state.allSnippets[indexOfChange] }, {
                    'name': this.state.snippetName,
                    'content': this.state.snippetContent,
                    'occasions': [...this.state.snippetOccasions],
                    'type': this.state.snippetType,
                    'theme': this.state.snippetTheme,
                    'length': this.state.snippetLength
                });
                // console.log("newSnippet is ", newSnippet);
                clonedSnippets.splice(indexOfChange, 1, newSnippet);

                this.setState({
                    allSnippets: clonedSnippets,
                    action: "",
                    displayModal: false,
                    snippetCreator: "",
                    snippetContent: "",
                    snippetName: '',
                    snippetTheme: "",
                    snippetOccasions: [],
                    snippetType: "",
                    snippetLength: -1,
                });
                break;
            case "createSnippet":
                console.log("enter createSnippet in sendToServer");
                // send new snippet to express server for processing
                response = await axios.post(url + `/create`, {
                    'creator': {
                        '_id': '100004',
                        'username': this.state.snippetCreator
                    },
                    'name': this.state.snippetName,
                    'content': this.state.snippetContent,
                    'occasions': [...this.state.snippetOccasions],
                    'type': this.state.snippetType,
                    'theme': this.state.snippetTheme,
                    'length': this.state.snippetLength,
                    'comments': [],
                    'collectedBy': [],
                    'categoryChange': {
                        "theme": this.state.snippetTheme,
                        "type": this.state.snippetType,
                        "length": this.state.snippetLength,
                        "occasions": [...this.state.snippetOccasions],
                        "changeInSnippets": 1,
                        "changeInComments": 0,
                        "changeInCollections": 0
                    }
                });
                // update the state variable allSnippets array with the new snippet object
                // also update state variables used for tracking current snippet to null
                clonedSnippets = this.state.allSnippets;
                // newSnippet object includes the MongoDB objectID. 
                newSnippet = {
                    '_id': response.data.insertedId,
                    'name': this.state.snippetName,
                    'content': this.state.snippetContent,
                    'occasions': [...this.state.snippetOccasions],
                    'type': this.state.snippetType,
                    'theme': this.state.snippetTheme,
                    'length': this.state.snippetLength,
                    'creator': {
                        '_id': '100004',
                        'username': this.state.snippetCreator
                    }
                };
                clonedSnippets.push(newSnippet);

                this.setState({
                    allSnippets: clonedSnippets,
                    action: "",
                    displayModal: false,
                    snippetCreator: "",
                    snippetName: '',
                    snippetContent: "",
                    snippetTheme: "",
                    snippetOccasions: [],
                    snippetType: "",
                    snippetLength: -1,
                    currentSnippetID: newSnippet._id,
                    snippetStatus: true
                });
                break;
            case "deleteComment":
                console.log("enter deleteComment in sendToServer");
                // send new snippet to express server for processing
                response = await axios.patch(url + `/${this.state.snippetIDOfComment}/comments/delete/${this.state.commentID}`, {
                    categoryChange: {
                        "theme": this.state.snippetTheme,
                        "type": this.state.snippetType,
                        "length": this.state.snippetLength,
                        "occasions": [...this.state.snippetOccasions],
                        "changeInSnippets": 0,
                        "changeInComments": -1,
                        "changeInCollections": 0
                    }
                });
                clonedSnippets = this.state.allSnippets;
                indexOfChange = clonedSnippets.findIndex(updatedSnippet => updatedSnippet._id === this.state.currentSnippetID);
                // method 1: get updated comment from state variable directly, use array filter function
                // newSnippet = {...this.state.allSnippets[indexOfChange]};
                // newSnippet.comments=newSnippet.comments.filter( eachComment => eachComment._id !== this.state.commentID);
                // method 2: use the updated snippet from express server response
                newSnippet = response.data.value;
                clonedSnippets.splice(indexOfChange, 1, newSnippet);
                this.setState({
                    allSnippets: clonedSnippets,
                    action: "",
                    displayModal: false,
                    commentUsername: "",
                    comment: "",
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
                this.setState({
                    allSnippets: clonedSnippets,
                    action: "",
                    displayModal: false,
                    commentUsername: "",
                    comment: "",
                    commentID: "",
                    snippetIDOfComment: ""
                });
                break;
            case "createComment":
                console.log("enter createComment in sendToServer");
                // send new snippet to express server for processing
                response = await axios.patch(url + `/${this.state.currentSnippetID}/comments/create`, {
                    username: this.state.commentUsername,
                    comment: this.state.comment,
                    categoryChange: {
                        "theme": this.state.snippetTheme,
                        "type": this.state.snippetType,
                        "length": this.state.snippetLength,
                        "occasions": [...this.state.snippetOccasions],
                        "changeInSnippets": 0,
                        "changeInComments": 1,
                        "changeInCollections": 0
                    }
                });
                clonedSnippets = this.state.allSnippets;
                indexOfChange = clonedSnippets.findIndex(updatedSnippet => updatedSnippet._id === this.state.currentSnippetID);
                newSnippet = { ...this.state.allSnippets[indexOfChange] };
                if (typeof newSnippet.comments === "undefined") {
                    newSnippet.comments = [{
                        "_id": response.data.value.comments[0]._id,
                        "username": response.data.value.comments[0].username,
                        "date": response.data.value.comments[0].date,
                        "comment": response.data.value.comments[0].comment
                    }]
                } else {
                    newSnippet.comments.push({
                        "_id": response.data.value.comments[0]._id,
                        "username": response.data.value.comments[0].username,
                        "date": response.data.value.comments[0].date,
                        "comment": response.data.value.comments[0].comment
                    })
                };
                clonedSnippets.splice(indexOfChange, 1, newSnippet);

                this.setState({
                    allSnippets: clonedSnippets,
                    action: "",
                    displayModal: false,
                    commentUsername: "",
                    comment: "",
                });
                break;
            default:
                console.log("sendToServer function, no valid input");
        }
    }

    // function to populate snippet form with current snippet info for edit.
    updateSnippetState = (snippet) => {
        // if (typeof snippet._id === "string") {
        //     this.setState({
        //         action: "updateSnippet",
        //         displayModal: true,
        //         snippetCreator: snippet.creator.username,
        //         snippetContent: snippet.content,
        //         snippetTheme: snippet.theme,
        //         snippetOccasions: [...snippet.occasions],
        //         snippetType: snippet.type,
        //         snippetLength: snippet.length,
        //         snippetName: snippet.name,
        //         snippetNumComments: snippet.comments.length,
        //         snippetNumCollectedBy: snippet.collectedBy.length
        //     })
        // } else {
        //     this.setState({
        //         action: "",
        //         displayModal: false,
        //         snippetCreator: "",
        //         snippetContent: "",
        //         snippetTheme: "",
        //         snippetOccasions: [],
        //         snippetType: "",
        //         snippetLength: -1,
        //         snippetNumComments: 0,
        //         snippetNumCollectedBy: 0
        //     })
        // }
        
        if (this.state.snippetCreator === "") {
            this.setState({
                snippetCreator: snippet.creator.username,
                snippetContent: snippet.content,
                snippetTheme: snippet.theme,
                snippetOccasions: [...snippet.occasions],
                snippetType: snippet.type,
                snippetLength: snippet.length,
                snippetName: snippet.name,
                snippetNumComments: snippet.comments.length,
                snippetNumCollectedBy: snippet.collectedBy.length
            })
        } else {
            this.setState({
                snippetCreator: "",
                snippetContent: "",
                snippetTheme: "",
                snippetOccasions: [],
                snippetType: "",
                snippetLength: 0,
                snippetNumComments: 0,
                snippetNumCollectedBy: 0
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
                    });
                    break;
                default:
                    console.log('invalid scenario in switch statement for updateShowHide function');
            }
        } else {
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

    render() {
        return (
            <React.Fragment>
                <DisplayEachSnippet snippetStatus={this.state.snippetStatus}
                    currentSnippetID={this.state.currentSnippetID}
                    commentStatus={this.state.commentStatus}
                    allSnippets={this.state.allSnippets}

                    updateCommentState={this.updateCommentState}
                    updateSnippetState={this.updateSnippetState}
                    updateShowHide={this.updateShowHide}
                />
                {this.state.displayModal === true ?
                    <DisplayModalBox displayModal={this.state.displayModal}
                        snippetName={this.state.snippetName}
                        snippetCreator={this.state.snippetCreator}
                        snippetContent={this.state.snippetContent}
                        snippetTheme={this.state.snippetTheme}
                        snippetOccasions={this.state.snippetOccasions}
                        snippetType={this.state.snippetType}
                        snippetLength={this.state.snippetLength}
                        comment={this.state.comment}
                        commentUsername={this.state.commentUsername}
                        action={this.state.action}

                        updateField={this.updateField}
                        updateArray={this.updateArray}
                        updateCommentState={this.updateCommentState}
                        sendToServer={this.sendToServer}
                        updateSnippetState={this.updateSnippetState}
                        updateShowHide={this.updateShowHide}
                    />
                    : null}
            </React.Fragment>
        );
    }



}
