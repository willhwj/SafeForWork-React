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
                        <input className="form-check-input" type="radio" name="snippetTheme" value="life" id="life" checked={props.snippetTheme === "life"} onChange={props.updateField} />
                        <label className="form-check-label" for="life">
                            Life
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="snippetTheme" value="hardwork" id="hardwork" checked={props.snippetTheme === "hardwork"} onChange={props.updateField} />
                        <label className="form-check-label" for="hardwork">
                            Hardwork
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="snippetTheme" value="kindness" id="kindness" checked={props.snippetTheme === "kindness"} onChange={props.updateField} />
                        <label className="form-check-label" for="kindness">
                            Kindness
                        </label>
                    </div>
                    <div>Filter By Type</div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="snippetType" value="joke" id="joke" checked={props.snippetType === "joke"} onChange={props.updateField} />
                        <label className="form-check-label" for="joke">
                            Joke
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="snippetType" value="story" id="story" checked={props.snippetType === "story"} onChange={props.updateField} />
                        <label className="form-check-label" for="story">
                            Story
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="snippetType" value="quote" id="quote" checked={props.snippetType === "quote"} onChange={props.updateField} />
                        <label className="form-check-label" for="quote">
                            Quote
                        </label>
                    </div>
                    <div>Filter By Length</div>
                    <select className="form-select" name="snippetLength" onChange={props.updateField} value={props.snippetLength} aria-label="Default select example">
                        <option value={1}>Less than One Minute</option>
                        <option value={2}>One to Two Minutes</option>
                        <option value={3}>Two to Three Minutes</option>
                        <option value={4}>Above Three Minutes</option>
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