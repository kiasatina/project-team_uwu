import {
    Flex,
    Heading,
    Button,
    SimpleGrid,
    Tag,
    Text,
    useDisclosure,
} from '@chakra-ui/core';
import React, { useContext, useState } from 'react';
import { Loading, PageContent } from '../../../../components';
import { GET_USER_POSTS } from '../../../../graphql/user';
import { useGraph, UserContext } from '../../../../utils';
import { PostItem } from '../../Home/PostItem';
import { FollowOverlay } from '../FollowOverlay';
import '../index.scss';
import { EditProfile } from './EditProfile';
import { UploadImage } from './UploadImage';

export const MyProfile = () => {
    const { user, dispatch, loading } = useContext(UserContext);
    const { onOpen, isOpen, onClose } = useDisclosure();
    const followDisclosure = useDisclosure();
    const [seeFollowing, setSeeFollowing] = useState(false);

    const posts = useGraph(GET_USER_POSTS, {
        variables: { user: user._id },
        pipe: ['getPosts'],
    });

    const seeFollows = seeFollowing => {
        followDisclosure.onOpen();
        setSeeFollowing(seeFollowing);
    };

    return (
        <Loading loading={loading}>
            <PageContent>
                <Flex
                    p='6'
                    flexDirection={{ xs: 'column', sm: 'column', md: 'row' }}
                    backgroundColor='white'
                    rounded='md'
                    mb='4'
                >
                    <Flex
                        direction={{ xs: 'column', sm: 'column', md: 'row' }}
                        flexGrow='1'
                    >
                        <UploadImage user={user} dispatch={dispatch} />
                        <Flex
                            mr='auto'
                            direction='column'
                            justifyContent='center'
                            mb='4'
                        >
                            <Heading size='xl'>{user.username}</Heading>
                            {user.bio && <Text>{user.bio}</Text>}
                            <Flex flexWrap='wrap' m='0 -0.25em'>
                                <Tag
                                    className='clickable'
                                    m='1'
                                    onClick={() => {
                                        seeFollows(true);
                                    }}
                                >
                                    {user.following_count} Following
                                </Tag>
                                <Tag
                                    className='clickable'
                                    m='1'
                                    onClick={() => {
                                        seeFollows(false);
                                    }}
                                >
                                    {user.followers_count} Followers
                                </Tag>
                                <Tag m='1'>{user.posts_count} Posts</Tag>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Button onClick={onOpen} leftIcon='edit'>
                        Edit Profile
                    </Button>
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
            <FollowOverlay
                isOpen={followDisclosure.isOpen}
                onClose={followDisclosure.onClose}
                seeFollowing={seeFollowing}
            />
        </Loading>
    );
};
