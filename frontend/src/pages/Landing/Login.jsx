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
import { LandingPage } from '../../components';
import { LOGIN } from '../../graphql/user';

export default () => {
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm({
        mode: 'onChange',
    });
    const onSubmit = async values => {
        try {
            const data = await fetchGraph(LOGIN, values);
            localStorage.setItem('token', data.login);
            history.push('/home');
        } catch (err) {
            toast.error(printError(err.message));
            console.error(err);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/home');
        }
    }, [history]);

    return (
        <LandingPage title='UwU Login Page'>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                                    'Password must be at least 8 characters long',
                                value: 8,
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
                <Flex direction='column' mt='6'>
                    <Button type='submit' mb='2'>
                        Login
                    </Button>
                    <Button as={Link} to='/register' variant='outline'>
                        New user?
                    </Button>
                </Flex>
            </form>
        </LandingPage>
    );
};
