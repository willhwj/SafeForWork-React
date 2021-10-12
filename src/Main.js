import React from 'react';
import './Main.css'

export default class Main extends React.Component {
    state={
        dropdownStatus: false,
        categorySelected: null
    }

    // utility function to update state variable to change current view to show or hide
    updateStatus=(event)=>{
        console.log('event target is ', event.target.name);
        console.log('event target current status is ', this.state[event.target.name]);
        this.state[event.target.name]=== true?
            this.setState({ 
                [event.target.name]: false 
            }):
            this.setState({ 
                [event.target.name]: true
            })
    }

    // function to update state variable with category selected by users for viewing
    updateView=(event)=>{
        this.setState({
            categorySelected: event.target.name,
            dropdownStatus: false
        })
    }

    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <button className="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <button className="navbar-toggler-icon"></button>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <button className="nav-link active navbarBtn" aria-current="page">Home</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link navbarBtn" href="#">About</button>
                                </li>
                                <li className="nav-item dropdown" onMouseOver={this.updateStatus} onMouseLeave={this.updateStatus}>
                                    <button className="nav-link dropdown-toggle navbarBtn" id="navbarDropdown" role="button" name="dropdownStatus" aria-expanded="false">
                                        See Snippets By
                                    </button>
                                    {this.state.dropdownStatus===true?
                                    <ul className="dropdown-menu" style={{display: "block"}} aria-labelledby="navbarDropdown">
                                        <li><button className="dropdown-item navbarBtn submenu" name="theme" onClick={this.updateView} >Theme</button></li>
                                        <li><button className="dropdown-item navbarBtn submenu" name="type" onClick={this.updateView}>Type</button></li>
                                        <li><button className="dropdown-item navbarBtn submenu" name="occasion" onClick={this.updateView}>Occasion</button></li>
                                        <li><button className="dropdown-item navbarBtn submenu" name="popularity" onClick={this.updateView}>Popularity</button></li>
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
                            <span className="fs-4">{this.state.categorySelected? `Click on any of the ${this.state.categorySelected}s you are interested in.` : null}</span>
                        </a>
                        <div className="b-example-divider"></div>
                    </div>
                </header>
            </React.Fragment>
        )
    }
}