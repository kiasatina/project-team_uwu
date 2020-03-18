import React, { Suspense } from 'react';
import { ThemeProvider, theme, CSSReset } from '@chakra-ui/core';
import { Switch, Route } from 'react-router-dom';
import { PageLayout } from '../PageLayout';
import pages from '../../pages/Dashboard';
import routes from '../../pages/Landing';
import { Loading } from '../Loading';

import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

theme.fonts.heading = `'Muli', sans-serif`;
theme.fonts.body = `'Muli', sans-serif`;

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <Suspense fallback={<Loading loading />}>
                <Switch>
                    {routes.map((route, i) => (
                        <Route key={i} {...route} />
                    ))}
                    <PageLayout>
                        <Suspense fallback={<Loading loading />}>
                            {pages.map((route, i) => (
                                <Route key={i} {...route} />
                            ))}
                        </Suspense>
                    </PageLayout>
                </Switch>
            </Suspense>
        </ThemeProvider>
    );
};
