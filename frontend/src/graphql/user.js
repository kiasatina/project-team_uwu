export const LOGIN = `
    mutation login(
        $email: String!,
        $password: String!
    ) {
        login(
            email: $email,
            password: $password
        )
    }
`;

export const REGISTER = `
    mutation register(
        $email: String!,
        $username: String!,
        $password: String!
    ) {
        register(
            email: $email,
            username: $username,
            password: $password
        )
    }
`;

export const GET_ME = `
    {
        getMe {
            _id
            username
        }
    }
`;
