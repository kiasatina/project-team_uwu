import { Button, Flex, Box } from '@chakra-ui/core';
import React, { useState, useRef, useEffect } from 'react';
import './index.scss';

export const Editor = ({ draft, onExit }) => {
    const [playing, setIsPlaying] = useState(true);
    const video = useRef();
    const canvas = useRef();
    let width, height;
    let timer;

    useEffect(() => {
        return () => clearTimeout(timer);
    });

    const onPlay = () => {
        playing ? video.current.pause() : video.current.play();
        setIsPlaying(!playing);
    };

    const onVideoLoad = () => {
        width = video.current?.videoWidth;
        height = video.current?.videoHeight;
        canvas.current.width = 500;
        canvas.current.height = (height / width) * 500;
    };

    const onVideoPlay = () => {
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
        timer = setTimeout(() => {
            onVideoPlay();
        }, 0);
    };

    function onBW() {
        const width = video.current?.videoWidth;
        const height = video.current?.videoHeight;
        console.log(width);
        console.log(height);
        let context = canvas.current.getContext('2d');
        let ratio = height / width;
        canvas.current.width = 500;
        canvas.current.height = ratio * 500;
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
        context.font = '40px Courier';
        context.fillText('blah', 210, 75);
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
                    <canvas
                        ref={canvas}
                        className='editor__video-holder__canvas'
                    ></canvas>
                    <video
                        className='editor__video'
                        src={draft.asset.src}
                        ref={video}
                        onLoadedMetadata={onVideoLoad}
                        onPlay={onVideoPlay}
                        autoPlay
                        loop
                    />
                </Box>
                <Button onClick={onPlay} mt='3'>
                    {playing ? 'Pause' : 'Play'}
                </Button>
                <Flex direction='row'>
                    <Button onClick={onBW} mt='3'>
                        B&W
                    </Button>
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
