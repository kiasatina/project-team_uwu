import { Button, Flex, Box, Input } from '@chakra-ui/core';
import React, { useState, useRef, useEffect } from 'react';
import './index.scss';

export const Editor = ({ draft, onExit }) => {
    const [playing, setIsPlaying] = useState(true);
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const [timer, setTimer] = useState();
    const [layers, setLayers] = useState([]);
    const video = useRef();
    const canvas = useRef();
    const textInput = useRef();

    useEffect(() => {
        return () => clearTimeout(timer);
    });

    const onPlay = () => {
        playing ? video.current.pause() : video.current.play();
        setIsPlaying(!playing);
    };

    const onVideoLoad = () => {
        let width = video.current?.videoWidth;
        let height = video.current?.videoHeight;
        setWidth(width);
        setHeight(height);
        canvas.current.width = 500;
        canvas.current.height = (height / width) * 500;
    };

    const onVideoPlay = layers => {
        if (!playing) {
            return;
        }
        let context = canvas.current.getContext('2d');
        context.drawImage(
            video.current,
            0,
            0,
            width,
            height,
            0,
            0,
            canvas.current.width,
            canvas.current.height,
        );

        layers.forEach(layer => {
            if (layer.type === 'TEXT') {
                context.font = '40px Arial';
                context.textAlign = 'center';
                context.fillText(
                    layer.text,
                    layer.position.x,
                    layer.position.y,
                );
            }
        });

        setTimer(
            setTimeout(() => {
                onVideoPlay(layers);
            }, 0),
        );
    };

    const addTextLayer = () => {
        let text = textInput.current.value;
        let layer = {
            type: 'TEXT',
            text: text,
            position: {
                x: canvas.current.width / 2,
                y: canvas.current.height / 2,
            },
        };
        textInput.current.value = '';
        let newLayers = [...layers, layer];
        setLayers(newLayers);
        onVideoPlay(newLayers);
    };

    const onAddText = text => {
        if (!playing) {
            return;
        }
        let context = canvas.current.getContext('2d');
        context.drawImage(
            video.current,
            0,
            0,
            width,
            height,
            0,
            0,
            canvas.current.width,
            canvas.current.height,
        );
        context.font = '40px Comic Sans Ms';
        context.fillText(
            text,
            canvas.current.width / 2,
            canvas.current.height / 2,
        );
        setTimer(
            setTimeout(() => {
                onAddText(text);
            }, 5),
        );
    };

    /**
     * Code from https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Manipulating_video_using_canvas
     */
    // function onBW() {
    //     let frame = context.getImageData(
    //         0,
    //         0,
    //         canvas.current.width,
    //         canvas.current.height,
    //     );
    //     let l = frame.data.length / 4;
    //     for (let i = 0; i < l; i++) {
    //         let r = frame.data[i * 4 + 0];
    //         let g = frame.data[i * 4 + 1];
    //         let b = frame.data[i * 4 + 2];
    //         let brightness = 0.3 * r + 0.6 * g + 0.1 * b;
    //         frame.data[i * 4 + 0] = brightness;
    //         frame.data[i * 4 + 1] = brightness;
    //         frame.data[i * 4 + 2] = brightness;
    //     }
    // }

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
                    <canvas
                        ref={canvas}
                        className='editor__video-holder__canvas'
                    ></canvas>
                    <video
                        className='editor__video'
                        src={draft.asset.src}
                        ref={video}
                        onLoadedMetadata={onVideoLoad}
                        onPlay={() => {
                            onVideoPlay(layers);
                        }}
                        autoPlay
                        loop
                    />
                </Box>
                <Button onClick={onPlay} mt='3'>
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
                <Button className='editor__footer-button'>Save</Button>
                <Button className='editor__footer-button' variantColor='blue'>
                    Publish
                </Button>
            </Flex>
        </>
    );
};
