export const FETCH_STREAM = `
    query checkStream($_id: ID!) {
        getLivestreams(_id: $_id, live: true) {
            _id
            title
            user {
                username
            }
            viewers
        }
    }
`;

export const FETCH_STREAMS = `
    query checkStream($updatedAt: DateTime!) {
        getLivestreams(updatedAt: $updatedAt, live: true) {
            _id
            title
            user {
                _id
                username
                profile_image {
                    src
                }
            }
            updatedAt
            viewers
        }
    }
`;

export const CREATE_LIVESTREAM = `
    mutation createLivestream($title: String!) {
        createLivestream(title: $title) {
            _id
        }
    }
`;
