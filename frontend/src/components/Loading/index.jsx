import React from 'react';
import { Heading } from '@chakra-ui/core';
import './index.scss';

export const Loading = ({ className = '', children, loading }) => {
    return loading ? (
        <div className={`loading ${className}`}>
            <Heading className='loading__text' as='h1'>
                Loading...
            </Heading>
        </div>
    ) : (
        children
    );
};
