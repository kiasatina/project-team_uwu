import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { PageLayout } from '../PageLayout';
import pages from '../../pages/Dashboard';
import routes from '../../pages/Landing';

import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css';
import './index.scss';

export const App = () => {
    return (
        <Suspense fallback={'lol'}>
            <Switch>
                {routes.map((route, i) => (
                    <Route key={i} {...route} />
                ))}
                <PageLayout>
                    <Suspense fallback={'lol'}>
                        {pages.map((route, i) => (
                            <Route key={i} {...route} />
                        ))}
                    </Suspense>
                </PageLayout>
            </Switch>
        </Suspense>
    );
};
