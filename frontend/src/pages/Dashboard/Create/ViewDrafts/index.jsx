import React from 'react';
import { PageContent } from '../../../../components';
import { GET_POSTS } from '../../../../graphql/post';
import { useGraph } from '../../../../utils';
import { DraftItem } from './DraftItem';
import { Create } from './Create';

export const ViewDrafts = () => {
    const { data, loading } = useGraph(GET_POSTS, {
        pipe: ['getPosts'],
        initState: [],
    });
    return (
        <>
            <PageContent loading={loading} label='Draft Posts'>
                {data.map(item => (
                    <DraftItem key={item._id} {...item} />
                ))}
            </PageContent>
            <Create />
        </>
    );
};
