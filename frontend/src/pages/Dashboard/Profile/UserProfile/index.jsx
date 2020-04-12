import {
    Button,
    Flex,
    Heading,
    SimpleGrid,
    Tag,
    Text,
    useDisclosure,
} from '@chakra-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Route, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loading, PageContent } from '../../../../components';
import { FOLLOW, UNFOLLOW } from '../../../../graphql/follow';
import { GET_USER, GET_USER_POSTS } from '../../../../graphql/user';
import {
    fetchGraph,
    printError,
    useGraph,
    UserContext,
} from '../../../../utils';
import { PostItem } from '../../Home/PostItem';
import { PostOverlay } from '../../Home/PostOverlay';
import { FollowOverlay } from '../FollowOverlay';
import { UploadImage } from '../MyProfile/UploadImage';
import '../index.scss';

export const UserProfile = () => {
    const { user = {}, loading, refetch } = useContext(UserContext);
    const { userId } = useParams();
    const [following, setFollowing] = useState(false);
    const followDisclosure = useDisclosure();
    const [seeFollowing, setSeeFollowing] = useState(false);
    const { data } = useGraph(GET_USER, {
        variables: { id: userId },
        pipe: ['getUsers', 0],
    });

    const posts = useGraph(GET_USER_POSTS, {
        variables: { user: userId },
        pipe: ['getPosts'],
    });

    useEffect(() => {
        user.following?.find(u => u._id === userId)
            ? setFollowing(true)
            : setFollowing(false);
    }, [user, userId]);

    const seeFollows = seeFollowing => {
        followDisclosure.onOpen();
        setSeeFollowing(seeFollowing);
    };

    const follow = async () => {
        try {
            if (following) {
                await fetchGraph(UNFOLLOW, { id: userId });
                data.followers_count--;
                toast.success('User unfollowed');
            } else {
                await fetchGraph(FOLLOW, { id: userId });
                data.followers_count++;
                toast.success('User followed');
            }
            refetch();
        } catch (err) {
            toast.error(printError(err.message));
            console.error(err);
        }
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
                        <UploadImage user={data} />
                        <Flex
                            mr='auto'
                            direction='column'
                            justifyContent='center'
                            mb='4'
                        >
                            <Heading size='xl'>{data.username}</Heading>
                            {data.bio && <Text>{data.bio}</Text>}
                            <Flex flexWrap='wrap' m='0 -0.25em'>
                                <Tag
                                    className='clickable'
                                    m='1'
                                    onClick={() => {
                                        seeFollows(true);
                                    }}
                                >
                                    {data.following_count} Following
                                </Tag>
                                <Tag
                                    className='clickable'
                                    m='1'
                                    onClick={() => {
                                        seeFollows(false);
                                    }}
                                >
                                    {data.followers_count} Followers
                                </Tag>
                                <Tag m='1'>{data.posts_count} Posts</Tag>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Button onClick={follow}>
                        {following ? 'Unfollow' : 'Follow'}
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
            <Route
                exact
                path='/profile/:userId/:post'
                component={PostOverlay}
            />
            <FollowOverlay
                isOpen={followDisclosure.isOpen}
                onClose={followDisclosure.onClose}
                seeFollowing={seeFollowing}
            />
        </Loading>
    );
};
