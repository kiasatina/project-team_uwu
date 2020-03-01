import React from 'react';
import { NavLink } from 'react-router-dom';
import { logo } from '../../../assets';
import './index.scss';

const routes = [
    {
        children: 'Home',
        exact: true,
        to: '/',
    },
    {
        children: 'Create',
        exact: true,
        to: '/create',
    },
    {
        children: 'FAQ',
        exact: true,
        to: '/faq',
    },
];

export default () => {
    return (
        <nav className='nav'>
            <div className='nav__content'>
                <img src={logo} className='nav__logo' alt='uwu' />
                <ul className='nav__items'>
                    {routes.map(route => (
                        <li className='nav__item' key={route.to}>
                            <NavLink
                                activeClassName='nav__item-link--active'
                                className='nav__item-link'
                                {...route}
                            />
                        </li>
                    ))}
                </ul>
                <div className='nav__profile'>
                    <img
                        src='https://media.tenor.com/images/2e134ea071498a68c777d5540b65fecd/tenor.gif'
                        alt='you'
                        className='nav__profile-img'
                    />
                </div>
            </div>
        </nav>
    );
};
