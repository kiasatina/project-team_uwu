import React, { useContext, useState } from 'react';
import { Avatar, Box, Spinner } from '@chakra-ui/core';
import { FaUpload } from 'react-icons/fa';
import { UserContext, fetchGraph } from '../../../utils';
import { UPDATE_PICTURE } from '../../../graphql/user';

export const UploadImage = () => {
    const { user, dispatch } = useContext(UserContext);
    const [ loading, setLoading ] = useState();
    const upload = async ({ currentTarget }) => {
        setLoading(true);
        const profile_image = currentTarget.files[0];
        if (!profile_image) return;

        const { updateProfile } = await fetchGraph(UPDATE_PICTURE, {
            profile_image,
        });
        dispatch({ ...user, ...updateProfile });
        setLoading(false);
    };

    return (
        <Box className='profile__upload-wrapper' mr='6'>
            <Avatar
                name={user.username}
                src={user.profile_image?.src}
                size='2xl'
            />
            <Box className={`profile__upload-cover ${ loading ? ' profile__upload-cover--loading' : '' }`}>
                <Box as={ FaUpload } size='20px' mb='1'/>
                Upload
            </Box>
            <input
                className='profile__upload'
                type='file'
                accept='image/*'
                onChange={upload}
            />
            { loading && <Spinner
                size=''
                thickness='3px'
                color='teal.300'
                className='profile__upload-spinner'
            /> }
        </Box>
    );
};
