import React from 'react';
import axios from 'axios';
import './snippet.css'

export default class Snippet extends React.Component {

    state = {
        name: '',
        content: '',
        occasions: [],
        type: '',
        creator: '',
        collectedBy: [],
        comments: [],
        theme: '',
        length: -1,
        commentStatus: false
    };

    async componentDidMount() {
        let snippet = {};
        await axios.get('./sample-data/snippets/snippet1.json').then(response => snippet = response.data);

        this.setState({
            name: snippet.name,
            content: snippet.content,
            occasions: [...snippet.occasions],
            type: snippet.type,
            creator: snippet.creator.username,
            collectedBy: [...snippet.collectedBy],
            comments: [...snippet.comments],
            theme: snippet.theme,
            length: snippet.length
        })
    }


    updateShowHide=(event) => {
        this.state[event.target.name] === true ?
            this.setState({
                [event.target.name]: false
            }) :
            this.setState({
                [event.target.name]: true
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button fw-bold text-center text-capitalize" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                {this.state.name}
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body p-2 px-4">
                                {this.state.content}
                            </div>
                            <section className="m-2 attribute">
                                <span className="btn btn-primary mx-1 py-0 type">{this.state.type}</span>
                                <span className="btn btn-primary m-1 py-0 theme">{this.state.theme}</span>
                                <span className="btn btn-primary m-1 py-0 length">{this.state.length} {this.state.length > 1 ? 'mins' : 'min'}</span>
                                {this.state.collectedBy.length > 0 ?
                                    <span className="btn btn-primary m-1 py-0 collectedBy">Collected by {this.state.collectedBy.length} users</span>
                                    : null}
                                <span className="btn btn-primary m-1 py-0 occasions">For {this.state.occasions.join(', ')}</span>
                                <span className="btn btn-primary m-1 py-0 creator">Contributed by {this.state.creator}</span>
                            </section>
                            <p>
                                <button className="btn btn-primary m-2" type="button" onClick={this.updateShowHide} name="commentStatus" aria-expanded="false" aria-controls="collapseExample">
                                    {this.state.comments.length} Comments
                                </button>
                            </p>
                            {this.state.comments.map(eachComment =>
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
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                            <button className="accordion-button collapsed text-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Accordion Item #3
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card" style={{ width: '20rem' }}>
                    <div className="card-body">
                        <h5 className="card-title text-center">{this.state.name}</h5>
                        <p className="card-text">{this.state.content}</p>
                        <span className="btn btn-primary m-1">{this.state.type}</span>
                        <span className="btn btn-primary m-1 ">{this.state.theme}</span>
                        <span className="tooltiptext">Click to see all snippets of this theme</span>
                        <span className="btn btn-primary m-1">{this.state.length} mins</span>
                        {this.state.collectedBy.length > 0 ?
                            <span className="btn btn-primary m-1">Collected by {this.state.collectedBy.length} users</span>
                            : null}
                        <span className="btn btn-primary m-1">for {this.state.occasions.join(', ')}</span>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}