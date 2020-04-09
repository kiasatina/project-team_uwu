export const socketEvents = {
    PEER_RELAY: peer => `PEER_RELAY${ peer ? `_${peer}` : '' }`,
    END_STREAM: 'END_STREAM',
    START_PEER: 'START_PEER',
    GET_ROLE: 'GET_ROLE',
    LEAVE: 'LEAVE',
    JOIN: 'JOIN',
};