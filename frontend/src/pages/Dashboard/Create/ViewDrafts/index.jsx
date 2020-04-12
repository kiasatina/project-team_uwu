import React from 'react';
import {
    SimpleGrid,
    Text,
    useDisclosure,
    Flex,
    Heading,
    Button,
} from '@chakra-ui/core';
import { useGraph } from '../../../../utils';
import { PageContent } from '../../../../components';
import { GET_DRAFTS } from '../../../../graphql/post';
import { DraftItem } from './DraftItem';
import { Create } from './Create';

export const ViewDrafts = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data, loading, refetch } = useGraph(GET_DRAFTS, {
        pipe: ['getMe', 'posts'],
        initState: [],
    });

    return (
        <>
            <PageContent loading={loading}>
                <Flex
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    alignItems='center'
                    m='0 -0.5em 0.5em'
                >
                    <Heading m='2' as='h1' size='lg' width='100%'>
                        View Drafts
                    </Heading>
                    <Button
                        flexShrink='0'
                        width={{ xs: '100%', sm: 'auto' }}
                        m='2'
                        onClick={onOpen}
                    >
                        Create a Draft
                    </Button>
                </Flex>
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
            <Create isOpen={isOpen} onClose={onClose} refetch={refetch} />
        </>
    );
};
