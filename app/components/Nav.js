import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

export default function Nav () {
  const nav = [
    {
      linkText: 'Home',
      to: '/'
    },
    {
      linkText: 'Battle',
      to: '/battle'
    },
    {
      linkText: 'Popular',
      to: '/popular'
    },
  ];

  return (
    <ul className="nav">
      {
        nav.map((item, index) => (
          <NavLink
            activeClassName="nav-link--selected"
            className="nav-link"
            exact={true}
            key={index}
            to={item.to}
          >
            {item.linkText}
          </NavLink>
        ))
      }
    </ul>
  )
}
