import React from 'react';
import './header.css';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Avatar } from '@material-ui/core';
import { useStateProvidervalue } from '../../StateProvider';
const Header = () => {
  const [{ user }] = useStateProvidervalue();
  return (
    <div className='header'>
      <div className='header__left'>
        <SearchIcon />
        <input
          type='text'
          placeholder='Search for Songs, Artists or Podcasts'
        />
      </div>
      <div className='header__right'>
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <h5>{user?.display_name}</h5>
        <KeyboardArrowDownIcon />
      </div>
    </div>
  );
};

export default Header;
