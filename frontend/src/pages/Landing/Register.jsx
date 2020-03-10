import React from 'react';
import { Button, Form, Icon } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { fetchGraph, printError } from '../../utils';
import { REGISTER } from '../../graphql/landing';
import { LandingPage } from '../../components';

const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string()
        .email('Invalid email')
        .required(),
    confirm_password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required(),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required(),
});

const displayError = (label, formik) => {
    if (formik.values[label] && formik.errors[label]) {
        return { content: formik.errors[label] };
    }
};

const initialValues = {
    email: '',
    password: '',
    username: '',
    confirm_password: '',
};

export default () => {
    const history = useHistory();
    const formik = useFormik({
        initialValues,
        validationSchema,
        async onSubmit({ confirm_password, ...values }) {
            try {
                const data = await fetchGraph(REGISTER, values);
                localStorage.setItem('token', data.register);
                toast.success('User has been created!');
                history.push('/home');
            } catch (err) {
                toast.error(printError(err.message));
            }
        },
    });

    const comparePassword = formik.values.confirm_password
        ? displayError('confirm_password', formik) ||
          (formik.values.password !== formik.values.confirm_password && {
              content: "Passwords don't match",
          })
        : undefined;

    return (
        <LandingPage title='UwU Registration Page'>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Field required>
                    <label htmlFor='email'>Username</label>
                    <Form.Input
                        name='username'
                        placeholder='Username'
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                </Form.Field>
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
                <Form.Field required>
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
                <div>
                    <Button
                        color='teal'
                        type='submit'
                        disabled={!formik.dirty || !formik.isValid}
                        loading={formik.isSubmitting}
                    >
                        <Icon name='sign-in' />
                        Register
                    </Button>
                    <Button color='teal' as={Link} to='/' basic>
                        Back to login
                    </Button>
                </div>
            </Form>
        </LandingPage>
    );
};
