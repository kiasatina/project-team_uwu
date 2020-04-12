import { Avatar, Box, Spinner } from '@chakra-ui/core';
import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { UPDATE_PICTURE } from '../../../../graphql/user';
import { fetchGraph, printError } from '../../../../utils';

export const UploadImage = ({ user, dispatch }) => {
    const [loading, setLoading] = useState();
    const upload = async ({ currentTarget }) => {
        setLoading(true);
        const profile_image = currentTarget.files[0];
        if (!profile_image) return;

        try {
            const { updateProfile } = await fetchGraph(UPDATE_PICTURE, {
                profile_image,
            });
            toast.success('Profile image updated');
            dispatch({ ...user, ...updateProfile });
        } catch (err) {
            toast.error(printError(err.message));
            console.error(err);
        }

        setLoading(false);
    };

    return (
        <Box
            className='profile__upload-wrapper'
            mr={{ xs: 'auto', sm: 'auto', md: '6' }}
            mb={{ xs: '4', sm: '4', md: '0' }}
        >
            <Avatar
                name={user.username}
                src={user.profile_image?.src}
                size='2xl'
            />
            {dispatch && (
                <>
                    <Box
                        className={`profile__upload-cover ${
                            loading ? ' profile__upload-cover--loading' : ''
                        }`}
                    >
                        <Box as={FaUpload} size='20px' mb='1' />
                        Upload
                    </Box>
                    <input
                        className='profile__upload'
                        type='file'
                        accept='image/*'
                        onChange={upload}
                    />
                    {loading && (
                        <Spinner
                            size=''
                            thickness='3px'
                            color='teal.300'
                            className='profile__upload-spinner'
                        />
                    )}
                </>
            )}
        </Box>
    );
};
