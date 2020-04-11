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

export const GET_DRAFTS = `
    query getDrafts {
        getMe {
            posts(draft: true) {
                _id
                asset {
                    src
                }
                title
                updatedAt
            }
        }
    }
`;

export const GET_DRAFT = `
    query getDraft($id: ID!) {
        getPosts(_id: $id) {
            _id
            title
            description
            asset {
                src
            }
            audio {
                src
            }
            layers {
                type
                filter
                asset {
                    src
                }
                position {
                    x
                    y
                }
                text
            }
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
