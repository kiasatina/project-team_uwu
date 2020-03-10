import React from 'react';

export default [
    {
        component: React.lazy(() => import('./Landing/Login')),
        exact: true,
        path: '/',
    },
    {
        component: React.lazy(() => import('./Landing/Register')),
        exact: true,
        path: '/register',
    },
    {
        component: React.lazy(() => import('./Dashboard/Home')),
        exact: true,
        path: '/home',
    },
    {
        component: React.lazy(() => import('./Dashboard/Create')),
        exact: true,
        path: '/create',
    },
    {
        component: React.lazy(() => import('./Dashboard/FAQ')),
        exact: true,
        path: '/faq',
    },
];
