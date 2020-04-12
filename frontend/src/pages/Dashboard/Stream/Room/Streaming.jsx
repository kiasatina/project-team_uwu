import { Stack } from '@chakra-ui/core';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Peer from 'simple-peer';
import { DisplayPost, PageContent } from '../../../../components';
import { getStream, socketEvents } from '../../../../utils';

export default ({ socket, data, info }) => {
    const [stream, setStream] = useState();
    const [layers, setLayers] = useState([]);
    const [size, setSize] = useState({ width: 0, height: 0 });
    const videoRef = useRef();

    useEffect(() => {
        setLayers(Object.values(info.layers));
    }, [info]);

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

    const setLayer = useCallback(
        layer => {
            socket.current.emit(socketEvents.UPDATE_LAYER, layer);
        },
        [socket],
    );

    // For the onDragEnd event
    const moveLayer = useCallback(
        (layerElement, index) => {
            const newLayers = [...layers];
            newLayers[index] = {
                ...newLayers[index],
                position: {
                    x: layerElement.x() / size.width,
                    y: layerElement.y() / size.height,
                },
            };
            setLayer(newLayers[index]);
            setLayers(newLayers);
        },
        [layers, size],
    );

    return (
        <>
            <PageContent label={data.title} loading={!stream}>
                <Stack rounded='md' background='white' p='4' mb='20'>
                    <DisplayPost
                        size={size}
                        setSize={setSize}
                        videoRef={videoRef}
                        video={stream}
                        playing={true}
                        layers={layers}
                        drag={moveLayer}
                    />
                </Stack>
            </PageContent>
        </>
    );
};
