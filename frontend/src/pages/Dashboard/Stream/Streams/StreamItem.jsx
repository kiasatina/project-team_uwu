import React from 'react';
import {
    Heading,
    Text,
    Flex,
    Avatar,
    AvatarBadge,
    Box,
    Stack,
    Tag,
    Button,
} from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

export default ({ _id, title, user, viewers, updatedAt }) => {
    const history = useHistory();
    return (
        <Box bg='white' borderRadius='md' key={_id} px='4' py='5'>
            <Flex direction={{ base: 'column', lg: 'row' }}>
                <Stack
                    width='100%'
                    spacing='3'
                    mr='auto'
                    mb={{ base: 4, lg: 0 }}
                >
                    <Flex>
                        <Avatar
                            src={user.profile_image?.src}
                            name={user.username}
                            mr='4'
                        >
                            <AvatarBadge size='5' bg='green.500' />
                        </Avatar>
                        <Stack spacing='0'>
                            <Heading as='h2' size='md'>
                                {title}
                            </Heading>
                            <Text color='gray.500'>{user.username}</Text>
                        </Stack>
                    </Flex>
                    <Flex
                        alignItems={{ base: 'stretch', md: 'flex-start' }}
                        direction={{ base: 'column', md: 'row' }}
                    >
                        <Tag
                            mb={{ base: 1, md: 0 }}
                            mr={{ base: 0, md: 3 }}
                            bg='gray.400'
                            color='white'
                            size='sm'
                        >
                            {viewers} Viewers
                        </Tag>
                        <Tag bg='gray.400' color='white' size='sm'>
                            {new Date(updatedAt).toLocaleString()}
                        </Tag>
                    </Flex>
                </Stack>
                <Button onClick={() => history.push(`/stream/${_id}`)}>
                    Join Stream
                </Button>
            </Flex>
        </Box>
    );
};
