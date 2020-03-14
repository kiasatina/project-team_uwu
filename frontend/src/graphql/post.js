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
            asset {
                src
                type
            }
            createdAt
        }
    }
`;