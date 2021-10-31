import React from 'react';
import '../../custom-css/Main.css';
import Category from '../category-view/Category';
import User from '../user-view/User';
import SnippetList from '../snippet-view/parent-component/SnippetList';
import Home from './Home';
import About from './About';

export default class Main extends React.Component {
    state = {
        dropdownStatus: false,
        hamburgerStatus: false,
        activePage: "home",

        // for category view
        categorySelected: "all",
        optionSelected: "all",
    }

    // static show = this.state.hamburgerStatus? "show": "";
    // static show = "show";

    // function to update state variable with category selected by users for viewing
    updateView = (event) => {
        if (event.target.name === "dropdownStatus" || event.target.name === "hamburgerStatus") {
            this.state[event.target.name] === true ?
                this.setState({
                    [event.target.name]: false
                })
                : this.setState({
                    [event.target.name]: true
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
    renderContent = () => {
        switch (this.state.activePage) {
            case "category":
                return (
                    <Category category={this.state.categorySelected}
                        option={this.state.optionSelected}
                        updateView={this.updateView}
                    />
                )
            case "snippet":
                return (
                    <SnippetList category={this.state.categorySelected}
                        option={this.state.optionSelected}
                    />
                )
            case "user":
                return (
                    <User />
                )
            case "home":
                return (
                    <Home />
                )
            case "about":
                return (
                    <About/>
                )
            default:
                console.log("no option for renderContent in SFW.js")
        }
    }

    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <span className="navbar-brand">
                            <img src="./images/navbar.png" alt="" width="45" height="45" />
                        </span>
                        <button className="navbar-toggler" type="button" name="hamburgerStatus" onClick={this.updateView} aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <button className="navbar-toggler-icon" name="hamburgerStatus" onClick={this.updateView}></button>
                        </button>
                        <div className={this.state.hamburgerStatus ? "collapse navbar-collapse show" : "collapse navbar-collapse"} id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <button className="nav-link active navbarBtn" data-active-page="home" onClick={this.updateView} aria-current="page">Home</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link active navbarBtn" data-active-page="about" onClick={this.updateView} aria-current="page">About</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link active navbarBtn" name="all" data-option-selected="all" data-active-page="snippet" onClick={this.updateView}>Snippets</button>
                                </li>
                                <li className="nav-item active dropdown" name="dropdownStatus" onClick={this.updateView}>
                                    <button className="nav-link dropdown-toggle navbarBtn" id="navbarDropdown" name="dropdownStatus" aria-expanded="false">
                                        Categories
                                    </button>
                                    {this.state.dropdownStatus === true ?
                                        <ul className="dropdown-menu" style={{ display: "block" }} aria-labelledby="navbarDropdown">
                                            <li><button className="dropdown-item navbarBtn submenu" name="all" data-option-selected="all" data-active-page="category" onClick={this.updateView} >All</button></li>
                                            <li><button className="dropdown-item navbarBtn submenu" name="theme" data-option-selected="all" data-active-page="category" onClick={this.updateView} >Theme</button></li>
                                            <li><button className="dropdown-item navbarBtn submenu" name="type" data-option-selected="all" data-active-page="category" onClick={this.updateView}>Type</button></li>
                                            <li><button className="dropdown-item navbarBtn submenu" name="occasion" data-option-selected="all" data-active-page="category" onClick={this.updateView}>Occasion</button></li>
                                            <li><button className="dropdown-item navbarBtn submenu" name="length" data-option-selected="all" data-active-page="category" onClick={this.updateView}>Length</button></li>
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
                <header className="py-1 mb-0">
                    <div className="container d-flex flex-wrap justify-content-center">
                        <div className="d-flex align-items-center mb-0 mb-lg-0 me-lg-auto text-dark text-decoration-none fw-bold">
                            <span className="fs-4">{this.state.activePage === "category" ? `Click on any of the ${this.state.categorySelected==="all"? "categorie" : this.state.categorySelected}s you are interested in.` : null}</span>
                        </div>
                        <div className="b-example-divider"></div>
                    </div>
                </header>
                <div class="m-1 p-1" >
                    {this.renderContent()}
                </div>

            </React.Fragment>
        )
    }
}