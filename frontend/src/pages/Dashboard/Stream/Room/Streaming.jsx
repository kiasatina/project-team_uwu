import React, { useEffect, useState } from 'react';
import Peer from 'simple-peer';
import { PageContent, Sidenav, Viewer } from '../../../../components';
import { getStream, socketEvents } from '../../../../utils';

export default ({ socket, data }) => {
    const [ stream, setStream ] = useState();
    useEffect(() => {
        (async () => {
            const stream = await getStream();
            const peers = new Map();

            socket.current.on(socketEvents.LEAVE, ({ peer }) => {
                const _peer = peers.get(peer);
                if (_peer) {
                    peers.delete(peer);
                    _peer.destroy();
                }
            });

            socket.current.on(socketEvents.JOIN, ({ peer }) => {
                const _peer = new Peer({ trickle: true, stream });
                peers.set(peer, _peer);

                _peer.on('signal', data => {
                    socket.current.emit(socketEvents.PEER_RELAY(), {
                        peer,
                        data,
                    });
                });

                socket.current.on(socketEvents.PEER_RELAY(peer), data => {
                    _peer.signal(data);
                });

                socket.current.emit(socketEvents.START_PEER, peer);
            });

            setStream(stream);
        })();
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
