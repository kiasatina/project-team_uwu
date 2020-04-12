import {
    Accordion,
    AccordionHeader,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Flex,
    Image,
    Input,
    Stack,
} from '@chakra-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import { stickers } from '../../../../assets';
import { DisplayPost, PageContent } from '../../../../components';
import { socketEvents } from '../../../../utils';

const filters = [
    'Grayscale',
    'Sepia',
    'Saturate',
    'Invert',
    'Brightness',
    'Blur',
];

export default ({ socket, data, info, dispatch }) => {
    const [stream, setStream] = useState();
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [layers, setLayers] = useState(Object.values(info.layers));
    const [text, setText] = useState('');
    const videoRef = useRef();

    console.log(data);

    useEffect(() => {
        console.log(info);
    }, [info]);

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

        socket.current.on(socketEvents.UPDATE_LAYER, ({ peer, data }) => {
            console.log(peer);
            console.log(data);
        });
    }, [socket]);

    const setLayer = useCallback(
        layer => {
            socket.current.emit(socketEvents.UPDATE_LAYER, layer);
        },
        [socket],
    );

    // Uses default CSS filters for the filters (one only)
    const setVideoFilter = filter => {
        setLayer({
            type: 'FILTER',
            filter: filter,
        });
    };

    const setTextLayer = () => {
        setText('');
        setLayer({
            type: 'TEXT',
            text,
        });
    };

    const setStickerLayer = index => {
        setLayer({
            type: 'STICKER',
            sticker: {
                href: stickers[index],
            },
        });
    };

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
                    />
                    <Box w='80%' p={4}>
                        <Accordion allowToggle>
                            <AccordionItem>
                                <AccordionHeader>
                                    <Box flex='1' textAlign='left'>
                                        Text
                                    </Box>
                                    <AccordionIcon />
                                </AccordionHeader>
                                <AccordionPanel p={4}>
                                    <Flex direction='row'>
                                        <Input
                                            onChange={({ target }) =>
                                                setText(target.value)
                                            }
                                            placeholder='Enter your text'
                                            value={text}
                                            mr={2}
                                        />
                                        <Button
                                            disabled={!text}
                                            onClick={setTextLayer}
                                        >
                                            Add
                                        </Button>
                                    </Flex>
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <AccordionHeader>
                                    <Box flex='1' textAlign='left'>
                                        Stickers
                                    </Box>
                                    <AccordionIcon />
                                </AccordionHeader>
                                <AccordionPanel p={4}>
                                    <Flex
                                        direction='row'
                                        wrap='wrap'
                                        justify='space-around'
                                    >
                                        {stickers.map((sticker, index) => {
                                            return (
                                                <Image
                                                    m='2'
                                                    size='50px'
                                                    key={index}
                                                    src={sticker}
                                                    className='sticker'
                                                    onClick={() => {
                                                        setStickerLayer(index);
                                                    }}
                                                />
                                            );
                                        })}
                                    </Flex>
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <AccordionHeader>
                                    <Box flex='1' textAlign='left'>
                                        Filters
                                    </Box>
                                    <AccordionIcon />
                                </AccordionHeader>
                                <AccordionPanel p={4}>
                                    <Flex
                                        direction='row'
                                        wrap='wrap'
                                        justify='space-around'
                                    >
                                        {filters.map((filter, index) => (
                                            <Button
                                                key={index}
                                                onClick={() => {
                                                    setVideoFilter(filter);
                                                }}
                                            >
                                                {filter}
                                            </Button>
                                        ))}
                                    </Flex>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </Box>
                </Stack>
            </PageContent>
        </>
    );
};
