import React from 'react';
import { Header } from 'semantic-ui-react';

import { logo } from '../../assets';
import './index.scss';

export const LandingPage = ({ children, title }) => {
    return (
        <main className='landingPage'>
            <section className='landingPage__content'>
                <div className='landingPage__heading'>
                    <img className='landingPage__logo' src={logo} alt='uwu' />
                    <Header
                        color='teal'
                        className='landingPage__title'
                        size='medium'
                        as='h1'
                    >
                        {title}
                    </Header>
                </div>
                {children}
            </section>
        </main>
    );
};
