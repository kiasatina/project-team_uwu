export const displayDate = (date, config = {}) => {
    const res = [];
    const { showDate = true, showTime = true } = config;

    if (!(date instanceof Date)) {
        date = new Date(date);
    }

    if (showDate) {
        res.push(date.toLocaleDateString('en-US'));
    }

    if (showTime) {
        res.push(
            date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
            }),
        );
    }

    return res.join(', ');
};
