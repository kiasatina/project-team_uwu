import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalHeader,
    ModalFooter,
    FormLabel,
    Heading,
    Input,
    Text,
    Textarea,
} from '@chakra-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Viewer } from '../../../../../components';
import { CREATE_POST } from '../../../../../graphql/post';
import {
    fetchGraph,
    printError,
    UserContext,
    useRecorder,
} from '../../../../../utils';
import './index.scss';

export const Create = ({ onClose, isOpen, refetch }) => {
    const { reset, handleSubmit, register, errors, formState } = useForm({
        mode: 'onChange',
    });
    const { user } = useContext(UserContext);
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
            refetch();
            toast.success('Post created');
        } catch (err) {
            toast.error(printError(err.message));
            console.error(err);
        }

        setAsset(undefined);
        onClose();
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
    }, [video, recording, getRecorder, user]);

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
        <Modal scrollBehavior='inside' isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent as='form' onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader>
                    <Heading as='h2' size='md'>
                        Create a Draft Post
                    </Heading>
                    <Text fontSize='sm' color='gray.500'>
                        Get started by uploading a video and giving it some
                        quality content.
                    </Text>
                </ModalHeader>
                <ModalBody>
                    <Viewer video={video} />
                    <Flex mt='2' mb='5' direction='column'>
                        <Button
                            onClick={getRecording}
                            disabled={recording}
                            loading={recording}
                        >
                            {recording ? 'Recording...' : 'Record'}
                        </Button>
                        <Button mt='1' variant='outline' disabled={recording}>
                            <input
                                onChange={upload}
                                className='create__upload'
                                accept='video/*'
                                type='file'
                            />
                            Upload Video
                        </Button>
                    </Flex>
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
                </ModalBody>
                <ModalFooter flexDirection='column'>
                    <Button
                        loading={formState.isSubmitting}
                        disabled={!formState.isValid || !asset}
                        width='100%'
                        type='submit'
                    >
                        Create Post
                    </Button>
                    <Button
                        onClick={onClose}
                        variant='outline'
                        width='100%'
                        mt='1'
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
