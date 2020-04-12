import React from 'react';
import {
    useDisclosure,
    Button,
    Text,
    Flex,
    Heading,
    SimpleGrid,
} from '@chakra-ui/core';

import { FETCH_STREAMS } from '../../../../graphql/stream';
import { PageContent } from '../../../../components';
import { useGraph } from '../../../../utils';
import StreamItem from './StreamItem';
import Create from './Create';
import { useEffect } from 'react';

export default () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data, loading, refetch } = useGraph(FETCH_STREAMS, {
        pipe: ['getLivestreams'],
        initState: [],
    });

    useEffect(() => {
        const timer = window.setInterval(() => {
            refetch();
        }, 5000);
        return () => {
            window.clearInterval(timer);
        };
    }, [refetch]);

    return (
        <>
            <PageContent loading={loading}>
                <Flex
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    alignItems='center'
                    m='0 -0.5em 0.5em'
                >
                    <Heading m='2' as='h1' size='lg' width='100%'>
                        Live Streams
                    </Heading>
                    <Button
                        flexShrink='0'
                        width={{ xs: '100%', sm: 'auto' }}
                        m='2'
                        onClick={onOpen}
                    >
                        Start a livestream
                    </Button>
                </Flex>
                {data.length ? (
                    <SimpleGrid columns={{ lg: 1, xl: 2 }} spacing='4'>
                        {data.map(item => (
                            <StreamItem key={item._id} {...item} />
                        ))}
                    </SimpleGrid>
                ) : (
                    <Text fontSize='2xl' opacity='30%'>
                        No Streams Found... *sad owo sounds*
                    </Text>
                )}
            </PageContent>
            <Create isOpen={isOpen} onClose={onClose} />
        </>
    );
};
