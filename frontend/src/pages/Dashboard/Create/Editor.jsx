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
} from '@chakra-ui/core';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import { toast } from 'react-toastify';
import { stickers } from '../../../assets';
import { Video, VideoLayer } from '../../../components';
import { UPDATE_POST } from '../../../graphql/post';
import { fetchGraph, printError } from '../../../utils';
import './index.scss';

export const Editor = ({ draft, onExit }) => {
    const [playing, setIsPlaying] = useState(true);
    // eslint-disable-next-line
    const [dragging, setIsDragging] = useState(false);
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [layers, setLayers] = useState(draft.layers);
    const textInput = useRef();
    const videoLayerRef = useRef();

    const filters = [
        'Grayscale',
        'Sepia',
        'Saturate',
        'Invert',
        'Brightness',
        'Blur',
    ];

    const videoElement = useMemo(() => {
        const video = document.createElement('video');
        video.src = draft.asset.src;
        video.pause();
        return video;
    }, [draft]);

    useEffect(() => {
        const onload = () => {
            setSize({
                width: 500,
                height:
                    (videoElement.videoHeight / videoElement.videoWidth) * 500,
            });
        };
        videoElement.addEventListener('loadedmetadata', onload);
        return () => {
            videoElement.removeEventListener('loadedmetadata', onload);
        };
    }, [videoElement]);

    useEffect(() => {
        draft.layers
            .filter(l => l.type === 'FILTER')
            .forEach(layer => {
                const canvas = videoLayerRef.current?.getCanvas()._canvas;
                if (canvas) {
                    canvas.style.filter =
                        layer.filter + `(${getFilterNum(layer.filter)})`;
                }
            });
    }, [draft]);

    async function saveAndPublish(publish) {
        try {
            await fetchGraph(UPDATE_POST, {
                ...draft,
                layers: layers,
                draft: publish ? false : true,
            });
            onExit();
        } catch (err) {
            toast.error(printError(err.message));
            console.error(err);
        }
    }

    function filterVideo(filter) {
        const canvas = videoLayerRef.current.getCanvas()._canvas;
        canvas.style.filter = filter + `(${getFilterNum(filter)})`;
        let newLayers = layers.filter(layer => layer.type !== 'FILTER');
        let layer = {
            type: 'FILTER',
            filter: filter,
            position: {
                x: 0,
                y: 0,
            },
        };
        setLayers([...newLayers, layer]);
    }

    function getFilterNum(filter) {
        let num;
        switch (filter.toLowerCase()) {
            case 'saturate':
                num = '5';
                break;
            case 'brightness':
                num = '2';
                break;
            case 'blur':
                num = '5px';
                break;
            default:
                num = '1';
                break;
        }
        return num;
    }

    const addTextLayer = () => {
        let text = textInput.current.value;
        let layer = {
            type: 'TEXT',
            text: text,
            position: {
                x: 0.5,
                y: 0.5,
            },
        };
        textInput.current.value = '';
        setLayers([...layers, layer]);
    };

    function moveLayer(layerElement, index) {
        let newLayers = [...layers];
        newLayers[index].position.x = layerElement.x() / size.width;
        newLayers[index].position.y = layerElement.y() / size.height;
        setLayers(newLayers);
    }

    return (
        <>
            <Flex
                className='editor'
                direction='column'
                align='center'
                backgroundColor='white'
                p='4'
                rounded='md'
            >
                <Box className='editor__video-holder'>
                    <Stage width={size.width} height={size.height}>
                        <Layer ref={videoLayerRef}>
                            <Video
                                src={draft.asset.src}
                                size={size}
                                playing={playing}
                            ></Video>
                        </Layer>
                        <Layer>
                            {layers.map((layer, index) => (
                                <VideoLayer
                                    key={index}
                                    layer={layer}
                                    size={size}
                                    onDragStart={() => {
                                        setIsDragging(true);
                                    }}
                                    onDragEnd={e => {
                                        moveLayer(e.target, index);
                                    }}
                                ></VideoLayer>
                            ))}
                        </Layer>
                    </Stage>
                </Box>
                <Button
                    onClick={() => {
                        setIsPlaying(!playing);
                    }}
                    mt='3'
                >
                    {playing ? 'Pause' : 'Play'}
                </Button>

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
                                        ref={textInput}
                                        placeholder='Enter your text'
                                        mr={2}
                                    />
                                    <Button onClick={addTextLayer}>Add</Button>
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
                                                filterVideo(filter);
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
            </Flex>
            <Flex
                px='4'
                py='4'
                className='editor__footer'
                direction='row'
                align='right'
                backgroundColor='white'
            >
                <Button
                    className='editor__footer-button'
                    variant='outline'
                    onClick={onExit}
                >
                    Cancel
                </Button>
                <Button
                    className='editor__footer-button'
                    onClick={() => {
                        saveAndPublish(false);
                    }}
                >
                    Save
                </Button>
                <Button
                    className='editor__footer-button'
                    onClick={() => {
                        saveAndPublish(true);
                    }}
                    variantColor='blue'
                >
                    Publish
                </Button>
            </Flex>
        </>
    );
};
