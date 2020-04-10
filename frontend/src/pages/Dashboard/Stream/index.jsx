import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Streams from './Streams';
import Room from './Room';

export default () => {
    return (
        <Switch>
            <Route path='/stream/:streamId' exact component={ Room }/>
            <Route path='/stream' component={ Streams }/>
        </Switch>
    );
};
