import React from 'react';
import { SimpleGrid, Text } from '@chakra-ui/core';
import { PageContent } from '../../../components';
import { useGraph } from '../../../utils';
import { GET_POSTS } from '../../../graphql/home';
import { PostOverlay } from './PostOverlay';
import { PostItem } from './PostItem';
import { Route, useParams } from 'react-router-dom';

export default () => {
    const { post } = useParams();
    const { data, loading } = useGraph(GET_POSTS, {
        pipe: ['getPosts'],
        initState: [],
    });

    return (
        <>
            <PageContent loading={loading} label='Your Post Feed'>
                {data ? (
                    <SimpleGrid
                        columns={{ xs: 1, sm: 2, md: 2, lg: 3 }}
                        spacing='4'
                    >
                        {data.map(item => (
                            <PostItem
                                playing={!post}
                                key={item._id}
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
            <Route exact path='/home/:post' component={PostOverlay} />
        </>
    );
};
