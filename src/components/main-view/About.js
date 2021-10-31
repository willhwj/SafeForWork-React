import React from 'react';

export default function About() {
    return (
        <React.Fragment>
            <article>
                <h3>How Did I Come Up With This Idea?</h3>
                <p>As working professionals who interact with people a lot, we all know the power of story-telling when making a sales pitch or hitting up a casual chat with new contacts at networking events, of breaking the ice with light-hearted jokes, of delivering thought-provoking quotes into catchy, rhyming punchlines.</p>
                <p>Such snippets of valuable, contextually relevant content are highly effective as lubricant or even enabler for interpersonal communication. It sets the right stage and calibrates the atmosphere for a proper conversation in business context. Such a snippet takes little effort to narrate, but weighs a lot on the outcome of this contact point.</p>
                <p>Yet we often struggle to come up with the much needed snippet of content on the spur of the moment. Several reasons are behind it:</p>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Lack of a intuitive repository to collate and organize such snippets.</li>
                    <li class="list-group-item">Difficulty in determining if a snippet is safe for sharing at work environment.</li>
                    <li class="list-group-item">Lack of references/examples on how to apply a snippet in real-life situations, especially at work.</li>
                </ul>
                <p>This project aims to solve these 2 problems, by crowd-sourcing for safe-for-work snippets from working professionals and organizing them by different categories. Each snippet also contains comments from other professionals on their thought on its usefulness, appropriateness, and their experience with using it in different settings.</p>
                <p>Have fun exploring!</p>
                <p>And I look forward to your contribution to this common treature trove, too!</p>
            </article>
            <aside>
                <div class="card">
                    <div class="card-header">
                        Snippets of Fun
                    </div>
                    <img src="./images/fun.jpg" class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                            <p>What's life without snippets of fun?</p>
                            <p>Well, work is part of life, too. Your colleagues, customers and business partners are people who want to have fun in life, too.</p>
                            <p>Just make sure it does not cross the line</p>
                            <p>too much.</p>
                            <footer class="blockquote-footer">William  <cite title="Source Title">Safe-For-Work Inspiration</cite></footer>
                        </blockquote>
                    </div>
                </div>
            </aside>
        </React.Fragment>
    )
}