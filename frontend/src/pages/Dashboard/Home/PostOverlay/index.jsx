import React, { useCallback, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Flex,
    Stack,
    Avatar,
    Heading,
    Text,
    Badge,
    Button,
} from '@chakra-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { Loading, DisplayPost, DisplayPostItem } from '../../../../components';
import { useGraph, displayDate } from '../../../../utils';
import { GET_POST } from '../../../../graphql/home';
import { Share } from './Share';
import { Download } from './Download';

export const PostOverlay = () => {
    const { userId, post } = useParams();
    const history = useHistory();
    const [size, setSize] = useState({ width: 0, height: 0 });
    const onError = useCallback(() => {
        userId ? history.push('/profile/' + userId) : history.push('/home');
    }, [history, userId]);
    const { data, loading } = useGraph(GET_POST, {
        pipe: ['getPosts', 0],
        variables: { id: post },
        initState: {},
        onError,
    });

    return (
        <Modal isOpen onClose={onError}>
            <ModalOverlay />
            <ModalContent rounded='md'>
                <Loading loading={loading}>
                    <ModalBody mt='5'>
                        <DisplayPost
                            size={size}
                            setSize={setSize}
                            video={data.asset?.src}
                            layers={data.layers}
                            playing
                        >
                            {data.layers?.map((layer, index) => (
                                <DisplayPostItem
                                    size={size}
                                    layer={layer}
                                    key={index}
                                />
                            ))}
                        </DisplayPost>
                        <Stack mt='4' mb='2' isInline align='center'>
                            <Avatar
                                name={data.user?.username}
                                src={data.user?.profile_image?.src}
                            />
                            <Stack>
                                <Heading as='h1' size='md'>
                                    {data.user?.username} | {data.title}
                                </Heading>
                                <Badge mr='auto'>
                                    {displayDate(data.updatedAt)}
                                </Badge>
                            </Stack>
                        </Stack>
                        <Text>{data.description}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Flex
                            width='calc(100% + 0.5rem)'
                            direction={{ xs: 'column', sm: 'row' }}
                            align={{ xs: 'stretch', sm: 'center' }}
                            justify='flex-end'
                            mx='-0.25rem'
                        >
                            <Share m='1' />
                            <Download m='1' data={data} />
                            <Button m='1' variant='outline' onClick={onError}>
                                Close
                            </Button>
                        </Flex>
                    </ModalFooter>
                </Loading>
            </ModalContent>
        </Modal>
    );
};