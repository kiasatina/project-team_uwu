import React from 'react';
import { Heading } from '@chakra-ui/core';

import { logo } from '../../assets';
import './index.scss';

export const LandingPage = ({ children, title }) => {
    return (
        <main className='landingPage'>
            <section className='landingPage__content'>
                <div className='landingPage__heading'>
                    <img className='landingPage__logo' src={logo} alt='uwu' />
                    <Heading
                        color='teal'
                        className='landingPage__title'
                        size='lg'
                        as='h1'
                    >
                        {title}
                    </Heading>
                </div>
                {children}
            </section>
        </main>
    );
};
