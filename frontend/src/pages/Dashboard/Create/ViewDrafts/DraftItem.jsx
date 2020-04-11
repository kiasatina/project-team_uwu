import React, { useState, useRef } from 'react';
import { Box, Heading, Badge, Stack, Button } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { displayDate } from '../../../../utils';
import { DisplayPost } from '../../../../components/DisplayPost';

export const DraftItem = ({ _id, title, layers, updatedAt, asset }) => {
    const [size, setSize] = useState({ width: 0, height: 0 });
    const videoRef = useRef();

    return (
        <Box rounded='md' overflow='hidden' backgroundColor='white'>
            <DisplayPost
                size={size}
                setSize={setSize}
                videoRef={videoRef}
                video={asset.src}
                layers={layers}
            />
            <Stack padding='4'>
                <Heading as='h2' size='md' isTruncated>
                    {title}
                </Heading>
                <Badge mr='auto'>{displayDate(updatedAt)}</Badge>
                <Button to={`/create/${_id}`} as={Link} leftIcon='edit' mt='2'>
                    Edit Draft
                </Button>
            </Stack>
        </Box>
    );
};
