import React from 'react';
import { Flex, ListItem, List, Link } from '@chakra-ui/core';
import { PageContent } from '../../components';

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
                                color='teal.500'
                                isExternal
                            >
                                Freepik
                            </Link>{' '}
                            from{' '}
                            <Link
                                href='https://www.flaticon.com/'
                                color='teal.500'
                                isExternal
                            >
                                Flaticon
                            </Link>
                        </ListItem>
                        <ListItem>
                            Code in Editor from{' '}
                            <Link
                                href='https://stackoverflow.com/questions/59741398/play-video-on-canvas-in-react-konva'
                                color='teal.500'
                                isExternal
                            >
                                Stack Overflow
                            </Link>
                        </ListItem>
                        <ListItem>
                            Code in VideoLayer from{' '}
                            <Link
                                href='https://konvajs.org/docs/react/Images.html'
                                color='teal.500'
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
