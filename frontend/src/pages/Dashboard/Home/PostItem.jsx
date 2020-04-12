import React, { useState, useRef } from 'react';
import { Box, Heading, Badge, Stack, Avatar } from '@chakra-ui/core';
import { displayDate } from '../../../utils';
import { DisplayPost, DisplayPostItem } from '../../../components';
import { Link } from 'react-router-dom';

export const PostItem = ({
    _id,
    user,
    title,
    layers,
    updatedAt,
    asset,
    playing,
}) => {
    const [size, setSize] = useState({ width: 0, height: 0 });
    const videoRef = useRef();

    return (
        <Box
            as={Link}
            rounded='md'
            width='100%'
            overflow='hidden'
            backgroundColor='white'
            to={`/home/${_id}`}
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
            <Stack align='center' width='100%' isInline padding='4' spacing='4'>
                <Avatar name={user.username} src={user.profile_image?.src} />
                <Stack>
                    <Heading as='h2' size='sm' isTruncated>
                        {user.username} | {title}
                    </Heading>
                    <Badge mr='auto'>{displayDate(updatedAt)}</Badge>
                </Stack>
            </Stack>
        </Box>
    );
};
