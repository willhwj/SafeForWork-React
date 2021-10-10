import React from 'react';
import './Main.css'

export default class Main extends React.Component {
    state={
        dropdownStatus: false,
        selectedView: null
    }

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

    updateView=(event)=>{
        this.setState({
            selectedView: event.target.name,
            dropdownStatus: false
        })
    }

    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
                                <li className="nav-item dropdown">
                                    <button className="nav-link dropdown-toggle navbarBtn" id="navbarDropdown" role="button" name="dropdownStatus" onMouseOver={this.updateStatus} aria-expanded="false">
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
            </React.Fragment>
        )
    }
}