import React from 'react';
import { Header } from 'semantic-ui-react';
import './index.scss';

export const Loading = ({
    className = '',
    children,
    loading,
}) => {
    return loading ? (
        <div className={`loading ${ className }`}>
            <Header className='loading__text' as='h1'>
                Loading...
            </Header>
        </div>
    ) : children;
};
