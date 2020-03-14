import React from 'react';
import './index.scss';

export const Sidenav = ({
    className = '',
    children,
    padded,
}) => {
    return (
        <nav
            className={`sidenav${ padded ? ' sidenav--padded' : '' } ${ className }`}
        >
            { children }
        </nav>
    );
};
