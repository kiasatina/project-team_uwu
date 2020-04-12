import React from 'react';
import { Flex, ListItem, List, Link } from '@chakra-ui/core';
import { PageContent } from '../../../components';

export default () => {
    return (
        <>
            <PageContent label='Credits'>
                <Flex p='6' backgroundColor='white' rounded='md'>
                    <List styleType='disc'>
                        <ListItem>
                            Icons made by{' '}
                            <Link
                                href='https://www.flaticon.com/authors/freepik'
                                color='blue.500'
                                isExternal
                            >
                                Freepik
                            </Link>{' '}
                            from{' '}
                            <Link
                                href='https://www.flaticon.com/'
                                color='blue.500'
                                isExternal
                            >
                                Flaticon
                            </Link>
                        </ListItem>
                        <ListItem>
                            Code from{' '}
                            <Link
                                href='https://stackoverflow.com/questions/59741398/play-video-on-canvas-in-react-konva'
                                color='blue.500'
                                isExternal
                            >
                                Stack Overflow
                            </Link>
                        </ListItem>
                        <ListItem>
                            Code from{' '}
                            <Link
                                href='https://konvajs.org/docs/react/Images.html'
                                color='blue.500'
                                isExternal
                            >
                                Konva
                            </Link>
                        </ListItem>
                    </List>
                </Flex>
            </PageContent>
        </>
    );
};
