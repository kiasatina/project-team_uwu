import React, { useState, useEffect } from 'react';
import Peer from 'simple-peer';

import { PageContent, Sidenav, Viewer } from '../../../../components';
import { socketEvents } from '../../../../utils';

export default ({ socket, data }) => {
    const [ stream, setStream ] = useState();
    useEffect(() => {
        socket.current.on(socketEvents.START_PEER, () => {
            const peer = new Peer({ trickle: true, initiator: true });
            socket.current.on(socketEvents.PEER_RELAY(), data => {
                peer.signal(data);
            });

            peer.on('signal', data => {
                socket.current.emit(socketEvents.PEER_RELAY(), data);
            });

            peer.on('stream', stream => {
                setStream(stream);
            });
        });

        socket.current.emit(socketEvents.JOIN);
    }, [ socket ]);

    return (
        <>
            <PageContent label={data.title} loading={!stream}>
                <Viewer video={stream}/>
            </PageContent>
            <Sidenav></Sidenav>
        </>
    );
};
