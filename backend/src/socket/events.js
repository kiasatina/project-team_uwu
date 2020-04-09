module.exports = {
    PEER_RELAY: peer => `PEER_RELAY${peer ? `_${peer}` : ''}`,
    START_PEER: 'START_PEER',
    END_STREAM: 'END_STREAM',
    GET_ROLE: 'GET_ROLE',
    LEAVE: 'LEAVE',
    JOIN: 'JOIN',
};
