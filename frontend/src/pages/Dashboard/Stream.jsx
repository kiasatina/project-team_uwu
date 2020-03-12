import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { PageContent, Sidenav } from '../../components';

export default () => {
    useEffect(() => {
        io.connect(process.env.REACT_APP_SOCKET);
    }, []);
    return (
        <>
            <PageContent>Content</PageContent>
            <Sidenav>Sidenav</Sidenav>
        </>
    );
};
