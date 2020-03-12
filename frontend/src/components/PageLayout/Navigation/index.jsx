import React, { useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

import { UserContext } from '../../../utils';
import { logo } from '../../../assets';
import './index.scss';

const DEFAULT = 'https://media.tenor.com/images/2e134ea071498a68c777d5540b65fecd/tenor.gif';

const routes = [
    {
        children: 'Home',
        exact: true,
        to: '/home',
    },
    {
        children: 'Create',
        exact: true,
        to: '/create',
    },
    {
        children: 'Stream',
        exact: true,
        to: '/stream',
    },
    {
        children: 'FAQ',
        exact: true,
        to: '/faq',
    },
];

const hydrateRoute = (route, params) =>
    route.replace(/:[^/]*/g, s => params[s.slice(1)] || '');

export default () => {
    const { user, loading } = useContext(UserContext);
    const params = useParams();

    return (
        <nav className='nav'>
            <img src={logo} className='nav__logo' alt='uwu' />
            <ul className='nav__items'>
                {routes.map(({ to, ...route }) => (
                    <li className='nav__item' key={to}>
                        <NavLink
                            activeClassName='nav__item-link--active'
                            className='nav__item-link'
                            to={hydrateRoute(to, params)}
                            {...route}
                        />
                    </li>
                ))}
            </ul>
            <div className='nav__profile'>
                {
                    loading ? <Loader active/> : (
                        <img
                            src={ user?.profile_image?.src || DEFAULT }
                            alt='you'
                            className='nav__profile-img'
                        />
                    )
                }
            </div>
        </nav>
    );
};
