import React from 'react';
import './login.css';
import { authEndpoint } from '../../spotify';

const Login = () => {
  return (
    <div className='login'>
      <img
        src='https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg'
        alt='spotifys logo'
      />
      <a href={authEndpoint}>SIGN IN WITH SPOTIFY</a>
    </div>
  );
};

export default Login;
