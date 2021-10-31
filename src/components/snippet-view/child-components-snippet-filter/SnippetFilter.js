import React from 'react';

export default function SnippetFilter(props) {
    return (
        <React.Fragment>
            <button class="btn btn-primary" type="button" name="collapse" onClick={props.updateShowHide} aria-controls="offcanvasExample">
                Filter Snippets
            </button>

            <div class={props.collapse? "collapse" : "collapse show"} id="collapseExample">
                <form>
                    <div>Filter By Theme</div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="theme" value="all" id="all" checked={props.theme === "all"} onChange={props.updateField} />
                        <label className="form-check-label" for="all">
                            All
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="theme" value="life" id="life" checked={props.theme === "life"} onChange={props.updateField} />
                        <label className="form-check-label" for="life">
                            Life
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="theme" value="hardwork" id="hardwork" checked={props.theme === "hardwork"} onChange={props.updateField} />
                        <label className="form-check-label" for="hardwork">
                            Hardwork
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="theme" value="kindness" id="kindness" checked={props.theme === "kindness"} onChange={props.updateField} />
                        <label className="form-check-label" for="kindness">
                            Kindness
                        </label>
                    </div>
                    <div>Filter By Type</div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="type" value="all" id="all" checked={props.type === "all"} onChange={props.updateField} />
                        <label className="form-check-label" for="all">
                            All
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="type" value="joke" id="joke" checked={props.type === "joke"} onChange={props.updateField} />
                        <label className="form-check-label" for="joke">
                            Joke
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="type" value="story" id="story" checked={props.type === "story"} onChange={props.updateField} />
                        <label className="form-check-label" for="story">
                            Story
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="type" value="quote" id="quote" checked={props.type === "quote"} onChange={props.updateField} />
                        <label className="form-check-label" for="quote">
                            Quote
                        </label>
                    </div>
                    <div>Filter By Length</div>
                    <select className="form-select" name="length" onChange={props.updateField} value={props.length} aria-label="Default select example">
                        <option value="all" >All Lengths</option>
                        <option value="1" >Less than One Minute</option>
                        <option value="2">One to Two Minutes</option>
                        <option value="3">Two to Three Minutes</option>
                        <option value="4">Above Three Minutes</option>
                    </select>
                    <div>Filter By Occasion</div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="speech" name='occasions' value="speech" onChange={props.updateArray} checked={props.occasions.includes('speech')} />
                        <label className="form-check-label" for="speech">
                            Speech
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="chat" name='occasions' value="chat" onChange={props.updateArray} checked={props.occasions.includes('chat')} />
                        <label className="form-check-label" for="chat">
                            Chat
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="networking" name='occasions' value="networking" onChange={props.updateArray} checked={props.occasions.includes('networking')} />
                        <label className="form-check-label" for="networking">
                            Networking
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="presentation" name='occasions' value="presentation" onChange={props.updateArray} checked={props.occasions.includes('presentation')} />
                        <label className="form-check-label" for="presentation">
                            Presentation
                        </label>
                    </div>
                    <input className="form-control me-2" type="search" placeholder="Search By Key Words in Title or Content" name="keyword" onChange={props.updateField} aria-label="Search" />
                    <button class="btn btn-outline-success" type="submit" onClick={(event) => {
                        event.preventDefault(); props.filterSnippets()
                    }} >Search</button>
                </form>
            </div>
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