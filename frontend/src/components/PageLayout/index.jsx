import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { UserContext, useGraph, printError } from '../../utils';
import { GET_ME } from '../../graphql/user';
import Navigation from './Navigation';
import './index.scss';

export const PageLayout = ({ children }) => {
    const history = useHistory();
    const { data, loading, dispatch, refetch } = useGraph(GET_ME, {
        pipe: ['getMe'],
        onError: useCallback(
            err => {
                toast.error(printError(err));
                localStorage.removeItem('token');
                history.push('/');
            },
            [history],
        ),
    });

    return (
        <UserContext.Provider
            value={{ user: data, loading, dispatch, refetch }}
        >
            <Navigation />
            <div className='pagelayout'>{children}</div>
        </UserContext.Provider>
    );
};
