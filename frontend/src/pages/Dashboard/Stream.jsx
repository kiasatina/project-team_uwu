import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { PageContent } from '../../components';

export default () => {
    useEffect(() => {
        io(process.env.REACT_APP_SOCKET);
    }, []);
    return (
        <>
            <PageContent
                label='Live Streams'
            >
                Content
            </PageContent>
        </>
    );
};
