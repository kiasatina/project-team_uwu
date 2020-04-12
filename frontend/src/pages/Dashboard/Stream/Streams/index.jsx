import React from 'react';
import { Text, SimpleGrid } from '@chakra-ui/core';

import { FETCH_STREAMS } from '../../../../graphql/stream';
import { PageContent } from '../../../../components';
import { useGraph } from '../../../../utils';
import StreamItem from './StreamItem';
import Create from './Create';

export default () => {
    const { data, loading } = useGraph(FETCH_STREAMS, {
        pipe: ['getLivestreams'],
        initState: [],
        variables: {
            updatedAt: new Date(0),
        },
    });

    return (
        <>
            <PageContent label='Live Streams' loading={loading}>
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
            <Create />
        </>
    );
};
