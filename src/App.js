import React from 'react';
import Auth from './components/Auth'
import Page from './components/Page'

function App() {
  const [usr,setUsr]=React.useState(null)
  return (
    <React.Fragment>
      {usr?<Page usr={usr}/>:<Auth/>}
    </React.Fragment>
  );
}

export default App;
