export const CREATE_POST = `
    mutation createPost(
        $asset: Upload!,
        $title: String!,
        $description: String!
    ) {
        createPost(
            asset: $asset,
            title: $title,
            description: $description
        ) {
            _id
            title
            description
            asset {
                src
                type
            }
            createdAt
        }
    }
`;

export const GET_POSTS = `
    query getPosts(
        $user: ID,
        $draft: Boolean,
        $limit: Int,
        $page: Int 
    ) {
        getPosts(
            user: $user,
            draft: $draft,
            limit: $limit,
            page: $page 
        ) {
            _id
            user {
                username
            }
            asset {
                src
            }
            title
            description
            draft
            createdAt
        }
    }
`;
