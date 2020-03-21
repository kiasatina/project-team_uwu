import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Button,
    Flex,
} from '@chakra-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { fetchGraph, printError } from '../../utils';
import { REGISTER } from '../../graphql/user';
import { LandingPage } from '../../components';

export default () => {
    const history = useHistory();
    const {
        register,
        handleSubmit,
        formState,
        triggerValidation,
        getValues,
        errors,
    } = useForm({
        mode: 'onChange',
    });
    const onSubmit = async ({ confirm_password, ...values }) => {
        console.log(values);
        try {
            const data = await fetchGraph(REGISTER, values);
            localStorage.setItem('token', data.register);
            toast.success('User has been created!');
            history.push('/home');
        } catch (err) {
            toast.error(printError(err.message));
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/home');
        }
    }, [history]);

    return (
        <LandingPage title='UwU Registration Page'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl mb='2' isInvalid={errors.username} isRequired>
                    <FormLabel htmlFor='username'>Username</FormLabel>
                    <Input
                        ref={register({
                            require: 'Please provide a username',
                        })}
                        placeholder='Username'
                        name='username'
                    />
                    <FormErrorMessage>
                        {errors.username?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl mb='2' isInvalid={errors.email} isRequired>
                    <FormLabel htmlFor='email'>Email Address</FormLabel>
                    <Input
                        ref={register({
                            required: 'Please provide an email',
                            pattern: {
                                message: 'Please provide a valid email',
                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            },
                        })}
                        placeholder='Email Address'
                        name='email'
                        type='email'
                    />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl mb='2' isInvalid={errors.password} isRequired>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input
                        ref={register({
                            required: 'Please provide a password',
                            minLength: {
                                message:
                                    'Password must be atleast 8 characters long',
                                value: 8,
                            },
                            validate() {
                                triggerValidation('confirm_password');
                            },
                        })}
                        placeholder='Password'
                        name='password'
                        type='password'
                    />
                    <FormErrorMessage>
                        {errors.password?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl
                    mb='2'
                    isInvalid={errors.confirm_password}
                    isRequired
                >
                    <FormLabel htmlFor='confirm_password'>
                        Confirm Password
                    </FormLabel>
                    <Input
                        ref={register({
                            validate(val) {
                                const { password } = getValues();
                                return (
                                    val === password ||
                                    'Password does not match'
                                );
                            },
                        })}
                        placeholder='Password'
                        name='confirm_password'
                        type='password'
                    />
                    <FormErrorMessage>
                        {errors.confirm_password?.message}
                    </FormErrorMessage>
                </FormControl>
                <Flex direction='column' mt='6'>
                    <Button
                        isLoading={formState.isSubmitting}
                        disabled={!formState.isValid}
                        type='submit'
                        mb='2'
                    >
                        Register
                    </Button>
                    <Button as={Link} to='/' variant='outline'>
                        Back to Login
                    </Button>
                </Flex>
            </form>
        </LandingPage>
    );
};
