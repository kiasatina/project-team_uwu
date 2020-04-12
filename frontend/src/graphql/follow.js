export const FOLLOW = `
    mutation follow(
        $id: ID!
    ) {
        follow(
            _id: $id
        )
    }
`;

export const UNFOLLOW = `
    mutation unfollow(
        $id: ID!
    ) {
        unfollow(
            _id: $id
        )
    }
`;

export const GET_FOLLOWERS = `
    query getFollowers(
        $id: ID
    ) {
        getFollowers(
            following: $id
            limit: 200
            ) {
                _id
                username
                profile_image {
                    src
                }
            }
    }
`;

export const GET_FOLLOWING = `
    query getFollowing(
        $id: ID
    ) {
        getFollowing(
            follower: $id
            limit: 200
            ) {
                _id
                username
                profile_image {
                    src
                }
            }
    }
`;
