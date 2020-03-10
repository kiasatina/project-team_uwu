import React, { useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { toast } from 'react-toastify';

import { UserContext, fetchGraph, printError } from '../../utils';
import { GET_ME } from '../../graphql/user';
import Navigation from './Navigation';
import './index.scss';

const reducer = (state, action) => ({ ...state, ...action });

export const PageLayout = ({ children }) => {
    const [ user, dispatch ] = useReducer(reducer, {});
    const history = useHistory();

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const { getMe } = await fetchGraph(GET_ME);
                if (mounted) {
                    dispatch(getMe);
                }
            } catch (err) {
                toast.error(printError(err.message));
                localStorage.removeItem('token');
                history.push('/');
            }
        })();

        return () => {
            mounted = false;
        }
    }, [ history ]);

    return (
        <UserContext.Provider value={{ user, dispatch }}>
            <Grid className='pagelayout' padded>
                <Navigation />
                <Grid.Row className='pagelayout__content'>{children}</Grid.Row>
            </Grid>
        </UserContext.Provider>
    );
};
