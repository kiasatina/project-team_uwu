import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Text,
    Textarea,
} from '@chakra-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { PageContent, Sidenav, Viewer } from '../../../components';
import { CREATE_POST, GET_POSTS } from '../../../graphql/post';
import {
    fetchGraph,
    printError,
    UserContext,
    useRecorder,
} from '../../../utils';
import { Editor } from './Editor';
import './index.scss';

export default () => {
    const { user } = useContext(UserContext);
    const [drafts, setDrafts] = useState();
    const [currDraft, setCurrDraft] = useState();

    const { getRecorder, record } = useRecorder();
    const [recording, setRecording] = useState();
    const [video, setVideo] = useState();
    const [asset, setAsset] = useState();
    const { register, formState, errors, handleSubmit } = useForm({
        mode: 'onChange',
    });

    const onSubmit = async values => {
        await fetchGraph(CREATE_POST, { ...values, asset });
    };

    const onExit = () => {
        setCurrDraft(null);
    };

    useEffect(() => {
        if (!video || recording) {
            URL.revokeObjectURL(video);
            (async () => {
                const recorder = await getRecorder();
                setVideo(recorder.stream);
            })();
        }
        (async () => {
            try {
                const res = await fetchGraph(GET_POSTS, {
                    user: user?._id,
                    draft: true,
                });
                setDrafts(res.getPosts);
            } catch (err) {
                toast.error(printError(err.message));
                console.error(err);
            }
        })();
    }, [video, recording, getRecorder, user, drafts, currDraft]);

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
            <PageContent label='Create a Post'>
                {!currDraft ? (
                    <Flex direction='row' wrap='wrap'>
                        {drafts?.map(draft => (
                            <Box
                                key={draft._id}
                                minW='xs'
                                mt='3'
                                mr='3'
                                rounded='md'
                                backgroundColor='white'
                            >
                                <Box
                                    className='draft__thumbnail-wrapper'
                                    maxW='xs'
                                >
                                    <video
                                        src={draft.asset.src}
                                        alt={draft.title}
                                    />
                                    <Box
                                        onClick={() => {
                                            setCurrDraft(draft);
                                        }}
                                        className='draft__thumbnail-cover'
                                    >
                                        <Box as={FaEdit} size='20px' mb='1' />
                                        Edit
                                    </Box>
                                </Box>
                                <Text
                                    mx='4'
                                    mt='4'
                                    fontWeight='semibold'
                                    as='h3'
                                    isTruncated
                                >
                                    {draft.title}
                                </Text>
                                <Text
                                    color='gray.500'
                                    fontSize='xs'
                                    textTransform='uppercase'
                                    mx='4'
                                >
                                    Created on:{' '}
                                    {new Date(draft.createdAt).toDateString()}
                                </Text>
                                <Text m='4'>{draft.description}</Text>
                            </Box>
                        ))}
                    </Flex>
                ) : (
                    <Editor draft={currDraft} onExit={onExit}></Editor>
                )}
            </PageContent>
            {!currDraft ? (
                <Sidenav padded>
                    <Heading as='h2' size='md'>
                        Create a Draft Post
                    </Heading>
                    <Text mb='4'>
                        Get started by uploading a video and giving it some
                        quality content.
                    </Text>
                    <Viewer video={video} />
                    <Flex mt='2' mb='5' direction='column'>
                        <Button onClick={getRecording} loading={recording}>
                            {recording ? 'Recording...' : 'Record'}
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
                            <FormLabel htmlFor='description'>
                                Description
                            </FormLabel>
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
                        <Flex mb='5' direction='column' alignItems='stretch'>
                            <Button
                                loading={formState.isSubmitting.toString()}
                                disabled={!formState.isValid || !asset}
                                type='submit'
                            >
                                Create Post
                            </Button>
                        </Flex>
                    </form>
                </Sidenav>
            ) : (
                ''
            )}
        </>
    );
};
