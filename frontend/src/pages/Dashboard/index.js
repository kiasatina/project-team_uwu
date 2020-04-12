import React from 'react';

export default [
    {
        component: React.lazy(() => import('./Home')),
        exact: true,
        path: '/home/:post?',
    },
    {
        component: React.lazy(() => import('./Create')),
        exact: true,
        path: '/create/:draft?',
    },
    {
        component: React.lazy(() => import('./Stream')),
        exact: true,
        path: '/stream/:streamId?',
    },
    {
        component: React.lazy(() => import('./Profile')),
        exact: true,
        path: '/profile',
    },
];
