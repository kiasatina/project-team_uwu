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
                type
            }
            title
            description
            draft
            layers {
                type
                filter
                asset {
                    src
                    type
                }
                position {
                    x
                    y
                }
                text
            }
            createdAt
        }
    }
`;

export const UPDATE_POST = `
    mutation updatePost(
        $_id: ID!,
        $draft: Boolean,
        $layers: [PostLayerInput]
    ) {
        updatePost(
            _id: $_id,
            draft: $draft,
            layers: $layers
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
