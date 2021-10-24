import React from 'react';
import './snippet.css'

// function to display form for adding new snippets
export default function DisplaySnippetForm(props) {
    return (
        <React.Fragment>
            <div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name='snippetCreator' value={props.snippetCreator} onChange={props.updateField} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="snippetName" className="form-label">Snippet Name</label>
                    <input type="email" className="form-control" id="snippetName" name='snippetName' value={props.snippetName} onChange={props.updateField} />
                </div>
                <div className="mb-3">
                    <label for="snippetContent" className="form-label">Enter Your Snippet Content</label>
                    <textarea row="3" className="form-control" id="snippetContent" name='snippetContent' value={props.snippetContent} onChange={props.updateField} />
                </div>
                <div>On Which Occasions is this Snippet Suitable?</div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="speech" name='snippetOccasions' value="speech" onChange={props.updateArray} checked={props.snippetOccasions.includes('speech')} />
                    <label className="form-check-label" for="speech">
                        Speech
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="chat" name='snippetOccasions' value="chat" onChange={props.updateArray} checked={props.snippetOccasions.includes('chat')} />
                    <label className="form-check-label" for="chat">
                        Chat
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="networking" name='snippetOccasions' value="networking" onChange={props.updateArray} checked={props.snippetOccasions.includes('networking')} />
                    <label className="form-check-label" for="networking">
                        Networking
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="presentation" name='snippetOccasions' value="presentation" onChange={props.updateArray} checked={props.snippetOccasions.includes('presentation')} />
                    <label className="form-check-label" for="presentation">
                        Presentation
                    </label>
                </div>
                <div>What's the Theme of the Snippet?</div>
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
                <div>What's the Type of the Snippet?</div>
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
                <div>How many minutes does it take to narrate this snippet?</div>
                <select className="form-select" name="snippetLength" onChange={props.updateField} value={props.snippetLength} aria-label="Default select example">
                    <option value={1}>Less than One Minute</option>
                    <option value={2}>One to Two Minutes</option>
                    <option value={3}>Two to Three Minutes</option>
                    <option value={4}>Above Three Minutes</option>
                </select>
            </div>
        </React.Fragment>
    )
}