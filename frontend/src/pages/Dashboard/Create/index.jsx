import React, { useCallback, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    FormControl,
    FormLabel,
    Textarea,
    Input,
    FormErrorMessage,
    Heading,
    Text,
    Flex,
    Button,
} from '@chakra-ui/core';

import { PageContent, Sidenav, Viewer } from '../../../components';
import { useRecorder, fetchGraph } from '../../../utils';
import { CREATE_POST } from '../../../graphql/post';
import './index.scss';

export default () => {
    const { getRecorder, record } = useRecorder();
    const [recording, setRecording] = useState();
    const [video, setVideo] = useState();
    const [asset, setAsset] = useState();
    const { register, formState, errors, handleSubmit } = useForm({
        mode: 'onChange',
    });

    const onSubmit = async values => {
        values.asset.lastModifiedDate = new Date();
        values.asset.name = 'uwu';
        await fetchGraph(CREATE_POST, values);
    };

    useEffect(() => {
        if (!video || recording) {
            URL.revokeObjectURL(video);
            (async () => {
                const recorder = await getRecorder();
                setVideo(recorder.stream);
            })();
        }
    }, [video, recording, getRecorder]);

    const getRecording = useCallback(async () => {
        // Record and set to view
        setRecording(true);
        const file = await record();
        const _video = URL.createObjectURL(file);

        // Update state
        setAsset(file);
        setRecording(false);
        setVideo(_video);
    }, [record]);

    const upload = useCallback(({ currentTarget }) => {
        const file = currentTarget.files[0];
        if (!file) return;

        const _video = URL.createObjectURL(file);

        // Update state
        setAsset(file);
        setVideo(_video);
    }, []);

    return (
        <>
            <PageContent label='Create a Post'>YEEE</PageContent>
            <Sidenav padded>
                <Heading as='h2' size='md'>
                    Create a Draft Post
                </Heading>
                <Text mb='4'>
                    Get started by uploading a video and giving it some quality
                    content.
                </Text>
                <Viewer video={video} />
                <Flex mt='2' mb='5' direction='column'>
                    <Button onClick={getRecording} loading={recording}>
                        Record
                    </Button>
                    <Button mt='1' variant='outline'>
                        <input
                            onChange={upload}
                            className='create__upload'
                            accept='video/*'
                            type='file'
                        />
                        Upload Video
                    </Button>
                </Flex>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl mb='2' isInvalid={errors.title} isRequired>
                        <FormLabel htmlFor='title'>Title of Post</FormLabel>
                        <Input
                            ref={register({
                                required: 'Please provide a title',
                            })}
                            placeholder='e.g. UwU on your OwO'
                            name='title'
                        />
                        <FormErrorMessage>
                            {errors.title?.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl
                        mb='2'
                        isInvalid={errors.description}
                        isRequired
                    >
                        <FormLabel htmlFor='description'>Description</FormLabel>
                        <Textarea
                            ref={register({
                                required: 'Please provide a description',
                            })}
                            placeholder='e.g. Best UwU in the world OwO'
                            name='description'
                        />
                        <FormErrorMessage>
                            {errors.description?.message}
                        </FormErrorMessage>
                    </FormControl>
                    <Flex direction='column' alignItems='stretch'>
                        <Button
                            loading={formState.isSubmitting}
                            disabled={!formState.isValid || !asset}
                            type='submit'
                        >
                            Create Post
                        </Button>
                    </Flex>
                </form>
            </Sidenav>
        </>
    );
};
