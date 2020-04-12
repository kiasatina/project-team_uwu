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
