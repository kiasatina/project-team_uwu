import { useFormik } from 'formik';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Icon } from 'semantic-ui-react';
import * as Yup from 'yup';
import { GET_MY_PROFILE, UPDATE_PROFILE } from '../../graphql/user';
import { fetchGraph, printError } from '../../utils';
import './index.scss';

const DEFAULT =
    'https://media.tenor.com/images/2e134ea071498a68c777d5540b65fecd/tenor.gif';

const validationSchema = Yup.object().shape({
    username: Yup.string(),
    bio: Yup.string(),
    password: Yup.string().min(
        8,
        'Password must be at least 8 characters long',
    ),
    confirm_password: Yup.string().min(
        8,
        'Password must be at least 8 characters long',
    ),
});

const displayError = (label, formik) => {
    if (formik.values[label] && formik.errors[label]) {
        return { content: formik.errors[label] };
    }
};

export const UserProfile = () => {
    const [user, setUser] = useState();
    const [edit, setEdit] = useState(false);
    const ref = useRef();

    useEffect(() => {
        (async () => {
            let res = await fetchGraph(GET_MY_PROFILE);
            setUser(res.getMe);
        })();

        return () => {};
    }, []);

    const { setFieldValue, ...formik } = useFormik({
        initialValues: { ...user, password: '', confirm_password: '' },
        validationSchema,
        enableReinitialize: true,
        async onSubmit({ _id, email, confirm_password, ...values }) {
            try {
                let newValues = {};
                Object.entries(values).forEach(([key, value]) => {
                    if (
                        user[key] !== value &&
                        !(key === 'password' && value === '')
                    ) {
                        newValues[key] = value;
                    }
                });
                let res = await fetchGraph(UPDATE_PROFILE, newValues);
                setUser(res.updateProfile);
                setEdit(false);
                formik.resetForm();
            } catch (err) {
                toast.error(printError(err.message));
            }
        },
    });

    const upload = useCallback(
        ({ currentTarget }) => {
            const file = currentTarget.files[0];
            setFieldValue('profile_image', file);
            ref.current.src = URL.createObjectURL(file);
        },
        [setFieldValue],
    );

    const comparePassword = formik.values?.confirm_password
        ? displayError('confirm_password', formik) ||
          (formik.values.password !== formik.values.confirm_password && {
              content: "Passwords don't match",
          })
        : undefined;

    return edit ? (
        <div className='userprofile'>
            <div className='userprofile__form'>
                <div className='userprofile__form-header'>Edit Profile</div>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Field className='userprofile__form-img'>
                        <img
                            ref={ref}
                            src={user?.profile_image?.src || DEFAULT}
                            alt='you'
                            className='userprofile__form-img-src'
                        />
                        <Button
                            as='label'
                            htmlFor='profile_image'
                            icon
                            labelPosition='left'
                            type='button'
                        >
                            <Icon name='upload' />
                            Upload
                        </Button>
                        <input
                            name='profile_image'
                            id='profile_image'
                            type='file'
                            onChange={upload}
                            hidden
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor='username'>Username</label>
                        <Form.Input
                            name='username'
                            placeholder='Username'
                            onChange={formik.handleChange}
                            value={formik.values.username}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor='bio'>Bio</label>
                        <Form.TextArea
                            name='bio'
                            placeholder='Bio'
                            onChange={formik.handleChange}
                            value={formik.values.bio}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor='password'>New Password</label>
                        <Form.Input
                            name='password'
                            placeholder='New Password'
                            type='password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            error={displayError('password', formik)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor='password'>Confirm Password</label>
                        <Form.Input
                            name='confirm_password'
                            placeholder='Confirm Password'
                            type='password'
                            onChange={formik.handleChange}
                            value={formik.values.confirm_password}
                            error={comparePassword}
                        />
                    </Form.Field>
                    <div className='userprofile__form-buttons'>
                        <Button
                            fluid
                            color='teal'
                            type='submit'
                            disabled={!formik.dirty || !formik.isValid}
                            loading={formik.isSubmitting}
                        >
                            Save
                        </Button>
                        <Button
                            fluid
                            color='teal'
                            basic
                            onClick={() => {
                                setEdit(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    ) : (
        <div className='userprofile'>
            <div className='userprofile__img'>
                <img
                    src={user?.profile_image?.src || DEFAULT}
                    alt='you'
                    className='userprofile__img-src'
                />
            </div>
            <div className='userprofile__text'>
                <div className='userprofile__text-username'>
                    {user?.username}
                </div>
                <div className='userprofile__text-email'>{user?.email}</div>
                <div className='userprofile__text-bio'>{user?.bio}</div>
            </div>
            <Icon
                onClick={() => {
                    setEdit(true);
                }}
                link
                name='pencil'
                size='large'
            ></Icon>
        </div>
    );
};
