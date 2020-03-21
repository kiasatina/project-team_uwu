import React, { useCallback, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
    FormControl,
    FormLabel,
    Textarea,
    Input,
    FormErrorMessage,
    Flex,
    Button,
} from '@chakra-ui/core';

import { useRecorder, fetchGraph, printError } from '../../../utils';
import { PageContent, Sidenav, Viewer } from '../../../components';
import { CREATE_POST } from '../../../graphql/post';
import './index.scss';

export default () => {
    const { register, formState, errors, handleSubmit, reset } = useForm({
        mode: 'onChange',
    });
    const { getRecorder, record } = useRecorder();
    const [recording, setRecording] = useState();
    const [video, setVideo] = useState();
    const [asset, setAsset] = useState();

    const onSubmit = async values => {
        try {
            await fetchGraph(CREATE_POST, {
                ...values,
                asset,
            });
            toast.success('Post created');
        } catch (err) {
            toast.error(printError(err.message));
            console.error(err);
        }

        setAsset(undefined);
        reset();
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
            <Sidenav
                label='Create a Draft Post'
                text='Get started by uploading a video and giving it some quality content.'
                padded
            >
                <Viewer video={video} />
                <Flex mt='2' mb='5' direction='column'>
                    <Button
                        loadingText='Recording...'
                        onClick={getRecording}
                        isLoading={recording}
                    >
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
