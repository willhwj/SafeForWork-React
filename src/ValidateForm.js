import React from 'react';
import SwitchDisplay from './SwitchDisplay';

// function to validate user input for snippet and comment
export default function ValidateForm (props) {
    switch (props.action){
        case "updateSnippet":
        case "createSnippet":
            if (props.snippetName.length>100) {
                props.inputErrors.push("Snippet name should not exceed 100 characters.")
            }
            if (props.snippetName.match(/[$&+,:;=?@#|<>.-^*()%!]/)) {
                props.inputErrors.push("Snippet name cannot include special characters: $&+,:;=?@#|<>.-^*()%!")
            }
            if (!props.snippetCreator.match(/ ^[a-zA-Z\d][\w\d]*@[a-zA-Z\d]+[.][a-zA-Z\d]+/)) {
                props.inputErrors.push("Please enter a valid email address.")
            }
            if (props.snippetContent.length >5000) {
                props.inputErrors.push("Snippet content cannot exceed 5000 characters.")
            }
            if (["life", "kindness", "hardwork"].includes(props.snippetTheme)) {
                props.inputErrors.push("Theme is not selected yet.")
            }
            if (["joke", "story", "quote"].includes(props.snippetType)) {
                props.inputErrors.push("Type is not selected yet.")
            }
            if (props.snippetOccasions.length<1) {
                props.inputErrors.push("Length is not selected yet.")
            }
            return (props.inputErrors.length===0? true : false)
        case "updateComment":
        case "createComment":
            if (props.comment.length>5000) {
                props.inputErrors.push("Comment should not exceed 100 characters.")
            }
            if (!props.commentUsername.match(/ ^[a-zA-Z\d][\w\d]*@[a-zA-Z\d]+[.][a-zA-Z\d]+/)) {
                props.inputErrors.push("Please enter a valid email address.")
            }
            return (props.inputErrors.length===0? true : false)
        default:
            console.log("invalid entry for ValidateForm component")
    }
}