import React from 'react';
import './Main.css';
import Category from './Category';
import User from './User';
import SnippetList from './SnippetList';

export default class Main extends React.Component {
    state={
        dropdownStatus: false,
        categorySelected: "all",
        optionSelected: "all",
        activePage: "category"
    }

    // utility function to update state variable to change current view to show or hide
    // updateStatus=(event)=>{
    //     this.state[event.target.name]=== true?
    //         this.setState({ 
    //             [event.target.name]: false 
    //         }):
    //         this.setState({ 
    //             [event.target.name]: true
    //         })
    // }

    // function to update state variable with category selected by users for viewing
    updateView=(event)=>{
        if (event.target.name === "dropdownStatus"){
            this.state.dropdownStatus === true? 
            this.setState({
                dropdownStatus: false 
            })
            : this.setState({
                dropdownStatus: true
            })
        } else {
            this.setState({
                activePage: event.target.getAttribute("data-active-page"),
                categorySelected: event.target.name,
                optionSelected: event.target.getAttribute("data-option-selected"),
                dropdownStatus: false
            })
        }
    }

    // function to conditionally render a page according to user selection at navbar
    renderContent =()=>{
        switch (this.state.activePage){
            case "category":
                return(
                    <Category   category={this.state.categorySelected}
                                option={this.state.optionSelected}
                                updateView={this.updateView}
                    />
                )
            case "snippet":
                return(
                    <SnippetList    category={this.state.categorySelected}
                                    option={this.state.optionSelected}
                    />
                )
            case "user":
                return(
                    <User/>
                )
            default:
                console.log("no option for renderContent in SFW.js")
        }
    }

    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <span className="navbar-brand">Navbar</span>
                        <button className="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <button className="navbar-toggler-icon"></button>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <button className="nav-link active navbarBtn" aria-current="page">Home</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link navbarBtn">About</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link navbarBtn" name="all" data-option-selected="all" data-active-page="snippet" onClick={this.updateView}>Snippets</button>
                                </li>
                                <li className="nav-item dropdown" name="dropdownStatus" onClick={this.updateView}>
                                    <button className="nav-link dropdown-toggle navbarBtn" id="navbarDropdown" name="dropdownStatus" aria-expanded="false">
                                        Categories
                                    </button>
                                    {this.state.dropdownStatus===true?
                                    <ul className="dropdown-menu" style={{display: "block"}} aria-labelledby="navbarDropdown">
                                        <li><button className="dropdown-item navbarBtn submenu" name="all" data-option-selected="all" data-active-page="category" onClick={this.updateView} >All</button></li>
                                        <li><button className="dropdown-item navbarBtn submenu" name="theme" data-option-selected="all" data-active-page="category" onClick={this.updateView} >Theme</button></li>
                                        <li><button className="dropdown-item navbarBtn submenu" name="type" data-option-selected="all" data-active-page="category" onClick={this.updateView}>Type</button></li>
                                        <li><button className="dropdown-item navbarBtn submenu" name="occasion" data-option-selected="all" data-active-page="category" onClick={this.updateView}>Occasion</button></li>
                                        <li><button className="dropdown-item navbarBtn submenu" name="popularity" data-option-selected="all" data-active-page="category" onClick={this.updateView}>Popularity</button></li>
                                    </ul>
                                    : null}
                                </li>
                            </ul>
                            {/* <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button class ="btn btn-outline-success" type ="submit">Search</button>
                            </form> */}
                        </div>
                    </div>
                </nav>
                <header className="py-1 mb-0 border-bottom border-top">
                    <div className="container d-flex flex-wrap justify-content-center">
                        <a href="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none fw-bold">
                            <span className="fs-4">{this.state.activePage==="category" ? `Click on any of the ${this.state.categorySelected}s you are interested in.` : null}</span>
                        </a>
                        <div className="b-example-divider"></div>
                    </div>
                </header>
                {this.renderContent()}
            </React.Fragment>
        )
    }
}