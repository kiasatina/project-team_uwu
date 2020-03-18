import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { UserContext, useGraph, printError } from '../../utils';
import { GET_ME } from '../../graphql/user';
import Navigation from './Navigation';
import './index.scss';

export const PageLayout = ({ children }) => {
    const history = useHistory();
    const onError = useCallback(
        err => {
            toast.error(printError(err));
            localStorage.removeItem('token');
            history.push('/');
        },
        [history],
    );

    const { data, loading, dispatch: d } = useGraph(GET_ME, { onError });
    const dispatch = useCallback(data => d({ getMe: { ...data } }), [d]);

    return (
        <UserContext.Provider value={{ user: data.getMe, loading, dispatch }}>
            <Navigation />
            <div className='pagelayout'>{children}</div>
        </UserContext.Provider>
    );
};
