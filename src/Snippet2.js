import React from 'react';
import axios from 'axios';
import './snippet.css'

export default class Snippet2 extends React.Component {

    state = {
        snippet: {
            "_id": "00001",
            "name": "smart-ass stinks",
            "content": "People say genius is 99% perspiration and 1% inspiration. Maybe that's why sometimes a smart-ass really stinks.",
            "occasions": [
                "work",
                "speech",
                "presentation"
            ],
            "type": "joke",
            "creator": {
                "_id": "100003",
                "username": "timeKiller"
            },
            "collectedBy": [
                {
                    "_id": "100001",
                    "username": "bossWannabe"
                },
                {
                    "_id": "100002",
                    "username": "inspiringSpeaker"
                },
                {
                    "_id": "100003",
                    "username": "timeKiller"
                }
            ],
            "comments": [
                {
                    "_id": "200001",
                    "comment": "I used it at workplace, everyone was laughing. loved it!"
                },
                {
                    "_id": "200002",
                    "comment": "lame... not my thing"
                },
                {
                    "_id": "200003",
                    "comment": "not bad. I tried it at my class presentation by changing smart ass to engineer (nothing against engineer, just that the class topic is on engineering creaticity, so i wanted to crack some jokes), and everyone was enjoying it. most say it's witty. but some find it a bit rude, but acceptable. so i guess it depends on how you used and the audience's tolerance level. good one indeed."
                }
            ],
            "theme": "hardwork",
            "length": 1
        },
        test: 'all right',
        commentStatus: false,
        snippetStatus: false
    };


    // async componentDidMount() {
    //     // let dataList = [];
    //     let oneSnippet =null;
    //     await axios.get('./sample-data/snippets/snippet1.json').then(response => oneSnippet = response.data);
    //     // dataList.push(oneSnippet);
    //     // await axios.get('./sample-data/snippets/snippet2.json').then(response => dataList[1] = response.data);
    //     // await axios.get('./sample-data/snippets/snippet3.json').then(response => dataList[2] = response.data);
    //     // await axios.get('./sample-data/snippets/snippet4.json').then(response => dataList[3] = response.data);

    //     console.log('first snippet is ', oneSnippet);

    //     this.setState({
    //         snippet: {...oneSnippet}
    //     });

    //     console.log('state variable snippet is ', this.state.snippet.name);
    // }

    updateShowHide = (event) => {
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
                            <button className="accordion-button fw-bold text-center text-capitalize" type="button" name="snippetStatus" onClick={this.updateShowHide} aria-expanded="true" aria-controls="collapseOne">
                                {this.state.snippet.name}
                            </button>
                        </h2>
                        <div id="collapseOne" className={this.state.snippetStatus===true? "accordion-collapse collapse show": "accordion-collapse collapse"} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body p-2 px-4">
                                {this.state.snippet.content}
                            </div>
                            <section className="m-2 attribute">
                                <span className="btn btn-primary mx-1 py-0 type">{this.state.snippet.type}</span>
                                <span className="btn btn-primary m-1 py-0 theme">{this.state.snippet.theme}</span>
                                <span className="btn btn-primary m-1 py-0 length">{this.state.snippet.length} {this.state.snippet.length > 1 ? 'mins' : 'min'}</span>
                                {this.state.snippet.collectedBy.length > 0 ?
                                    <span className="btn btn-primary m-1 py-0 collectedBy">Collected by {this.state.snippet.collectedBy.length} users</span>
                                    : null}
                                <span className="btn btn-primary m-1 py-0 occasions">For {
                                this.state.snippet.occasions.map(eachOccasion => 
                                    <span className="btn btn-primary mx-1 my-0 p-0 eachOccasion">{eachOccasion}</span>)
                                }
                                </span>
                                <span className="btn btn-primary m-1 py-0 creator">Contributed by {this.state.snippet.creator}</span>
                            </section>
                            <p>
                                <button className="btn btn-primary m-2" type="button" onClick={this.updateShowHide} name="commentStatus" aria-expanded="false" aria-controls="collapseExample">
                                    {this.state.snippet.comments.length} Comments
                                </button>
                            </p>
                            {this.state.snippet.comments.map(eachComment =>
                                this.state.snippet.commentStatus === true ?
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
            </React.Fragment>
        )
    }

}