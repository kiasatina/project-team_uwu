export const socketEvents = {
    PEER_RELAY: peer => `PEER_RELAY${peer ? `_${peer}` : ''}`,
    UPDATE_LAYER: 'UPDATE_LAYER',
    START_PEER: 'START_PEER',
    END_STREAM: 'END_STREAM',
    GET_INFO: 'GET_INFO',
    LEAVE: 'LEAVE',
    JOIN: 'JOIN',
};