import React from 'react';
import { Input, Button, Image, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { CREATE_LIVESTREAM } from '../../../../graphql/stream';
import { fetchGraph, printError } from '../../../../utils';
import { Sidenav } from '../../../../components';
import { placeholder } from '../../../../assets';

export default () => {
    const history = useHistory();
    const { register, errors, formState, handleSubmit } = useForm({
        mode: 'onChange',
    });

    const submit = async values => {
        try {
            const { createLivestream } = await fetchGraph(CREATE_LIVESTREAM, values);
            history.push(`/stream/${ createLivestream._id }`);
            toast.success('Starting stream...');
        } catch (err) {
            toast.error(printError(err.message));
            console.error(err);
        }
    };

    return (
        <Sidenav
            label='Start Streaming Now!'
            text='Get started by giving your stream a title.'
            padded
        >
            <Image src={placeholder} borderRadius='md' mb='4'/>
            <form onSubmit={handleSubmit(submit)}>
                <FormControl isInvalid={errors.title} isRequired>
                    <FormLabel htmlFor='title'>Title of Stream</FormLabel>
                    <Input
                        ref={register({
                            required: 'Please provide a title for your stream',
                        })}
                        placeholder='You will not believe your eyes'
                        name='title'
                    />
                    <FormErrorMessage>
                        {errors.title?.message}
                    </FormErrorMessage>
                </FormControl>
                <Button
                    mt='4'
                    type='submit'
                    width='100%'
                    isLoading={formState.isSubmitting}
                    isDisabled={!formState.isValid || !formState.dirty}
                >
                    Start Stream
                </Button>
            </form>
        </Sidenav>
    )
}