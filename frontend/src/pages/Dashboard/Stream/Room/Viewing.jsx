import React, { useState, useCallback, useEffect } from 'react';
import Peer from 'simple-peer';

import {
    PageContent,
    Sidenav,
    Viewer,
    DisplayPost,
} from '../../../../components';
import { socketEvents } from '../../../../utils';

export default ({ socket, data }) => {
    const [stream, setStream] = useState();

    useEffect(() => {
        socket.current.once(socketEvents.START_PEER, () => {
            const peer = new Peer({ trickle: true, initiator: true });

            // Handshake info sharing
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
    }, [socket]);

    const setLayer = useCallback(
        layer => {
            socket.current.emit(socketEvents.UPDATE_LAYER, layer);
        },
        [socket],
    );

    return (
        <>
            <PageContent label={data.title} loading={!stream}>
                <DisplayPost />
                <Viewer video={stream} />
            </PageContent>
            <Sidenav></Sidenav>
        </>
    );
};
