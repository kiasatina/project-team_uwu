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
                layers {
                    type
                    filter
                    sticker {
                        href
                        asset {
                            src
                        }
                    }
                    position {
                        x
                        y
                    }
                    text
                }
                title
                updatedAt
            }
        }
    }
`;

export const GET_DRAFT = `
    query getDraft($id: ID!) {
        getPosts(_id: $id, draft: true) {
            _id
            title
            description
            asset {
                src
            }
            layers {
                type
                filter
                sticker {
                    href
                    asset {
                        src
                    }
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
        $layers: [PostLayerInput],
        $location: PostLocationInput
    ) {
        updatePost(
            _id: $_id,
            draft: $draft,
            layers: $layers
            location: $location
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
