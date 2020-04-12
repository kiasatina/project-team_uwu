import { Stack } from '@chakra-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import Peer from 'simple-peer';
import {
    DisplayPost,
    DisplayPostItem,
    PageContent,
} from '../../../../components';
import { getStream, socketEvents } from '../../../../utils';

export default ({ socket, data, info }) => {
    const [stream, setStream] = useState();
    const [size, setSize] = useState({ width: 0, height: 0 });
    const videoRef = useRef();

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

                // Handshake info sharing
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
    }, [socket]);

    return (
        <>
            <PageContent label={data.title} loading={!stream}>
                <Stack rounded='md' background='white' p='4' mb='20'>
                    <DisplayPost
                        size={size}
                        setSize={setSize}
                        videoRef={videoRef}
                        video={stream}
                        playing
                        layers={Object.values(info.layers)}
                    >
                        {Object.entries(info.layers).map(([id, layer]) => (
                            <DisplayPostItem
                                layer={layer}
                                size={size}
                                key={id}
                            />
                        ))}
                    </DisplayPost>
                </Stack>
            </PageContent>
        </>
    );
};
