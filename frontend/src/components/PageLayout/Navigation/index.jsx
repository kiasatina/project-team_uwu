import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { logo } from '../../../assets';
import './index.scss';

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
        children: 'FAQ',
        exact: true,
        to: '/faq',
    },
];

const hydrateRoute = (route, params) =>
    route.replace(/:[^/]*/g, s => params[s.slice(1)] || '');

export default () => {
    const params = useParams();
    return (
        <Grid.Row as='nav' className='nav'>
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
                <img
                    src='https://media.tenor.com/images/2e134ea071498a68c777d5540b65fecd/tenor.gif'
                    alt='you'
                    className='nav__profile-img'
                />
            </div>
        </Grid.Row>
    );
};
