import React, { FC } from 'react';
import { NavLink, useLocation, useRouteMatch } from 'react-router-dom';
import slug from 'slug';

type SideBarProps = {
  title: string;
  list: string[];
  isLoading: boolean;
};

const SideBar: FC<SideBarProps> = ({ title, list, isLoading }) => {
  const { url } = useRouteMatch();
  const { search } = useLocation();

  return isLoading ? (
    <h1>LOADING</h1>
  ) : (
    <div>
      <h3 className='header'>{title}</h3>
      <ul className='sidebar-list'>
        {list.map(item => (
          <NavLink
            key={item}
            to={{
              pathname: `${url}/${slug(item)}`,
              search,
            }}
            activeStyle={{
              fontWeight: 'bold',
            }}
          >
            {item.toUpperCase()}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
