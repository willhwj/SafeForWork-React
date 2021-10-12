import React from 'react';
// import Snippet2 from './Snippet2';
import Snippet from './Snippet';
// import Snippet3 from './Snippet3';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Main';
import Category from './Category';

function App() {
  return (
    <React.Fragment>
      <Main />
      <div className="card-group">
        <Category
          imageFilePath={"theme-kindness.jpg"}
          selectedCategory={'kindness'.toUpperCase()}
          catDescription={'Explore these heart-warming stories and insights about some of the most beautiful aspects of human relationships.'}
          numSnippets={5}
          numComments={17}
          numCollected={21} />
        <Category
          imageFilePath={"theme-hardwork.jpg"}
          selectedCategory={'hardwork'.toUpperCase()}
          catDescription={'Come here when you need a pat on your shoulder on the hard work you have done.'}
          numSnippets={10}
          numComments={19}
          numCollected={31} />
      <Category
          imageFilePath={"theme-life.jpg"}
          selectedCategory={'life'.toUpperCase()}
          catDescription={'This is your life - live the way you want to. Take a look at what others think about life.'}
          numSnippets={29}
          numComments={47}
          numCollected={38} />
      </div>
      <div className="accordion" id="accordionExample">
        <Snippet filePath={'snippet1.json'} snippetInitialStatus={true} />
        <Snippet filePath={'snippet2.json'} snippetInitialStatus={false} />
        <Snippet filePath={'snippet3.json'} snippetInitialStatus={false} />
        <Snippet filePath={'snippet4.json'} snippetInitialStatus={false} />
      </div>
    </React.Fragment>
  );
}

export default App;
