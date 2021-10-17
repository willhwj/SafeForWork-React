import React from 'react';
import Snippet from './Snippet';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Main';
import Category from './Category';
import User from './User';

export default class SFW extends React.Component{
    state={
        active: "snippet",
        selectedCategory: "theme",
    }

    renderContent =()=>{
        switch (this.state.active){
            case "category":
                return(
                    <Category categoryType={this.state.selectedCategory}/>
                )
            case "snippet":
                return(
                    <Snippet/>
                )
            case "user":
                return(
                    <User/>
                )
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