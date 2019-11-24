import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { Form, Input, Icon, Button, Spin } from 'antd';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
// import FacebookButton from '../../components/TwitterButton';
import GoogleButton from '../../components/GoogleButton';

import { withFirebase } from '../Firebase/index';

import './signIn.css';
import * as ROUTES from '../../constants/routes';

class SignInForm extends React.Component {
  state = {
    error: {},
    loading: false,
  };

  handleSubmit = e => {
    const { firebase, history } = this.props;
    const {
      form: { validateFields },
    } = this.props;
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        firebase
          .doSignInWithEmailAndPassword(values.email, values.password)
          .then(res => {
            localStorage.setItem('userId', res.user.uid);
            this.setState({ loading: false });
            history.push(ROUTES.HOME);
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
      }
    });
  };

  render() {
    const { error, loading } = this.state;
    const {
      form: { getFieldDecorator },
      history: { goBack },
    } = this.props;
    if (localStorage.getItem('userId')) {
      return <Redirect to={ROUTES.HOME} />;
    }
    return (
      <div className="signin">
        <Header text="Sign In" handleBack={goBack} />

        <section className="signin__form">
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'This field is required',
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="mail" className="signin__icon" />}
                  placeholder="Email"
                />
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'This field is required',
                  },
                ],
              })(
                <Input.Password
                  prefix={<Icon type="lock" className="signin__icon" />}
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button className="signin__btn" type="primary" htmlType="submit">
                {loading ? <Spin /> : 'Sign In'}
              </Button>
            </Form.Item>
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
          </Form>
        </section>
        <Link to={ROUTES.FORGOT_PASSWORD}>
          <p className="forgot-password__link link">Forgot Password?</p>
        </Link>

        <p className="landing__aboutLink">
          Don’t have an account ?
          <Link to={ROUTES.SIGN_UP}>
            <span className="landing__logo link"> Sign Up</span>
          </Link>
        </p>

        <section className="signin__or">OR</section>

        <section className="signin__buttons">
          {/* <FacebookButton /> */}
          <GoogleButton />
        </section>
      </div>
    );
  }
}

const SignIn = Form.create({ name: 'sign in' })(SignInForm);

const signINForm = withFirebase(SignIn);

SignInForm.propTypes = {
  form: PropTypes.shape({
    validateFields: PropTypes.func.isRequired,
    getFieldValue: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  firebase: PropTypes.shape({
    doSignInWithEmailAndPassword: PropTypes.func.isRequired,
  }).isRequired,
};

export default signINForm;
