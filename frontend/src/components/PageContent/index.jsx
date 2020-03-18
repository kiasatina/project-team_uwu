import React, { forwardRef } from 'react';
import { Heading } from '@chakra-ui/core';
import './index.scss';

export const PageContent = forwardRef(
    ({ className = '', children, label, full }, ref) => {
        return (
            <main
                className={`pagecontent${
                    label ? ' pagecontent--labelled' : ''
                } ${className}`}
                ref={ref}
            >
                <div
                    className={`pagecontent__content ${
                        full ? ' pagecontent__content--full' : ''
                    }`}
                >
                    {label && (
                        <Heading
                            className='pagecontent__header'
                            as='h1'
                            size='lg'
                        >
                            {label}
                        </Heading>
                    )}
                    {children}
                </div>
            </main>
        );
    },
);
