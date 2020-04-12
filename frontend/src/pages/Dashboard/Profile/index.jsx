import {
    Flex,
    Heading,
    IconButton,
    Stack,
    Tag,
    Text,
    Tooltip,
    useDisclosure,
} from '@chakra-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading, PageContent } from '../../../components';
import { GET_USER } from '../../../graphql/user';
import { useGraph, UserContext } from '../../../utils';
import { EditProfile } from './EditProfile';
import './index.scss';
import { UploadImage } from './UploadImage';

export default () => {
    const { userId } = useParams();
    const { user = {} } = useContext(UserContext);
    const [isMe, setIsMe] = useState(false);
    const { onOpen, isOpen, onClose } = useDisclosure();
    const { data, loading, dispatch } = useGraph(GET_USER, {
        variables: { id: userId },
        pipe: ['getUsers', 0],
    });

    useEffect(() => {
        setIsMe(user._id === userId);
        if (user._id === userId) {
            dispatch(user);
        }
    }, [userId, user, dispatch]);

    return (
        <Loading loading={loading}>
            <PageContent>
                <Flex p='6' backgroundColor='white' rounded='md'>
                    <UploadImage data={data} isMe={isMe} />
                    <Flex mr='auto' direction='column' justifyContent='center'>
                        <Heading size='xl'>{data.username}</Heading>
                        {data.bio && <Text>{data.bio}</Text>}
                        <Stack mt='2' isInline>
                            <Tag>{data.following_count} Following</Tag>
                            <Tag>{data.followers_count} Followers</Tag>
                            <Tag>{data.posts_count} Posts</Tag>
                        </Stack>
                    </Flex>
                    {isMe ? (
                        <Tooltip label='Edit Profile' placement='left'>
                            <IconButton onClick={onOpen} icon='edit' />
                        </Tooltip>
                    ) : (
                        <></>
                    )}
                </Flex>
            </PageContent>
            <EditProfile isOpen={isOpen} onClose={onClose} />
        </Loading>
    );
};
