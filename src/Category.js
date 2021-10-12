import React from 'react';
import axios from 'axios';

export default class Category extends React.Component {
// path state variable is used to store the document path of the data file
    state = {
        catName: null,
        optionName: null,
        optionDescription: null,
        numSnippets: null,
        numComments: null,
        numCollected: null,
        image: null,
        path: this.props.filePath
    }

    async componentDidMount(){
        let category ={};
        let url = './sample-data/categories/';
        await axios.get(url + this.state.path).then(response => category = response.data[0]);

        this.setState({
            optionName: category.optionName,
            optionDescription: category.optionDescription,
            numSnippets: category.numSnippets,
            numComments: category.numComments,
            numCollected: category.numCollected,
            image: category.imagePath
        })
    }
    
    render() {
        return (
            <React.Fragment>              
                    <div className="card">
                        <img src={`./images/${this.state.image}`} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-center">{this.state.optionName}</h5>
                            <p className="card-text">{this.state.optionDescription}</p>
                            <p className="card-text my-0 py-0"><small class="text-muted">There are {this.state.numSnippets} snippets under this {this.state.category}</small></p>
                            <p className="card-text my-0 py-0"><small class="text-muted">They attracted {this.state.numComments} comments. Leave your thought here, too!</small></p>
                            <p className="card-text my-0 py-0"><small class="text-muted">And have been collected {this.state.numCollected} times. Collect your favourites, too!</small></p>
                        </div>
                    </div>
            </React.Fragment>
        )
    }
}