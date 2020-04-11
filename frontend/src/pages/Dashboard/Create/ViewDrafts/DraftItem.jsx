import React from 'react';
import { Box } from '@chakra-ui/core';

export const DraftItem = ({ _id, asset }) => (
    <Box rounded='md' overflow='hidden' width='33.3333%'>
        <video src={asset.src} />
    </Box>
);
