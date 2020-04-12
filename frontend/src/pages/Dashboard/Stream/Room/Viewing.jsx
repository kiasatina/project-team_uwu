import {
    Accordion,
    AccordionHeader,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Modal,
    ModalOverlay,
    ModalBody,
    ModalContent,
    ModalFooter,
    useDisclosure,
    Badge,
    Avatar,
    Heading,
    Box,
    Button,
    Flex,
    Image,
    Input,
    Stack,
} from '@chakra-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Peer from 'simple-peer';
import { stickers } from '../../../../assets';
import {
    DisplayPost,
    PageContent,
    DisplayPostItem,
} from '../../../../components';
import { socketEvents } from '../../../../utils';

export default ({ socket, data, info }) => {
    const layers = Object.values(info.layers);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [stream, setStream] = useState();
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [text, setText] = useState('');
    const [layer, setLayer] = useState();
    const videoRef = useRef();

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

    const setTextLayer = () => {
        const newLayer = {
            type: 'TEXT',
            text,
            position: {
                x: 0.5,
                y: 0.5,
            },
        };
        socket.current.emit(socketEvents.UPDATE_LAYER, newLayer);
        setLayer(newLayer);
    };

    const setStickerLayer = index => {
        let newLayer = {
            type: 'STICKER',
            sticker: {
                href: stickers[index],
            },
            position: {
                x: 0.5,
                y: 0.5,
            },
        };
        socket.current.emit(socketEvents.UPDATE_LAYER, newLayer);
        setLayer(newLayer);
    };

    // For the onDragEnd event
    const moveLayer = useCallback(
        layerElement => {
            const newLayer = {
                ...layer,
                position: {
                    x: layerElement.x() / size.width,
                    y: layerElement.y() / size.height,
                },
            };
            socket.current.emit(socketEvents.UPDATE_LAYER, newLayer);
            setLayer(newLayer);
        },
        [socket, layer, size],
    );

    return (
        <>
            <PageContent loading={!stream}>
                <Stack
                    maxW='600px'
                    rounded='md'
                    background='white'
                    p='4'
                    spacing='4'
                >
                    <Stack isInline spacing='0.5em'>
                        <Avatar
                            name={data.user.username}
                            src={data.user.profile_image?.src}
                            mr='4'
                        />
                        <Stack spacing='5px'>
                            <Heading as='h1' size='md'>
                                {data.title}
                            </Heading>
                            <Badge>
                                {Object.values(info.viewers).length} Viewers
                            </Badge>
                        </Stack>
                    </Stack>
                    <DisplayPost
                        size={size}
                        setSize={setSize}
                        videoRef={videoRef}
                        video={stream}
                        playing
                        layers={layers}
                    >
                        {Object.entries(info.layers).map(([id, layer]) => (
                            <DisplayPostItem
                                drag={
                                    id === socket.current.id
                                        ? e => {
                                              moveLayer(e.target);
                                          }
                                        : undefined
                                }
                                layer={layer}
                                size={size}
                                key={id}
                            />
                        ))}
                    </DisplayPost>
                    <Stack spacing='1'>
                        <Button onClick={onOpen} width='100%'>
                            Edit Layer
                        </Button>
                        <Button
                            variant='outline'
                            as={Link}
                            width='100%'
                            to='/stream'
                        >
                            Leave Stream
                        </Button>
                    </Stack>
                </Stack>
            </PageContent>
            <Modal scrollBehavior='inside' isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent rounded='md'>
                    <ModalBody>
                        <Accordion mt='4' allowToggle>
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
                        </Accordion>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} width='100%'>
                            Done
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
