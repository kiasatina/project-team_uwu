import {
    Accordion,
    AccordionHeader,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Stack,
    Box,
    Button,
    Flex,
    Image,
    Input,
} from '@chakra-ui/core';
import React, { useCallback, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { stickers } from '../../../../../assets';
import {
    PageContent,
    DisplayPost,
    DisplayPostItem,
} from '../../../../../components';
import { UPDATE_POST, GET_DRAFT } from '../../../../../graphql/post';
import { fetchGraph, printError, useGraph } from '../../../../../utils';
import './index.scss';

const filters = [
    'Grayscale',
    'Sepia',
    'Saturate',
    'Invert',
    'Brightness',
    'Blur',
];

const EditDraftT = ({ draft, onExit }) => {
    const [playing, setIsPlaying] = useState(true);
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [layers, setLayers] = useState(draft.layers);
    const [text, setText] = useState('');
    const history = useHistory();
    const videoRef = useRef();

    const saveAndPublish = async publish => {
        try {
            // No sticker layers until uploading is a thing
            await fetchGraph(UPDATE_POST, {
                ...draft,
                layers,
                draft: !publish,
            });
            if (publish) {
                history.push('/create');
                toast.success('Post has been created');
            } else {
                toast.success('Draft has been saved');
            }
        } catch (err) {
            toast.error(printError(err.message));
            console.error(err);
        }
    };

    // Uses default CSS filters for the filters (one only)
    const filterVideo = filter => {
        const newLayers = layers.filter(layer => layer.type !== 'FILTER');
        const layer = {
            type: 'FILTER',
            filter: filter,
        };
        setLayers([...newLayers, layer]);
    };

    const addTextLayer = () => {
        const layer = {
            type: 'TEXT',
            text,
            position: {
                x: 0.5,
                y: 0.5,
            },
        };
        setText('');
        setLayers([...layers, layer]);
    };

    const addStickerLayer = index => {
        const layer = {
            type: 'STICKER',
            sticker: {
                href: stickers[index],
            },
            position: {
                x: 0.5,
                y: 0.5,
            },
        };
        setLayers([...layers, layer]);
    };

    // For the onDragEnd event
    const moveLayer = useCallback(
        (layerElement, index) => {
            const newLayers = [...layers];
            newLayers[index] = {
                ...newLayers[index],
                position: {
                    x: layerElement.x() / size.width,
                    y: layerElement.y() / size.height,
                },
            };
            setLayers(newLayers);
        },
        [layers, size],
    );

    return (
        <>
            <Stack rounded='md' background='white' p='4' mb='20'>
                <DisplayPost
                    size={size}
                    setSize={setSize}
                    videoRef={videoRef}
                    video={draft.asset.src}
                    playing={playing}
                    layers={layers}
                    drag={moveLayer}
                >
                    {layers.map((layer, index) => (
                        <DisplayPostItem
                            key={index}
                            layer={layer}
                            size={size}
                            drag={e => {
                                moveLayer(e.target, index);
                            }}
                        />
                    ))}
                </DisplayPost>
                <Button
                    onClick={() => {
                        setIsPlaying(!playing);
                    }}
                    mt='3'
                >
                    {playing ? 'Pause' : 'Play'}
                </Button>
                <Accordion my='4' allowToggle>
                    <AccordionItem>
                        <AccordionHeader>
                            <Box flex='1' textAlign='left'>
                                Text
                            </Box>
                            <AccordionIcon />
                        </AccordionHeader>
                        <AccordionPanel p={4}>
                            <Flex direction='row'>
                                <Input
                                    onChange={({ target }) =>
                                        setText(target.value)
                                    }
                                    placeholder='Enter your text'
                                    value={text}
                                    mr={2}
                                />
                                <Button disabled={!text} onClick={addTextLayer}>
                                    Add
                                </Button>
                            </Flex>
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionHeader>
                            <Box flex='1' textAlign='left'>
                                Stickers
                            </Box>
                            <AccordionIcon />
                        </AccordionHeader>
                        <AccordionPanel p={4}>
                            <Flex
                                direction='row'
                                wrap='wrap'
                                justify='space-around'
                            >
                                {stickers.map((sticker, index) => {
                                    return (
                                        <Image
                                            m='2'
                                            size='50px'
                                            key={index}
                                            src={sticker}
                                            className='sticker'
                                            onClick={() => {
                                                addStickerLayer(index);
                                            }}
                                        />
                                    );
                                })}
                            </Flex>
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionHeader>
                            <Box flex='1' textAlign='left'>
                                Filters
                            </Box>
                            <AccordionIcon />
                        </AccordionHeader>
                        <AccordionPanel p={4}>
                            <Flex
                                direction='row'
                                wrap='wrap'
                                justify='space-around'
                            >
                                {filters.map((filter, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => {
                                            filterVideo(filter);
                                        }}
                                    >
                                        {filter}
                                    </Button>
                                ))}
                            </Flex>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Stack>

            <Flex
                px='4'
                py='4'
                className='editor__footer'
                direction='row'
                align='right'
                backgroundColor='white'
            >
                <Button
                    className='editor__footer-button'
                    variant='outline'
                    onClick={onExit}
                >
                    Cancel
                </Button>
                <Button
                    className='editor__footer-button'
                    onClick={() => {
                        saveAndPublish(false);
                    }}
                >
                    Save
                </Button>
                <Button
                    className='editor__footer-button'
                    onClick={() => {
                        saveAndPublish(true);
                    }}
                    variantColor='blue'
                >
                    Publish
                </Button>
            </Flex>
        </>
    );
};

export const Editor = () => {
    const { draft } = useParams();
    const history = useHistory();

    const onError = useCallback(() => {
        toast.error('Unable to fetch draft');
        history.push('/create');
    }, [history]);

    const { data, loading } = useGraph(GET_DRAFT, {
        variables: { id: draft },
        pipe: ['getPosts', 0],
        onError,
    });

    return (
        <PageContent className='draft' loading={loading}>
            <EditDraftT
                draft={data}
                onExit={() => {
                    history.push('/create');
                }}
            />
        </PageContent>
    );
};
