import React from 'react';
import axios from 'axios';
import './category.css';

export default class Category extends React.Component {
    // path state variable is used to store the document path of the data file
    state = {
        catList: []
    }

    fetchData = async () => {
        let categoryList = [];
        let url = 'https://sfw-express.herokuapp.com/categories';
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
        console.log(prevProps);
        if (prevProps.category !== this.props.category) {
            console.log(this.props);
            this.fetchData();
        }

    }

    // static async getDerivedStateFromProps(nextProps, prevState) {
    //     console.log("getDerivedStateFromProps for Category.js");
    //     if (nextProps.category !== prevState.category || nextProps.option !== prevState.option) {
    //         console.log("enter if statement for getDerivedStateFromProps");
    //         let categoryList = [];
    //         let url = 'http://localhost:8888/categories';
    //         await axios.get(url + `/${nextProps.category}/${nextProps.option}`).then(response => categoryList = response.data);
    //         console.log("axios results from getDerivedStateFromProps", categoryList);
    //         this.setState ({
    //             catList: categoryList,
    //             category: nextProps.category,
    //             option: nextProps.option
    //         })
    //     }
    //     return null;
    // }

    render() {
        return (
            <div className="row align-items-start row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-0">
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
                                <p className="card-text my-0 py-0"><small class="text-muted">There are {eachCategory.numSnippets} snippets under this {this.state.catType}</small></p>
                                <p className="card-text my-0 py-0"><small class="text-muted">They attracted {eachCategory.numComments} comments. Leave your thought here, too!</small></p>
                                <p className="card-text my-0 py-0"><small class="text-muted">And have been collected {eachCategory.numCollected} times. Collect your favourites, too!</small></p>
                            </div>
                            <div class="card-footer text-muted mh-8 fs-6">
                                Last Updated 2 days ago
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}