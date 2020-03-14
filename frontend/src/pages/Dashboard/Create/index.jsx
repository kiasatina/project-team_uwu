import React, { useCallback, useState, useEffect } from 'react';
import { Form, Header, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { PageContent, Sidenav, Viewer } from '../../../components';
import { useRecorder, fetchGraph } from '../../../utils';
import { CREATE_POST } from '../../../graphql/post';
import './index.scss';

const validationSchema = Yup.object().shape({
    description: Yup.string().required(),
    title: Yup.string().required(),
    asset: Yup.string().required(),
});

const initialValues = {
    asset: undefined,
    title: '',
    description: '',
};

export default () => {
    const { getRecorder, record } = useRecorder();
    const [ recording, setRecording ] = useState();
    const [ video, setVideo ] = useState();
    const { setFieldValue, ...formik } = useFormik({
        initialValues,
        validationSchema,
        async onSubmit(values) {
            values.asset.lastModifiedDate = new Date();
            values.asset.name = 'uwu';
            await fetchGraph(CREATE_POST, values);
        },
    });

    useEffect(() => {
        if (!video || recording) {
            URL.revokeObjectURL(video);
            (async () => {
                const recorder = await getRecorder();
                setVideo(recorder.stream);
            })();
        }
    }, [ video, recording, getRecorder ]);

    const getRecording = useCallback(async () => {
        // Record and set to view
        setRecording(true);
        const file = await record();
        const _video = URL.createObjectURL(file);

        // Update state
        setFieldValue('asset', file);
        setRecording(false);
        setVideo(_video);
    }, [ setFieldValue, record ]);

    const upload = useCallback(({ currentTarget }) => {
        const file = currentTarget.files[0];
        const _video = URL.createObjectURL(file);

        // Update state
        setFieldValue('asset', file);
        setVideo(_video);
    }, [ setFieldValue ]);

    return (
        <>
            <PageContent label='Create a Post'>
                YEEE
            </PageContent>
            <Sidenav padded>
                <Header as='h2' size='medium'>
                    Create a Draft Post
                    <Header.Subheader>
                        Get started by uploading a video,
                        and giving it some quality content.
                    </Header.Subheader>
                </Header>
                <Viewer video={ video }/>
                <div className='create__buttons'>
                    <Button
                        onClick={ getRecording }
                        loading={ recording }
                        fluid
                    >
                        Record
                    </Button>
                    <Button basic fluid>
                        <input
                            className='create__upload'
                            onChange={ upload }
                            accept='video/*'
                            type='file'
                        />
                        Upload Video
                    </Button>
                </div>
                <Form className='create__form' onSubmit={ formik.handleSubmit }>
                    <Form.Input
                        label='Title of Post'
                        name='title'
                        placeholder='e.g. UwU on your OwO'
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        required
                    />
                    <Form.TextArea
                        label='Description'
                        name='description'
                        placeholder='e.g. Best UwU in the world OwO'
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        required
                    />
                    <Button
                        disabled={ !formik.dirty || !formik.isValid }
                        loading={formik.isSubmitting}
                        type='submit'
                        fluid
                    >
                        Create Post
                    </Button>
                </Form>
            </Sidenav>
        </>
    );
};
