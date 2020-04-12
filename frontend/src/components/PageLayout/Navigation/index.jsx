import React, { useContext } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Box,
    Avatar,
} from '@chakra-ui/core';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { logo } from '../../../assets';
import { UserContext } from '../../../utils';
import './index.scss';

const routes = [
    {
        children: 'Home',
        to: '/home',
    },
    {
        children: 'Create',
        to: '/create',
    },
    {
        children: 'Stream',
        to: '/stream',
    },
];

const hydrateRoute = (route, params) =>
    route.replace(/:[^/]*/g, s => params[s.slice(1)] || '');

const dropdownRoutes = [
    {
        text: 'My Profile',
        to: '/profile',
        exact: true,
        icon: FaUser,
    },
];

export default () => {
    const { user } = useContext(UserContext);
    const history = useHistory();
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
            <Menu>
                <MenuButton>
                    <Avatar
                        src={user?.profile_image?.src}
                        name={user?.username}
                    />
                </MenuButton>
                <MenuList placement='bottom-end'>
                    {dropdownRoutes.map(({ to, text, icon, ...route }) => (
                        <MenuItem
                            to={hydrateRoute(to, params)}
                            as={NavLink}
                            key={to}
                            {...route}
                        >
                            <Box as={icon} mr='2' size='12px' />
                            {text}
                        </MenuItem>
                    ))}
                    <MenuItem
                        onClick={() => {
                            localStorage.clear();
                            history.push('/');
                        }}
                    >
                        <Box as={FaSignOutAlt} mr='2' size='12px' />
                        Logout
                    </MenuItem>
                </MenuList>
            </Menu>
        </nav>
    );
};
