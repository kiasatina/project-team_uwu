let _stream;
const create = () =>
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: 256,
            height: 256,
            facingMode: 'user',
        },
    });

export const getStream = async getNew => {
    if (!_stream) {
        _stream = await create();
    } else if (getNew) {
        return await create();
    }
    return _stream;
};
