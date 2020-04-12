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
            bio
            email
            username
            followers_count
            following_count
            posts_count
            profile_image {
                src
            }
            following {
                _id
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
        $username: String,
        $password: String,
        $new_password: String,
        $bio: String
    ) {
        updateProfile(
            username: $username,
            new_password: $new_password,
            password: $password,
            bio: $bio
        ) { 
            _id
        }
    }
`;

export const UPDATE_PICTURE = `
    mutation updatePicture(
        $profile_image: Upload!
    ) {
        updateProfile(
            profile_image: $profile_image
        ) { 
            profile_image {
                src
            }
        }
    }
`;

export const GET_USER = `
    query getUser($id: ID!) {
        getUsers(_id: $id, limit: 1) {
            _id
            bio
            email
            username
            followers_count
            following_count
            posts_count
            profile_image {
                src
            }
        }
    }
`;

export const GET_USER_POSTS = `
    query getUserPosts($user: ID!) {
        getPosts(user: $user) {
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
