import React from 'react';
import axios from 'axios';
import '../../../custom-css/snippet.css';
import DisplayEachSnippet from '../child-components-snippet-display/DisplayEachSnippet';
import DisplayModalBox from '../child-components-modal-box/DisplayModalBox';
import SnippetFilter from '../child-components-snippet-filter/SnippetFilter';

export default class SnippetList extends React.Component {

    state = {
        // state variables for read n display snippets & comments
        snippetStatus: false,
        currentSnippetID: "",
        commentStatus: false,
        allSnippets: [],
        filteredSnippets: [],
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
        previousAction: "",

        // to store error messages of invalid user input
        inputErrors: [],

        // state variables for snippet filter control
        theme: "all",
        type: "all",
        occasions: [],
        length: "all",
        keyword: "",
        collapse: true,
    };

    // read all snippets into state variable
    async componentDidMount() {
        let snippets = [];
        console.log("componentDidMount for SnippetList triggered");
        console.log(this.props.category, this.props.option);
        await axios.get(`https://sfw-express.herokuapp.com/snippets/${this.props.category}/${this.props.option}`).then(response => snippets = response.data);
        console.log(snippets);

        this.setState({
            allSnippets: snippets,
            filteredSnippets: snippets
        })
    }

    // utility function to update state variable with new value entered by users
    updateField = (event) => {
        // console.log("event is ", event.target.name, event.target.value);
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    // function to filter which snippets to display, return a list of snippets
    filterSnippets = () => {
        let snippetList = [...this.state.allSnippets];
        if (this.state.theme !== "all") {
            snippetList = [...snippetList.filter(eachSnippet => eachSnippet.theme === this.state.theme)]
        }
        if (this.state.type !== "all") {
            snippetList = [...snippetList.filter(eachSnippet => eachSnippet.type === this.state.type)]
        }
        if (this.state.length !== "all") {
            snippetList = [...snippetList.filter(eachSnippet => eachSnippet.length === this.state.length)]
        }
        if (this.state.occasions.length !== 0) {
            for (let currentOccasion of this.state.occasions) {
                snippetList = [...snippetList.filter(eachSnippet => eachSnippet.occasions.includes(currentOccasion))]
            }
        }
        if (this.state.keyword !== "") {
            let keyword = this.state.keyword.toLowerCase();
            snippetList = [...snippetList.filter(eachSnippet => {
                let name = eachSnippet.name.toLowerCase();
                let content = eachSnippet.content.toLowerCase();
                return name.includes(keyword) || content.includes(keyword) ? true : false
            })]
        }
        console.log(snippetList);
        this.setState({
            filteredSnippets: [...snippetList],
            snippetStatus: false
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

    // function to validate user input for snippet and comment. return true if there is no error, false if there is error
validateForm = ()=> {
    console.log("enter validateForm");
    switch (this.state.action) {
        case "updateSnippet":
        case "createSnippet":
            if (this.state.snippetName.length > 100) {
                this.state.inputErrors.push("Snippet name should not exceed 100 characters.")
            }
            if (this.state.snippetName.match(/[$&+,:;=?@#|<>\.\-\^\*()%!]/)) {
                this.state.inputErrors.push("Snippet name cannot include special characters: $&+,:;=?@#|<>.-^*()%!")
            }
            if (!this.state.snippetCreator.match(/^[a-zA-Z\d][\w\d]+@[\w\d]+[.][a-zA-Z\d]+/)) {
                this.state.inputErrors.push("Please enter a valid email address.")
            }
            if (this.state.snippetContent.length > 5000) {
                this.state.inputErrors.push("Snippet content cannot exceed 5000 characters.")
            }
            if (!["life", "kindness", "hardwork"].includes(this.state.snippetTheme)) {
                this.state.inputErrors.push("Theme is not selected yet.")
            }
            if (!["joke", "story", "quote"].includes(this.state.snippetType)) {
                this.state.inputErrors.push("Type is not selected yet.")
            }
            if (this.state.snippetOccasions.length < 1) {
                this.state.inputErrors.push("Length is not selected yet.")
            }
            return (this.state.inputErrors.length === 0 ? true : false)
        case "updateComment":
        case "createComment":
            if (this.state.comment.length > 5000) {
                this.state.inputErrors.push("Comment should not exceed 100 characters.")
            }
            if (this.state.commentUsername.match(/^[a-zA-Z\d][\w\d]+@[\w\d]+[.][a-zA-Z\d]+/)===false) {
                this.state.inputErrors.push("Please enter a valid email address.")
            }
            return (this.state.inputErrors.length === 0 ? true : false)
        default:
            console.log("invalid entry for ValidateForm component")
    }
}

// function to update state variable action to errorMessages, so that it triggers SwitchDisplay component to display error messages stored in state variable inputErrors
printErrors =()=>{
    this.setState({
        previousAction: this.state.action,
        action: "errorMessages"
    })
}

// function to direct user back to snippet form or comment form after user has seen and acknowledged the errors. also reset inputErrors state variable
goBack = () =>{
    this.setState({
        inputErrors: [],
        action: this.state.previousAction,
        previousAction: ""
    })
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
                },
                'comments': [],
                'collectedBy': []
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
    if (typeof snippet === "object") {
        if (this.state.currentSnippetID !== snippet._id) {
            this.setState({
                snippetCreator: snippet.creator.username,
                snippetContent: snippet.content,
                snippetTheme: snippet.theme,
                snippetOccasions: [...snippet.occasions],
                snippetType: snippet.type,
                snippetLength: snippet.length,
                snippetName: snippet.name,
                snippetNumComments: snippet.comments.length,
                snippetNumCollectedBy: snippet.collectedBy.length,
                currentSnippetID: snippet._id
            })
        } else {
            this.setState({
                snippetCreator: "",
                snippetContent: "",
                snippetTheme: "",
                snippetOccasions: [],
                snippetType: "",
                snippetLength: 0,
                snippetName: "",
                snippetNumComments: 0,
                snippetNumCollectedBy: 0,
                currentSnippetID: ""
            })
        }
    } else {
        this.setState({
            snippetCreator: "",
            snippetContent: "",
            snippetTheme: "",
            snippetOccasions: [],
            snippetType: "",
            snippetLength: 0,
            snippetName: "",
            snippetNumComments: 0,
            snippetNumCollectedBy: 0,
            currentSnippetID: ""
        })
    }

}

// utility function to show or hide any display modal and collapsible displays. Also populate state variable action to indicate if this click leads to any CRUD to database
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
                [event.target.name]: false,
                action: ""
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
            <SnippetFilter theme={this.state.theme}
                type={this.state.type}
                length={this.state.length}
                occasions={this.state.occasions}
                collapse={this.state.collapse}
                updateShowHide={this.updateShowHide}
                updateField={this.updateField}
                updateArray={this.updateArray}
                filterSnippets={this.filterSnippets}
            />
            <div>
                <DisplayEachSnippet snippetStatus={this.state.snippetStatus}
                    currentSnippetID={this.state.currentSnippetID}
                    commentStatus={this.state.commentStatus}
                    filteredSnippets={this.state.filteredSnippets}

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
                        inputErrors={this.state.inputErrors}

                        updateField={this.updateField}
                        updateArray={this.updateArray}
                        updateCommentState={this.updateCommentState}
                        sendToServer={this.sendToServer}
                        updateSnippetState={this.updateSnippetState}
                        updateShowHide={this.updateShowHide}
                        validateForm={this.validateForm}
                        printErrors={this.printErrors}
                        goBack={this.goBack}
                    />
                    : null}
            </div>
        </React.Fragment>
    );
}



}
