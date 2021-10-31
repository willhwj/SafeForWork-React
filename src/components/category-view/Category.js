import React from 'react';
import axios from 'axios';
import '../../custom-css/category.css';

export default class Category extends React.Component {
    // path state variable is used to store the document path of the data file
    state = {
        catList: []
    }

    fetchData = async () => {
        let categoryList = [];
        let url = 'http://localhost:8888/categories';
        console.log(this.props.category, this.props.option);
        await axios.get(url + `/${this.props.category}/${this.props.option}`).then(response => categoryList = response.data);

        console.log("categoryList is ", categoryList);
        this.setState({
            catList: categoryList
        })
    }

    async componentDidMount() {
        console.log("componentDidMount for Category.js");
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        console.log("componentDidUpdate");
        console.log(prevProps);
        if (prevProps.category !== this.props.category) {
            console.log(this.props);
            this.fetchData();
        }

    }

    // for dev n testing,use 'http://localhost:8888/categories';
    // for deployment, use https://sfw-express.herokuapp.com;

    render() {
        return (
            <div className="row align-items-start row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-3">
                {this.state.catList.map(eachCategory =>
                    <div className="col mh-100">
                        <div className="card">
                            {typeof eachCategory.imagePath === "string" ?
                                <img src={`./images/${eachCategory.imagePath}`} className="card-img-top" alt="..." />
                                : null
                            }
                            <div className="card-body pb-1">
                                <h5 className="card-title text-center">{eachCategory.optionName}</h5>
                                <p className="card-text">{eachCategory.optionDescription}</p>
                                <ul class="list-group list-group-flush mx-0 px-0">
                                <p className="card-text m-0 p-0 list-group-item"><small class="text-muted">{eachCategory.numSnippets} snippets under this {eachCategory.category}</small></p>
                                <p className="card-text m-0 p-0 list-group-item"><small class="text-muted">Attracted {eachCategory.numComments} comments. </small></p>
                                <p className="card-text m-0 p-0 list-group-item"><small class="text-muted">Collected by {eachCategory.numCollected} users.</small></p>
                                </ul>
                            </div>
                            <div class="card-footer text-muted mh-8 fs-6">
                                Last Updated 2 days ago
                            </div>
                            <button className="btn btn-secondary mx-1 py-0" data-option-selected={eachCategory.optionName} data-active-page="snippet" data-category-selected={eachCategory.category} onClick={this.props.updateView} >Go To Snippets</button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}