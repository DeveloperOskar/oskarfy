import React from 'react';
import './sidebar.css';
import SidebarOption from '../sidebarOption/SidebarOption';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryIcon from '@material-ui/icons/LibraryAdd';
import { useStateProvidervalue } from '../../StateProvider';
import GetAppIcon from '@material-ui/icons/GetApp';
const Sidebar = () => {
  const [{ playlists }] = useStateProvidervalue();
  return (
    <div className='sidebar'>
      <div className='sidebar__options'>
        <img
          className='sidebar__logo'
          src='https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg'
          alt='spotifys logo'
        />
        <SidebarOption Icon={HomeIcon} title='Home' />
        <SidebarOption Icon={SearchIcon} title='Search' />
        <SidebarOption Icon={LibraryIcon} title='Your Library' />
        <br></br>
        <strong className='sidebar__title'>PLAYLISTS</strong>

        <SidebarOption
          title='New Playlist'
          img='https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_add_48px-512.png'
        />
        <SidebarOption
          title='Liked Songs'
          img='https://i.pinimg.com/originals/fe/5c/36/fe5c36b8b4cbaa728f3c03a311e002cb.png'
        />
        <hr></hr>
      </div>
      <div className='sidebar__playLists'>
        {playlists?.items?.map((playlist, i) => {
          return (
            <SidebarOption
              key={playlist + i}
              title={playlist.name}
              id={playlist.id}
            />
          );
        })}
      </div>
      <SidebarOption Icon={GetAppIcon} title='Install App' />
    </div>
  );
};

export default Sidebar;
