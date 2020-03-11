import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { toast } from 'react-toastify';

import { UserContext, useGraph, printError } from '../../utils';
import { GET_ME } from '../../graphql/user';
import Navigation from './Navigation';
import './index.scss';

export const PageLayout = ({ children }) => {
    const history = useHistory();
    const onError = useCallback(err => {
        toast.error(printError(err));
        localStorage.removeItem('token');
        history.push('/');
    }, [ history ]);

    const { data, loading, dispatch } = useGraph(GET_ME, { onError });

    return (
        <UserContext.Provider value={{ user: data.getMe, loading, dispatch }}>
            <Grid className='pagelayout' padded>
                <Navigation />
                <Grid.Row className='pagelayout__content'>{children}</Grid.Row>
            </Grid>
        </UserContext.Provider>
    );
};
