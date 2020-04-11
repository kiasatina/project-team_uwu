import React from 'react';
import { useParams } from 'react-router-dom';
import { useGraph, DraftContext } from '../../../../utils';
import { GET_DRAFT } from '../../../../graphql/post';
import { Loading } from '../../../../components';
import { Controls } from './Controls';
import { Editor } from './Editor';

export const EditDraft = () => {
    const { draft } = useParams();
    const { data, loading, dispatch } = useGraph(GET_DRAFT, {
        variables: { id: draft },
        pipe: ['getPosts', 0],
    });

    return (
        <Loading loading={loading}>
            <DraftContext.Provider value={{ data, dispatch }}>
                <Editor />
                <Controls />
            </DraftContext.Provider>
        </Loading>
    );
};
