import React, { useContext } from 'react';
import { PageContent, Loading, Sidenav } from '../../components';
import { UserContext } from '../../utils';

export default () => {
    const { user, loading } = useContext(UserContext);
    return (
        <Loading loading={loading}>
            <PageContent label='Home'>
                <div style={{ height: '200vh' }}></div>
                Welcome {user?.username}
            </PageContent>
            <Sidenav>
                Sidenav
                <div style={{ height: '200vh' }}></div>
            </Sidenav>
        </Loading>
    );
};
