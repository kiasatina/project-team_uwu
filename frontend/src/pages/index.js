import React from 'react';

export default [
    {
        component: React.lazy(() => import('./Landing')),
        exact: true,
        path: '/',
    },
    {
        component: React.lazy(() => import('./Home')),
        exact: true,
        path: '/:id',
    },
];
