import {
    Flex,
    Heading,
    IconButton,
    SimpleGrid,
    Stack,
    Tag,
    Text,
    Tooltip,
    useDisclosure,
} from '@chakra-ui/core';
import React, { useContext } from 'react';
import { Loading, PageContent } from '../../../../components';
import { GET_USER_POSTS } from '../../../../graphql/user';
import { useGraph, UserContext } from '../../../../utils';
import { PostItem } from '../../Home/PostItem';
import '../index.scss';
import { EditProfile } from './EditProfile';
import { UploadImage } from './UploadImage';

export const MyProfile = () => {
    const { user = {}, loading } = useContext(UserContext);
    const { onOpen, isOpen, onClose } = useDisclosure();

    const posts = useGraph(GET_USER_POSTS, {
        variables: { user: user._id },
        pipe: ['getPosts'],
    });

    return (
        <Loading loading={loading}>
            <PageContent>
                <Flex p='6' backgroundColor='white' rounded='md' mb='4'>
                    <UploadImage />
                    <Flex
                        mr='auto'
                        direction='column'
                        justifyContent='center'
                        mb='4'
                    >
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

                {posts.data.length ? (
                    <SimpleGrid
                        columns={{ xs: 1, sm: 2, md: 2, lg: 3 }}
                        spacing='4'
                    >
                        {posts.data.map(item => (
                            <PostItem
                                playing={true}
                                key={item._id}
                                from='profile'
                                {...item}
                            />
                        ))}
                    </SimpleGrid>
                ) : (
                    <Text fontSize='2xl' opacity='30%'>
                        No Posts Found... *sad owo sounds*
                    </Text>
                )}
            </PageContent>
            <EditProfile isOpen={isOpen} onClose={onClose} />
        </Loading>
    );
};
