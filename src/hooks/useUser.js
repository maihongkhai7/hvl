import { useContext } from 'react';
import { userContext } from '../context/userContext';

const useUser = () => {
  const [user, setUser] = useContext(userContext);

  function setEmail(email) {
      setState(user => ({ ...user, email: email}));
  }
  function getEmail() {
    return user.email
}

  return {
    setEmail,
    getEmail
  }
};

export default useUser;
