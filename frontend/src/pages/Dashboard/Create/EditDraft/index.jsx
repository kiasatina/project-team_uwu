import React from 'react';
import { useParams } from 'react-router-dom';
import { useGraph } from '../../../../utils';
import { GET_DRAFT } from '../../../../graphql/post';
import { Loading } from '../../../../components';
import { Editor } from './Editor';

export const EditDraft = () => {
    const { draft } = useParams();
    const { data, loading } = useGraph(GET_DRAFT, {
        variables: { id: draft },
        pipe: ['getPosts', 0],
    });

    return (
        <Loading loading={loading}>
            <Editor draft={data} />
        </Loading>
    );
};
