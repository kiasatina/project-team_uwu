import React, { useContext } from 'react';
import {
    Flex,
    Heading,
    Stack,
    Tag,
    Text,
    IconButton,
    Tooltip,
    useDisclosure,
} from '@chakra-ui/core';
import { Loading, PageContent } from '../../../components';
import { UserContext } from '../../../utils';
import { EditProfile } from './EditProfile';
import { UploadImage } from './UploadImage';
import './index.scss';

export default () => {
    const { user = {}, loading } = useContext(UserContext);
    const { onOpen, isOpen, onClose } = useDisclosure();
    return (
        <Loading loading={loading}>
            <PageContent>
                <Flex p='6' backgroundColor='white' rounded='md'>
                    <UploadImage />
                    <Flex mr='auto' direction='column' justifyContent='center'>
                        <Heading size='xl'>{user.username}</Heading>
                        {user.bio && <Text>{user.bio}</Text>}
                        <Stack mt='2' isInline>
                            <Tag>{user.following_count} Following</Tag>
                            <Tag>{user.followers_count} Followers</Tag>
                            <Tag>{user.posts_count} Posts</Tag>
                        </Stack>
                    </Flex>
                    <Tooltip label='Edit Profile' placement='left'>
                        <IconButton onClick={onOpen} icon='edit' />
                    </Tooltip>
                </Flex>
            </PageContent>
            <EditProfile isOpen={isOpen} onClose={onClose} />
        </Loading>
    );
};
