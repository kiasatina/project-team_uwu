import { Box, Button, Flex, Input } from '@chakra-ui/core';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import { toast } from 'react-toastify';
import { TextLayer, Video } from '../../../components';
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

    const videoElement = useMemo(() => {
        const video = document.createElement('video');
        video.src = draft.asset.src;
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
        let newLayers = [...layers, layer];
        setLayers(newLayers);
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
                        <Layer>
                            <Video
                                src={draft.asset.src}
                                size={size}
                                playing={playing}
                            ></Video>
                        </Layer>
                        <Layer>
                            {layers.map((layer, index) => (
                                <TextLayer
                                    key={index}
                                    layer={layer}
                                    size={size}
                                    onDragStart={() => {
                                        setIsDragging(true);
                                    }}
                                    onDragEnd={e => {
                                        moveLayer(e.target, index);
                                    }}
                                ></TextLayer>
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
                <Flex direction='row' mt='4'>
                    <Input ref={textInput} placeholder='Enter your text' />
                    <Button onClick={addTextLayer}>Add</Button>
                </Flex>
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
