import React from 'react';
import { Heading, Text } from '@chakra-ui/core';
import './index.scss';

export const Sidenav = ({ className = '', children, label, text, padded }) => {
    return (
        <nav
            className={`sidenav${
                padded ? ' sidenav--padded' : ''
            } ${className}`}
        >
            {label && (
                <Heading as='h2' mb={text ? 0 : 4} size='md'>
                    {label}
                </Heading>
            )}
            {text && (
                <Text mb='4' color='gray.500'>
                    {text}
                </Text>
            )}
            {children}
        </nav>
    );
};
