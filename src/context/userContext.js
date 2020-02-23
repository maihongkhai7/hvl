import React, { useState } from 'react';

const userContext = React.createContext();

const userProvider = (props) => {
    const [user, setUser] = useState({
      email: null,
    });
    return (
      <userContext.Provider value={[user, setUser]}>
        {props.children}
      </userContext.Provider>
    );
  };
  
  export { userContext, userProvider };