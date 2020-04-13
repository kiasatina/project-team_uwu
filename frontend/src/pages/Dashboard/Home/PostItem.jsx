import React, { useState, useRef } from 'react';
import { Box, Heading, Badge, Stack, Avatar, Tag } from '@chakra-ui/core';
import { displayDate } from '../../../utils';
import { DisplayPost, DisplayPostItem } from '../../../components';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const PostItem = ({
    _id,
    user,
    title,
    layers,
    updatedAt,
    location,
    asset,
    playing,
    from,
}) => {
    const [size, setSize] = useState({ width: 0, height: 0 });
    const videoRef = useRef();

    let redirect = '';
    switch (from) {
        case 'profile':
            redirect = '/profile/' + user._id + '/';
            break;
        default:
            redirect = '/home/';
            break;
    }

    return (
        <Box
            rounded='md'
            width='100%'
            overflow='hidden'
            backgroundColor='white'
        >
            <Box
                width='100%'
                position='relative'
                as={Link}
                display='block'
                to={`${redirect}${_id}`}
            >
                <DisplayPost
                    size={size}
                    setSize={setSize}
                    videoRef={videoRef}
                    video={asset.src}
                    layers={layers}
                    playing={playing}
                    muted={true}
                >
                    {layers.map((layer, i) => (
                        <DisplayPostItem layer={layer} size={size} key={i} />
                    ))}
                </DisplayPost>
                <Tag size='sm' className='post__overlay'>
                    <Box as={FaMapMarkerAlt} size='10px' mr='2' />
                    {location.place || 'From Nowhere...'}
                </Tag>
            </Box>
            <Stack align='center' width='100%' isInline padding='4' spacing='4'>
                <Avatar
                    as={Link}
                    to={`/profile/${user._id}`}
                    name={user.username}
                    src={user.profile_image?.src}
                />
                <Stack>
                    <Heading as='h2' size='sm' isTruncated>
                        {title}
                    </Heading>
                    <Badge mr='auto'>{displayDate(updatedAt)}</Badge>
                </Stack>
            </Stack>
        </Box>
    );
};
