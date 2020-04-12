import React, { forwardRef } from 'react';
import { Heading } from '@chakra-ui/core';

import { Loading } from '../';
import './index.scss';

export const PageContent = forwardRef(
    ({ className = '', children, loading, label, full }, ref) => {
        return (
            <Loading loading={loading}>
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
            </Loading>
        );
    },
);
