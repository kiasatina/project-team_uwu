import {
    Avatar,
    Flex,
    Heading,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
} from '@chakra-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loading } from '../../../components';
import { GET_FOLLOWERS, GET_FOLLOWING } from '../../../graphql/follow';
import { useGraph, UserContext } from '../../../utils';

export const FollowOverlay = ({ isOpen, onClose, seeFollowing }) => {
    const { user = {} } = useContext(UserContext);
    const [follows, setFollows] = useState();
    let { userId } = useParams();
    userId = userId ? userId : user._id;

    const { data, loading } = useGraph(
        seeFollowing ? GET_FOLLOWING : GET_FOLLOWERS,
        {
            variables: { id: userId },
            pipe: [],
        },
    );

    useEffect(() => {
        seeFollowing
            ? setFollows(data.getFollowing)
            : setFollows(data.getFollowers);
    }, [data]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent borderRadius='md'>
                <ModalHeader>
                    {seeFollowing ? 'Following' : 'Followers'}
                </ModalHeader>
                <Loading loading={loading}>
                    <ModalBody>
                        <Stack mb={4}>
                            {follows && follows.length ? (
                                follows.map((user, index) => (
                                    <Flex
                                        direction='row'
                                        key={index}
                                        alignItems='center'
                                        as={Link}
                                        to={`/profile/${user._id}`}
                                    >
                                        <Avatar
                                            name={user.username}
                                            src={user.profile_image?.src}
                                            size='sm'
                                            mr='2'
                                        />
                                        <Heading size='sm'>
                                            {user.username}
                                        </Heading>
                                    </Flex>
                                ))
                            ) : (
                                <Text fontSize='md' opacity='30%'>
                                    No Follows Found... *sad owo sounds*
                                </Text>
                            )}
                        </Stack>
                    </ModalBody>
                </Loading>
            </ModalContent>
        </Modal>
    );
};
