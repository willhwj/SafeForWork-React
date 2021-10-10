import React from 'react';
import axios from 'axios';
import './snippet.css'

export default class Snippet3 extends React.Component {

    state = {
        commentStatus: false,
        snippetStatus: false
    };

    snippet={};

    async componentDidMount() {
        // let dataList = [];
        let oneSnippet = null;
        await axios.get('./sample-data/snippets/snippet1.json').then(response => oneSnippet = response.data);
        // dataList.push(oneSnippet);
        // await axios.get('./sample-data/snippets/snippet2.json').then(response => dataList[1] = response.data);
        // await axios.get('./sample-data/snippets/snippet3.json').then(response => dataList[2] = response.data);
        // await axios.get('./sample-data/snippets/snippet4.json').then(response => dataList[3] = response.data);

        console.log('first snippet is ', oneSnippet);

        this.snippet=oneSnippet; 
        // let array= Array.from(this.state.snippet.occasions);
        console.log('state variable snippet is ', this.snippet);
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

    displayOneSnippet = () => {
        let name=this.snippet.name;
        let content=this.snippet.content;
        let type=this.snippet.type;
        let creator=this.snippet.creator.username;
        let theme=this.snippet.theme;
        let length=this.snippet.length;
        let occasions=this.snippet.occasions;
        let collectedBy=[...this.snippet.collectedBy];
        let comments=[...this.snippet.comments];

        return (
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button fw-bold text-center text-capitalize" type="button" name="snippetStatus" onClick={this.updateShowHide} data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        {name}
                    </button>
                </h2>
                <div id="collapseOne" className={this.state.snippetStatus === true ? "accordion-collapse collapse show" : "accordion-collapse collapse"} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body p-2 px-4">
                        {content}
                    </div>
                    <section className="m-2 attribute">
                        <span className="btn btn-primary mx-1 py-0 type">{type}</span>
                        <span className="btn btn-primary m-1 py-0 theme">{theme}</span>
                        <span className="btn btn-primary m-1 py-0 length">{length} {length > 1 ? 'mins' : 'min'}</span>
                        {collectedBy.length > 0 ?
                            <span className="btn btn-primary m-1 py-0 collectedBy">Collected by {collectedBy.length} users</span>
                            : null}
                        <span className="btn btn-primary m-1 py-0 occasions">For {
                                    occasions.map(eachOccasion =>
                                        <span className="btn btn-primary mx-1 my-0 p-0 eachOccasion">{eachOccasion}</span>)
                                }
                                </span>
                        <span className="btn btn-primary m-1 py-0 creator">Contributed by {creator}</span>
                    </section>
                    <p>
                        <button className="btn btn-primary m-2" type="button" onClick={this.updateShowHide} name="commentStatus" aria-expanded="false" aria-controls="collapseExample">
                            {comments.length} Comments
                        </button>
                    </p>
                    {comments.map(eachComment =>
                        this.state.commentStatus === true ?
                            <div className="collapse show m-2">
                                <div className="card card-body m-1">
                                    {eachComment.comment}
                                </div>
                            </div> :
                            <div className="collapse m-2">
                                <div className="card card-body m-1">
                                    {eachComment.comment}
                                </div>
                            </div>
                    )}
                </div>
            </div>
        )
    }

    render() {
        return (
            <React.Fragment>
                <div className="accordion" id="accordionExample">
                    {this.displayOneSnippet()}
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed text-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Accordion Item #2
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}