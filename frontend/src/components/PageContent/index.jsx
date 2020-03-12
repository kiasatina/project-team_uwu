import React, { forwardRef } from 'react';
import './index.scss';

export const PageContent = forwardRef(({
    className = '',
    children,
}, ref) => {
    return (
        <main ref={ref} className={`pagecontent ${ className }`}>
            {children}
        </main>
    );
});
