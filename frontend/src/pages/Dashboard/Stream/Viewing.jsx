import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { PageContent, Sidenav } from '../../../components';

const iceServers = [{
    urls: 'stun:stun.l.google.com:19302',
}];

export default () => {
    const { streamId } = useParams();
    useEffect(() => {
        const socket = io(process.env.REACT_APP_SOCKET, {
            query: {
                token: localStorage.getItem('token'),
                room: streamId,
            }
        });
    }, [ streamId ]);
    return (
        <>
            <PageContent>Content</PageContent>
            <Sidenav></Sidenav>
        </>
    );
};
