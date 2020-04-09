import React, { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import io from 'socket.io-client';

import { Loading } from '../../../../components';
import { socketEvents, useGraph } from '../../../../utils';
import Streaming from './Streaming';
import Viewing from './Viewing';
import { FETCH_STREAM } from '../../../../graphql/stream';

const map = {
    STREAMER: Streaming,
    VIEWER: Viewing,
}

export default () => {
    const { streamId } = useParams();
    const { data, loading } = useGraph(FETCH_STREAM, {
        pipe: ['getLivestreams', 0],
        variables: { _id: streamId },
    });
    const [ role, setRole ] = useState();
    const history = useHistory();
    const socket = useRef();

    useEffect(() => {
        socket.current = io(process.env.REACT_APP_SOCKET, {
            query: {
                token: localStorage.getItem('token'),
                room: streamId,
            }
        });
        socket.current.once('error', () => {
            history.push('/stream');
        });
        socket.current.once(socketEvents.END_STREAM, () => {
            history.push('/stream');
        });
        socket.current.emit(socketEvents.GET_ROLE, setRole);
    }, [ history, streamId ]);

    useEffect(() => () => {
        if (socket.current) {
            socket.current.disconnect();
        }
    }, []);

    const Component = map[role];
    return (
        <Loading loading={!role || loading}>
            {Component && <Component socket={socket} data={data}/>}
        </Loading>
    );
};
