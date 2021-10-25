import React from 'react';
import SnippetList from './SnippetList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Main';
import Category from './Category';
import User from './User';

export default class SFW extends React.Component{
    state={
        active: "category",
        selectedCategory: "theme",
        selectedOption: "all"
    }

    renderContent =()=>{
        switch (this.state.active){
            case "category":
                return(
                    <Category   category={this.state.selectedCategory}
                                option={this.state.selectedOption}
                    />
                )
            case "snippet":
                return(
                    <SnippetList/>
                )
            case "user":
                return(
                    <User/>
                )
            default:
                console.log("no option for renderContent in SFW.js")
        }
    }

    render (){
        return (
            <React.Fragment>
            <Main />
            {this.renderContent()}
            </React.Fragment>
        )
    }
}