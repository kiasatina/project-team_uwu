import React, { useEffect, useRef, useReducer } from 'react';
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
};

const reducer = (state, action) => {
    if (typeof action === 'function') {
        action = action(state);
    }
    return { ...state, ...action };
};

export default () => {
    const { streamId } = useParams();
    const [info, dispatch] = useReducer(reducer);
    const { data, loading } = useGraph(FETCH_STREAM, {
        pipe: ['getLivestreams', 0],
        variables: { _id: streamId },
    });
    const history = useHistory();
    const socket = useRef();

    console.log(info);

    useEffect(() => {
        socket.current = io(process.env.REACT_APP_SOCKET, {
            query: {
                token: localStorage.getItem('token'),
                room: streamId,
            },
        });
        socket.current.once('error', () => {
            history.push('/stream');
        });
        socket.current.once(socketEvents.END_STREAM, () => {
            history.push('/stream');
        });
        socket.current.on(socketEvents.UPDATE_LAYER, ({ peer, data }) => {
            dispatch(_info => ({
                layers: {
                    ..._info.layers,
                    [peer]: data,
                },
            }));
        });
        socket.current.on(socketEvents.JOIN, ({ peer, ...user }) => {
            dispatch(_info => ({
                layers: {
                    ..._info.layers,
                    [peer]: {},
                },
                viewers: {
                    ..._info.viewers,
                    [peer]: user,
                },
            }));
        });
        socket.current.on(socketEvents.LEAVE, ({ peer }) => {
            dispatch(_info => {
                const { [peer]: __, ...viewers } = _info.viewers;
                const { [peer]: _, ...layers } = _info.layers;
                return { layers, viewers };
            });
        });
        socket.current.emit(socketEvents.GET_INFO, _info => {
            dispatch(_info);
        });

        return () => {
            socket.current.disconnect();
        };
    }, [history, streamId]);

    const Component = map[info?.role];
    return (
        <Loading loading={!info || loading}>
            {Component && (
                <Component
                    socket={socket}
                    data={data}
                    info={info}
                    dispatch={dispatch}
                />
            )}
        </Loading>
    );
};
