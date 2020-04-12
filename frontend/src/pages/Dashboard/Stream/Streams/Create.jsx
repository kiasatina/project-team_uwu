import React from 'react';
import {
    Input,
    Button,
    Image,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Modal,
    ModalOverlay,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Text,
    Heading,
} from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { CREATE_LIVESTREAM } from '../../../../graphql/stream';
import { fetchGraph, printError } from '../../../../utils';
import { placeholder } from '../../../../assets';

export default ({ isOpen, onClose }) => {
    const history = useHistory();
    const { register, errors, formState, handleSubmit } = useForm({
        mode: 'onChange',
    });

    const submit = async values => {
        try {
            const { createLivestream } = await fetchGraph(
                CREATE_LIVESTREAM,
                values,
            );
            history.push(`/stream/${createLivestream._id}`);
            toast.success('Starting stream...');
        } catch (err) {
            toast.error(printError(err.message));
            console.error(err);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                rounded='md'
                as='form'
                onSubmit={handleSubmit(submit)}
            >
                <ModalHeader>
                    <Heading as='h2' size='md'>
                        Start Streaming Now!
                    </Heading>
                    <Text fontSize='sm' color='gray.500'>
                        Get started by giving your stream a title.
                    </Text>
                </ModalHeader>
                <ModalBody>
                    <Image
                        src={placeholder}
                        borderRadius='md'
                        mb='4'
                        width='100%'
                    />
                    <FormControl isInvalid={errors.title} isRequired>
                        <FormLabel htmlFor='title'>Title of Stream</FormLabel>
                        <Input
                            ref={register({
                                required:
                                    'Please provide a title for your stream',
                            })}
                            placeholder='You will not believe your eyes'
                            name='title'
                        />
                        <FormErrorMessage>
                            {errors.title?.message}
                        </FormErrorMessage>
                    </FormControl>
                </ModalBody>
                <ModalFooter flexDirection='column'>
                    <Button
                        type='submit'
                        width='100%'
                        isLoading={formState.isSubmitting}
                        isDisabled={!formState.isValid || !formState.dirty}
                    >
                        Start Stream
                    </Button>
                    <Button
                        type='submit'
                        width='100%'
                        mt='1'
                        variant='outline'
                        onClick={onClose}
                    >
                        Back
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
