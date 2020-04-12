export const GET_POSTS = `
    query getPosts {
        getPosts(limit: 100) {
            _id
            user {
                _id
                username
                profile_image {
                    src
                }
            }
            asset {
                src
            }
            title
            description
            layers {
                type
                filter
                sticker {
                    href
                }
                position {
                    x
                    y
                }
                text
            }
            updatedAt
        }
    }
`;

export const GET_POST = `
    query getPosts($id: ID!) {
        getPosts(_id: $id) {
            _id
            user {
                _id
                username
                profile_image {
                    src
                }
            }
            asset {
                src
            }
            title
            description
            layers {
                type
                filter
                sticker {
                    href
                }
                position {
                    x
                    y
                }
                text
            }
            updatedAt
        }
    }
`;
