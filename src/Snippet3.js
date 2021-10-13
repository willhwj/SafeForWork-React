import React from 'react';
import axios from 'axios';
import './snippet.css'

export default class Snippet3 extends React.Component {

    state = {
        // commentStatus: false,
        snippetStatus: true,
        allSnippets: []
    };

    async componentDidMount() {
        // let dataList = [];
        let response = await axios.get('./sample-data/snippets/snippetTest.json')
        let snippets = response.data;
        // await axios.get('./sample-data/snippets/snippet1.json').then(response => dataList[1] = response.data);
        // dataList.push(oneSnippet);
        // await axios.get('./sample-data/snippets/snippet2.json').then(response => dataList[1] = response.data);
        // dataList.push(oneSnippet);
        // await axios.get('./sample-data/snippets/snippet3.json').then(response => dataList[2] = response.data);
        // dataList.push(oneSnippet);
        // await axios.get('./sample-data/snippets/snippet4.json').then(response => dataList[3] = response.data);
        // dataList.push(oneSnippet);

        console.log('response data is ', snippets);

        // this.snippet=oneSnippet; 
        // let array= Array.from(this.state.snippet.occasions);
        this.setState({
            allSnippets: snippets
        })
    }

    updateShowHide = (event) => {
        this.state[event.target.name] === true ?
            this.setState({
                [event.target.name]: false
            }) :
            this.setState({
                [event.target.name]: true
            })
    }

    displayOneSnippet = (oneSnippet) => {
        console.log(oneSnippet);
        return (
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button classßName="accordion-button fw-bold text-center text-capitalize" type="button" name="snippetStatus" onClick={this.updateShowHide} data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        {oneSnippet.name}
                    </button>
                </h2>
                <div id="collapseOne" className={this.state.snippetStatus === true ? "accordion-collapse collapse show" : "accordion-collapse collapse"} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body p-2 px-4">
                        {oneSnippet.content}
                    </div>
                    <section className="m-2 attribute">
                        <span className="btn btn-primary mx-1 py-0 type">{oneSnippet.type}</span>
                        <span className="btn btn-primary m-1 py-0 theme">{oneSnippet.theme}</span>
                        <span className="btn btn-primary m-1 py-0 length">{oneSnippet.length} {oneSnippet.length > 1 ? 'mins' : 'min'}</span>
                        {oneSnippet.collectedBy.length > 0 ?
                            <span className="btn btn-primary m-1 py-0 collectedBy">Collected by {oneSnippet.collectedBy.length} users</span>
                            : null}
                        <span className="btn btn-primary m-1 py-0 occasions">For {oneSnippet.occasions.map(eachOccasion =>
                            <span className="btn btn-primary mx-1 my-0 p-0 eachOccasion">{eachOccasion}</span>)}
                        </span>
                        <span className="btn btn-primary m-1 py-0 creator">Contributed by {oneSnippet.creator.name}</span>
                    </section>
                    <p>
                        <button className="btn btn-primary m-2" type="button" onClick={this.updateShowHide} name="commentStatus" aria-expanded="false" aria-controls="collapseExample">
                            {oneSnippet.comments.length} Comments
                        </button>
                    </p>
                    {/* {this.state.commentStatus === true ?
                        <div><button name="addNewComment" onClick={this.updateShowHide}>Add New Comment</button></div>
                        : null}
                    {this.state.addNewComment === false ? null : this.displayAddComment()} */}
                    {oneSnippet.comments.map(eachComment =>
                        <div className="collapse show m-2">
                            <div className="card card-body m-1">
                                {eachComment.comment}
                            </div>
                        </div>
                        // this.state.commentStatus === true ?
                        //     <div className="collapse show m-2">
                        //         <div className="card card-body m-1">
                        //             {eachComment.comment}
                        //         </div>
                        //     </div> :
                        //     <div className="collapse m-2">
                        //         <div className="card card-body m-1">
                        //             {eachComment.comment}
                        //         </div>
                        //     </div>
                    )}
                </div>
            </div>
        )
    }

    render() {
        console.log(typeof (this.state.allSnippets));
        console.log(this.state.allSnippets);
        return (
            <React.Fragment>
                <div className="accordion" id="accordionExample">
                    {this.state.allSnippets.map((eachSnippet) => this.displayOneSnippet(eachSnippet))}
                </div>
            </React.Fragment>
        )
    }

}