import React from 'react';
import './index.scss';

export const Sidenav = ({
    className = '',
    children,
}) => {
    return (
        <nav className={`sidenav ${ className }`}>
            { children }
        </nav>
    );
};
