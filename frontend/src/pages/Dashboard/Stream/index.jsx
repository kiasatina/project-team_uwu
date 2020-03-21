import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Streams from './Streams';
import Viewing from './Viewing';

export default () => {
    return (
        <Switch>
            <Route path='/stream/:streamId' exact component={ Viewing }/>
            <Route path='/stream' component={ Streams }/>
        </Switch>
    );
};
