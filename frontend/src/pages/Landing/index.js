import React from 'react';

export default [
    {
        component: React.lazy(() => import('./Login')),
        exact: true,
        path: '/',
    },
    {
        component: React.lazy(() => import('./Register')),
        exact: true,
        path: '/register',
    },
];
