import React, { forwardRef } from 'react';
import { Header } from 'semantic-ui-react';
import './index.scss';

export const PageContent = forwardRef(({
    className = '',
    children,
    label,
}, ref) => {
    return (
        <main
            className={`pagecontent${ label ? ' pagecontent--labelled' : '' } ${ className }`}
            ref={ ref }
        >
            { label && <Header className='pagecontent__header' as='h1'>
                { label }
            </Header> }
            { children }
        </main>
    );
});
