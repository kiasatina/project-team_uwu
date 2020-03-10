import React, { useEffect } from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { fetchGraph, printError } from '../../utils';
import { LandingPage } from '../../components';
import { LOGIN } from '../../graphql/user';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required(),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required(),
});

const initialValues = {
    email: '',
    password: '',
};

const displayError = (label, formik) => {
    if (formik.values[label] && formik.errors[label]) {
        return { content: formik.errors[label] };
    }
};

export default () => {
    const history = useHistory();
    const formik = useFormik({
        initialValues,
        validationSchema,
        async onSubmit(values) {
            try {
                const data = await fetchGraph(LOGIN, values);
                localStorage.setItem('token', data.login);
                history.push('/home');
            } catch (err) {
                toast.error(printError(err.message));
            }
        },
    });

    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/home');
        }
    }, [history]);

    return (
        <LandingPage title='UwU Login Page'>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Field required>
                    <label htmlFor='email'>Email Address</label>
                    <Form.Input
                        name='email'
                        placeholder='Email Address'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={displayError('email', formik)}
                    />
                </Form.Field>
                <Form.Field required>
                    <label htmlFor='password'>Password</label>
                    <Form.Input
                        name='password'
                        placeholder='Password'
                        type='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={displayError('password', formik)}
                    />
                </Form.Field>
                <div>
                    <Button
                        color='teal'
                        type='submit'
                        disabled={!formik.dirty || !formik.isValid}
                        loading={formik.isSubmitting}
                    >
                        <Icon name='sign-in' />
                        Login
                    </Button>
                    <Button color='teal' as={Link} to='/register' basic>
                        New user?
                    </Button>
                </div>
            </Form>
        </LandingPage>
    );
};
