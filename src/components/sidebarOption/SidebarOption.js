import React from 'react';
import './sidebarOption.css';
import SpotifyWebapi from 'spotify-web-api-js';
import { useStateProvidervalue } from '../../StateProvider';

const SidebarOption = ({ title, Icon, img, id }) => {
  const [, dispatch] = useStateProvidervalue();
  const spotify = new SpotifyWebapi();

  const GoToPlaylist = async (idOfPlaylist) => {
    try {
      const selectedPlaylist = await spotify.getPlaylist(idOfPlaylist);
      console.log(selectedPlaylist);
      dispatch({
        type: 'SET_SELECTED_PLAYLIST',
        selectedPlaylist: selectedPlaylist,
      });
    } catch (error) {
      console.log(error);
    }
  };
  if (Icon) {
    return (
      <div
        onClick={
          title === 'Home'
            ? () => {
                dispatch({
                  type: 'SET_SELECTED_PLAYLIST',
                  selectedPlaylist: null,
                });
              }
            : null
        }
        className='sidebarOption'
      >
        {Icon && <Icon className='sidebarOption__icon'></Icon>}
        {Icon ? <h4>{title}</h4> : <p>{title}</p>}
      </div>
    );
  } else {
    return (
      <div style={{ marginTop: 10 }} className='sidebarOption'>
        {img && <img src={img} alt='' className='sidebarOption__img'></img>}
        {img ? (
          <h4>{title}</h4>
        ) : (
          <p
            onClick={() => {
              GoToPlaylist(id);
            }}
          >
            {title}
          </p>
        )}
      </div>
    );
  }
};

export default SidebarOption;
