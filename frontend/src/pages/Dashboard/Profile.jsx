import React, { useContext } from 'react';
import { Loading, PageContent, Sidenav, UserProfile } from '../../components';
import { UserContext } from '../../utils';

export default () => {
    const { user, loading } = useContext(UserContext);
    return (
        <Loading loading={loading}>
            <PageContent>
                <UserProfile />
            </PageContent>
            <Sidenav>Sidenav</Sidenav>
        </Loading>
    );
};
