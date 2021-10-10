import React from 'react';
// import Snippet2 from './Snippet2';
import Snippet from './Snippet';
// import Snippet3 from './Snippet3';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <React.Fragment>
      <div className="accordion" id="accordionExample">
      <Snippet filePath={'snippet1.json'} snippetInitialStatus={true} />
      <Snippet filePath={'snippet2.json'} snippetInitialStatus={false}/>
      <Snippet filePath={'snippet3.json'} snippetInitialStatus={false}/>
      <Snippet filePath={'snippet4.json'} snippetInitialStatus={false}/>
      </div>
    </React.Fragment>
  );
}

export default App;
