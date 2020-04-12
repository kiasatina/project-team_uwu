import React, { useState, useEffect, useRef } from 'react';
import {
    Input,
    Stack,
    Box,
    Button,
    Modal,
    useClipboard,
    ModalBody,
    ModalContent,
    useDisclosure,
} from '@chakra-ui/core';
import QRCode from 'qrcode-react';
import { logo } from '../../../../assets';

export const Share = ({ ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { onCopy, hasCopied } = useClipboard(window.location.href);
    const [size, setSize] = useState(0);
    const ref = useRef();

    useEffect(() => {
        if (isOpen) {
            window.setImmediate(() => {
                setSize(ref.current.clientWidth);
            });
        }
    }, [isOpen]);

    return (
        <>
            <Button leftIcon='link' onClick={onOpen} {...props}>
                Share
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent rounded='md'>
                    <ModalBody p='6'>
                        <Box ref={ref}>
                            {size && (
                                <QRCode
                                    size={size}
                                    value={window.location.href}
                                    logoWidth={size / 3}
                                    logo={logo}
                                />
                            )}
                        </Box>
                        <Stack mt='4' isInline>
                            <Input isReadOnly value={window.location.href} />
                            <Button
                                leftIcon='copy'
                                flexShrink='0'
                                onClick={onCopy}
                            >
                                {hasCopied ? 'Copied' : 'Copy Link'}
                            </Button>
                        </Stack>
                        <Button
                            onClick={onClose}
                            mt='4'
                            width='100%'
                            variant='outline'
                        >
                            Done Sharing
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
