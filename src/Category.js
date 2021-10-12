import React from 'react';
import axios from 'axios';

export default class Category extends React.Component {
    state = {
        category: this.props.selectedCategory,
        catDescription: this.props.selectedCatDescription,
        numSnippets: this.props.numSnippets,
        numComments: this.props.numComments,
        numCollected: this.props.numCollected,
        image: this.props.imageFilePath
    }

    render() {
        return (
            <React.Fragment>              
                    <div className="card">
                        <img src={`./images/${this.state.image}`} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-center">{this.state.category}</h5>
                            <p className="card-text">{this.state.catDescription}</p>
                            <p className="card-text my-0 py-0"><small class="text-muted">There are {this.state.numSnippets} snippets under this {this.state.category}</small></p>
                            <p className="card-text my-0 py-0"><small class="text-muted">They attracted {this.state.numComments} comments. Leave your thought here, too!</small></p>
                            <p className="card-text my-0 py-0"><small class="text-muted">And have been collected {this.state.numCollected} times. Collect your favourites, too!</small></p>
                        </div>
                    </div>
            </React.Fragment>
        )
    }
}