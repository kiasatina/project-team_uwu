import React from 'react';
import { SimpleGrid, Text } from '@chakra-ui/core';
import { useGraph } from '../../../../utils';
import { PageContent } from '../../../../components';
import { GET_DRAFTS } from '../../../../graphql/post';
import { DraftItem } from './DraftItem';
import { Create } from './Create';

export const ViewDrafts = () => {
    const { data, loading } = useGraph(GET_DRAFTS, {
        pipe: ['getMe', 'posts'],
        initState: [],
    });

    return (
        <>
            <PageContent loading={loading} label='Draft Posts'>
                {data.length ? (
                    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing='4'>
                        {data.map(item => (
                            <DraftItem key={item._id} {...item} />
                        ))}
                    </SimpleGrid>
                ) : (
                    <Text fontSize='2xl' opacity='30%'>
                        No Drafts Found... *sad owo sounds*
                    </Text>
                )}
            </PageContent>
            <Create />
        </>
    );
};
