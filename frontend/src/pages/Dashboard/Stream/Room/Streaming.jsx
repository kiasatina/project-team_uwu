import {
    Stack,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Button,
} from '@chakra-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Peer from 'simple-peer';
import {
    DisplayPost,
    DisplayPostItem,
    PageContent,
} from '../../../../components';
import { getStream, socketEvents, displayDate } from '../../../../utils';

export default ({ socket, data, info }) => {
    const [stream, setStream] = useState();
    const [size, setSize] = useState({ width: 0, height: 0 });
    const videoRef = useRef();

    useEffect(() => {
        (async () => {
            const stream = await getStream();
            const peers = new Map();

            socket.current.on(socketEvents.LEAVE, ({ peer, username }) => {
                toast(`${username} has left the stream!`);
                const _peer = peers.get(peer);
                if (_peer) {
                    peers.delete(peer);
                    _peer.destroy();
                }
            });

            socket.current.on(socketEvents.JOIN, ({ peer, username }) => {
                toast(`${username} has joined the stream!`);
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
            <PageContent loading={!stream}>
                <Stack maxW='600px' rounded='md' background='white' p='4'>
                    <Stat mb='4'>
                        <StatLabel fontWeight='bold'>Total Viewers</StatLabel>
                        <StatNumber>
                            {Object.values(info.viewers).length}
                        </StatNumber>
                        <StatHelpText>
                            Updated at{' '}
                            {displayDate(new Date(), { showDate: false })}
                        </StatHelpText>
                    </Stat>
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
                    <Button as={Link} width='100%' mt='3' to='/stream'>
                        End Stream
                    </Button>
                </Stack>
            </PageContent>
        </>
    );
};
