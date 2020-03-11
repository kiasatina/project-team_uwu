import React, { useContext } from 'react';
import { PageContent, Loading, Sidenav } from '../../components';
import { UserContext } from '../../utils';

export default () => {
    const { user = {}, loading } = useContext(UserContext);
    return (
        <Loading loading={ loading }>
            <PageContent>Welcome { user.username }</PageContent>
            <Sidenav>Sidenav</Sidenav>
        </Loading>
    );
};
