import React, { useEffect, useState } from 'react';
import { GET_MY_PROFILE } from '../../graphql/user';
import { fetchGraph } from '../../utils';
import './index.scss';

const DEFAULT =
    'https://media.tenor.com/images/2e134ea071498a68c777d5540b65fecd/tenor.gif';

export const UserProfile = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        (async () => {
            let res = await fetchGraph(GET_MY_PROFILE);
            setUser(res.getMe);
        })();

        return () => {};
    }, []);

    return (
        <div className='userprofile'>
            <div className='userprofile__img'>
                <img
                    src={user?.profile_image?.src || DEFAULT}
                    alt='you'
                    className='userprofile__img-src'
                />
            </div>
            <div className='userprofile__text'>
                <div className='userprofile__text-username'>
                    {user?.username}
                </div>
                <div className='userprofile__text-email'>{user?.email}</div>
                <div>{user?.bio}</div>
            </div>
        </div>
    );
};
