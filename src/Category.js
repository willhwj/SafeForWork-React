import React from 'react';
import axios from 'axios';

export default class Category extends React.Component {
    // path state variable is used to store the document path of the data file
    state = {
        catList: [],
        catType: this.props.categoryType,
    }

    async componentDidMount() {
        console.log("componentDidMount for Category.js");
        let categoryList = [];
        let url = 'http://localhost:8888/categories';
        await axios.get(url).then(response => categoryList = response.data);

        console.log("categoryList is ", categoryList);
        this.setState({
            catList: categoryList
        })
    }

    render() {
        return (
            <div className="card-group">
            {this.state.catList.map(eachCategory => 
                <div className="card">
                    {typeof eachCategory.imagePath==="string"?
                    <img src={`./images/${eachCategory.imagePath}`} className="card-img-top" alt="..." />
                    : null
                    }
                    <div className="card-body">
                        <h5 className="card-title text-center">{eachCategory.optionName}</h5>
                        <p className="card-text">{eachCategory.optionDescription}</p>
                        <p className="card-text my-0 py-0"><small class="text-muted">There are {eachCategory.numSnippets} snippets under this {this.state.catType}</small></p>
                        <p className="card-text my-0 py-0"><small class="text-muted">They attracted {eachCategory.numComments} comments. Leave your thought here, too!</small></p>
                        <p className="card-text my-0 py-0"><small class="text-muted">And have been collected {eachCategory.numCollected} times. Collect your favourites, too!</small></p>
                    </div>
                </div>
            )}
            </div>
        )
    }
}