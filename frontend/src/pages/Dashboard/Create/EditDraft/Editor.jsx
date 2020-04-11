import React, { useContext } from 'react';
import { Box } from '@chakra-ui/core';
import { PageContent } from '../../../../components';
import { DraftContext } from '../../../../utils';

export const Editor = () => {
    const { data } = useContext(DraftContext);
    return (
        <PageContent label='Edit your post'>
            <Box rounded='md' overflow='hidden' maxW='800px'>
                <video
                    className='draft__video'
                    autoPlay
                    loop
                    src={data.asset.src}
                />
            </Box>
        </PageContent>
    );
};
