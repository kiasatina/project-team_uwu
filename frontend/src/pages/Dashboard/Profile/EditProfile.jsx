import React, { useContext } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalOverlay,
    Button,
    ModalFooter,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Textarea,
    Input,
} from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UserContext, fetchGraph, printError } from '../../../utils';
import { UPDATE_PROFILE } from '../../../graphql/user';

export const EditProfile = ({ isOpen, onClose }) => {
    const { user, dispatch } = useContext(UserContext);
    const {
        register,
        handleSubmit,
        errors,
        getValues,
        formState,
        reset,
        setValue,
        triggerValidation,
    } = useForm({
        mode: 'onChange',
    });

    const onSubmit = async values => {
        try {
            await fetchGraph(
                UPDATE_PROFILE,
                Array.from(formState.dirtyFields).reduce((acc, label) => {
                    acc[label] = getValues()[label];
                    return acc;
                }, {}),
            );

            toast.success('Profile updated');
            dispatch({
                ...user,
                username: values.username,
                bio: values.bio,
            });
            onClose();
            reset();
        } catch (err) {
            toast.error(printError(err.message));
            console.error(err);
        }
    };

    return (
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                as='form'
                onSubmit={handleSubmit(onSubmit)}
                borderRadius='md'
            >
                <ModalHeader>Edit Profile</ModalHeader>
                <ModalBody>
                    <FormControl mb='2' isInvalid={errors.username} isRequired>
                        <FormLabel htmlFor='username'>Username</FormLabel>
                        <Input
                            ref={register({
                                required: 'Please provide an username',
                            })}
                            defaultValue={user.username}
                            placeholder='Username'
                            name='username'
                        />
                        <FormErrorMessage>
                            {errors.username?.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl mb='2'>
                        <FormLabel htmlFor='bio'>Bio</FormLabel>
                        <Textarea
                            ref={register}
                            defaultValue={user.bio}
                            placeholder='UwU on your owo'
                            name='bio'
                        />
                    </FormControl>
                    <FormControl mb='2' isInvalid={errors.new_password}>
                        <FormLabel htmlFor='password'>New Password</FormLabel>
                        <Input
                            ref={register({
                                validate() {
                                    triggerValidation('password');
                                },
                                minLength: {
                                    message:
                                        'Password must be at least 8 characters long',
                                    value: 8,
                                },
                            })}
                            placeholder='Hunter62'
                            name='new_password'
                            type='password'
                        />
                        <FormErrorMessage>
                            {errors.new_password?.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl
                        mb='2'
                        isInvalid={errors.password}
                        isRequired={getValues().new_password}
                    >
                        <FormLabel htmlFor='password'>
                            Current Password
                        </FormLabel>
                        <Input
                            ref={register({
                                validate(val) {
                                    if (getValues().new_password) {
                                        return !val
                                            ? 'Please enter your old password'
                                            : undefined;
                                    }
                                    setValue('password', '');
                                },
                            })}
                            disabled={!getValues().new_password}
                            placeholder='Hunter61'
                            name='password'
                            type='password'
                        />
                        <FormErrorMessage>
                            {errors.password?.message}
                        </FormErrorMessage>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button
                        mr='3'
                        type='submit'
                        disabled={!formState.isValid || !formState.dirty}
                        isLoading={formState.isSubmitting}
                    >
                        Save Changes
                    </Button>
                    <Button variant='outline' onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
