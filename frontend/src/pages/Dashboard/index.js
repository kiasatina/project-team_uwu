import React from 'react';

export default [
    {
        component: React.lazy(() => import('./Home')),
        exact: true,
        path: '/home',
    },
    {
        component: React.lazy(() => import('./Create')),
        exact: true,
        path: '/create',
    },
    {
        component: React.lazy(() => import('./FAQ')),
        exact: true,
        path: '/faq',
    },
    {
        component: React.lazy(() => import('./Stream')),
        exact: true,
        path: '/stream',
    },
    {
        component: React.lazy(() => import('./Profile')),
        exact: true,
        path: '/profile',
    },
];
