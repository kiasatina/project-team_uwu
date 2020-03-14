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
            profile_image {
                src
            }
        }
    }
`;

export const GET_MY_PROFILE = `
    {
        getMe {
            _id,
            bio,
            email,
            username,
            profile_image {
                src
            }
        }
    }
`;

export const UPDATE_PROFILE = `
    mutation updateProfile(
        $input: ProfileInput!
    ) {
        updateProfile(
            input: $input
        ) { 
            _id,
            bio,
            email,
            username,
            profile_image {
                src
            }
         }
    }
`;
