import React from 'react';
import './snippet.css';

export default function SnippetFilter(props) {
    return (
        <React.Fragment>
            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                Filter Snippets
            </button>
            <form>
            <div>Filter By Theme</div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="theme" data-filter="life" value="life" id="life" checked={props.theme === "life"} onChange={props.updateFilter} />
                        <label className="form-check-label" for="life">
                            Life
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="theme" data-filter="hardwork" value="hardwork" id="hardwork" checked={props.theme === "hardwork"} onChange={props.updateFilter} />
                        <label className="form-check-label" for="hardwork">
                            Hardwork
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="theme" data-filter="kindess" value="kindness" id="kindness" checked={props.theme === "kindness"} onChange={props.updateFilter} />
                        <label className="form-check-label" for="kindness">
                            Kindness
                        </label>
                    </div>
                    <div>Filter By Type</div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="type" data-filter="joke" value="joke" id="joke" checked={props.type === "joke"} onChange={props.updateFilter} />
                        <label className="form-check-label" for="joke">
                            Joke
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="type" data-filter="story" value="story" id="story" checked={props.type === "story"} onChange={props.updateFilter} />
                        <label className="form-check-label" for="story">
                            Story
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="type" data-filter="quote" value="quote" id="quote" checked={props.type === "quote"} onChange={props.updateFilter} />
                        <label className="form-check-label" for="quote">
                            Quote
                        </label>
                    </div>
                    <div>Filter By Length</div>
                    <select className="form-select" name="length" data-filter="1" onChange={props.updateFilter} value={props.length} aria-label="Default select example">
                        <option value="1" >Less than One Minute</option>
                        <option value="2">One to Two Minutes</option>
                        <option value="3">Two to Three Minutes</option>
                        <option value="4">Above Three Minutes</option>
                    </select>
                    <input className="form-control me-2" type="search" placeholder="Search By Key Words in Title or Content" aria-label="Search"/>
                                <button class ="btn btn-outline-success" type ="submit">Submit</button>
            </form>
            {/* <div class="offcanvas show offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div>
                        Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
                    </div>
                    <div class="dropdown mt-3">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                            Dropdown button
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li><span class="dropdown-item" >Action</span></li>
                            <li><span class="dropdown-item" >Another action</span></li>
                            <li><span class="dropdown-item" >Something else here</span></li>
                        </ul>
                    </div>
                </div>
            </div> */}
        </React.Fragment>
    )
}