let _stream;
export const getStream = async () => {
    if (!_stream) {
        _stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                width: 256,
                height: 256,
                facingMode: 'user',
            },
        });
    }
    return _stream;
};