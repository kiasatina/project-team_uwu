import React from 'react';
import { Form } from 'semantic-ui-react';
import './index.scss';

export default () => {
    return (
        <main className='landing'>
            <Form className='landing__form'>
                <Form.Field>
                    <label htmlFor='email'>Email Address</label>
                    <input name='email' placeholder='Email Address'/>
                </Form.Field>
                <Form.Field>
                    <label htmlFor='password'>Password</label>
                    <input name='password' placeholder='Password'/>
                </Form.Field>
            </Form>
        </main>
    );
};
