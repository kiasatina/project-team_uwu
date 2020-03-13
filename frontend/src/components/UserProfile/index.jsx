import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Icon, Form, Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import { GET_MY_PROFILE } from '../../graphql/user';
import { fetchGraph, printError } from '../../utils';
import './index.scss';
import { Link } from 'react-router-dom';

const DEFAULT =
    'https://media.tenor.com/images/2e134ea071498a68c777d5540b65fecd/tenor.gif';

const validationSchema = Yup.object().shape({
    username: Yup.string(),
    email: Yup.string().email('Invalid email'),
    confirm_password: Yup.string().min(
        8,
        'Password must be at least 8 characters long',
    ),
    password: Yup.string().min(
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
    const [user, setUser] = useState(null);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        (async () => {
            let res = await fetchGraph(GET_MY_PROFILE);
            setUser(res.getMe);
        })();

        return () => {};
    }, []);

    const formik = useFormik({
        initialValues: user || {},
        validationSchema,
        enableReinitialize: true,
        async onSubmit({ confirm_password, ...values }) {
            try {
                setEdit(false);
            } catch (err) {
                toast.error(printError(err.message));
            }
        },
    });

    const comparePassword = formik.values?.confirm_password
        ? displayError('confirm_password', formik) ||
          (formik.values.password !== formik.values.confirm_password && {
              content: "Passwords don't match",
          })
        : undefined;

    return edit ? (
        <div className='userprofile'>
            <div className='userprofile__form'>
                <Form onSubmit={formik.handleSubmit}>
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
                        <label htmlFor='email'>Email Address</label>
                        <Form.Input
                            name='email'
                            placeholder='Email Address'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            error={displayError('email', formik)}
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
                            color='teal'
                            basic
                            onClick={() => {
                                setEdit(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            color='teal'
                            type='submit'
                            disabled={!formik.dirty || !formik.isValid}
                            loading={formik.isSubmitting}
                        >
                            Save
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
                <div>{user?.bio}</div>
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
