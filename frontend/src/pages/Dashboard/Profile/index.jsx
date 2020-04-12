import React, { useContext } from 'react';
import { UserContext } from '../../../utils';
import { Route, Switch, Redirect, useParams } from 'react-router-dom';
import { MyProfile } from './MyProfile';
import { UserProfile } from './UserProfile';

export default () => {
    const { userId, post } = useParams();
    const { user = {} } = useContext(UserContext);
    if (!post && user._id === userId) {
        return <Redirect to='/profile' />;
    }

    return (
        <Switch>
            <Route path='/profile' exact component={MyProfile} />
            <Route path='/profile/:userId' component={UserProfile} />
        </Switch>
    );
};
