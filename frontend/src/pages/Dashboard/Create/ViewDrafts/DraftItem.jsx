import React from 'react';
import { Box, Heading, Badge, Stack, Button } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { displayDate } from '../../../../utils';

export const DraftItem = ({ _id, title, updatedAt, asset }) => {
    const pause = ({ currentTarget }) => {
        currentTarget.pause();
        currentTarget.currentTime = 0;
    };
    const play = ({ currentTarget }) => currentTarget.play();

    return (
        <Box rounded='md' overflow='hidden' backgroundColor='white'>
            <video src={asset.src} loop onMouseOver={play} onMouseOut={pause} />
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
