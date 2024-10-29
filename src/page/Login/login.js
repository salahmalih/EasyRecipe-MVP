import React, { useState } from "react";
import axios from "axios";
import * as component from './login_comp';
import styles from './Login.module.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
    const [signIn, toggle] = useState(true);
    const [showSignUpPassword, setShowSignUpPassword] = useState(false);
    const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(false);
    const [showSignInPassword, setShowSignInPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [signUpData, setSignUpData] = useState({
        fullname: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [signInData, setSignInData] = useState({
        username: '',
        password: ''
    });

    const handleSignUpChange = (e) => {
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSignInChange = (e) => {
        setSignInData({ ...signInData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validateUsername = (username) => {
        const regex = /^[a-zA-Z0-9_]+$/;
        return regex.test(username);
    };

    const validatePassword = (password) => {
        const regex = /^[a-zA-Z0-9_.]+$/;
        return regex.test(password);
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (signUpData.password !== signUpData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        if (!validateUsername(signUpData.username)) {
            newErrors.username = "Username should not contain spaces or special characters except '_'";
        }
        if (!validatePassword(signUpData.password)) {
            newErrors.password = "Password should not contain spaces or special characters except '.' and '_'";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/register', signUpData);
            window.location.reload();
        } catch (error) {
            console.log(error); // Log the error to debug
            newErrors.apiErrorSig = error.response ? error.response.data.error : 'An error occurred. Please try again.';
            setErrors(newErrors);
        }
        finally {
            setLoading(false);
        }
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
    
        if (!validateUsername(signInData.username)) {
            newErrors.username = "Username should not contain spaces or special characters except '_'";
        }
        if (!validatePassword(signInData.password)) {
            newErrors.password = "Password should not contain spaces or special characters except '.' and '_'";
        }
    
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/login', signInData, {
                withCredentials: true, // Ensure cookies are included with the request
            });
            navigate('/');
        } catch (error) {
            console.log(error); // Log the error to debug
            newErrors.apiError = error.response ? error.response.data.error : 'An error occurred. Please try again.';
            setErrors(newErrors);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className={styles.loginPage}>
            <div className={styles.loginContainer}>
                <component.SignUpContainer signinIn={signIn}>
                    <component.Form onSubmit={handleSignUpSubmit}>
                        <component.Title>Create Account</component.Title>
                        <component.Input
                            type='text'
                            name='fullname'
                            placeholder='Full Name'
                            required
                            onChange={handleSignUpChange}
                        />
                        <component.Input
                            type='email'
                            name='email'
                            placeholder='Email'
                            required
                            onChange={handleSignUpChange}
                        />
                        <component.Input
                            type='text'
                            name='username'
                            placeholder='Username'
                            required
                            onChange={handleSignUpChange}
                        />
                        {errors.username && <div className={styles.error}>{errors.username}</div>}
                        <component.PasswordInputContainer>
                            <component.Input
                                type={showSignUpPassword ? 'text' : 'password'}
                                name='password'
                                placeholder='Password'
                                required
                                onChange={handleSignUpChange}
                            />
                            <component.PasswordToggle
                                onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                                type="button"
                            >
                                {showSignUpPassword ? <VisibilityOff /> : <Visibility />}
                            </component.PasswordToggle>
                        </component.PasswordInputContainer>
                        {errors.password && <div className={styles.error}>{errors.password}</div>}
                        <component.PasswordInputContainer>
                            <component.Input
                                type={showSignUpConfirmPassword ? 'text' : 'password'}
                                name='confirmPassword'
                                placeholder='Confirm Password'
                                required
                                onChange={handleSignUpChange}
                            />
                            <component.PasswordToggle
                                onClick={() => setShowSignUpConfirmPassword(!showSignUpConfirmPassword)}
                                type="button"
                            >
                                {showSignUpConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </component.PasswordToggle>
                        </component.PasswordInputContainer>
                        {errors.confirmPassword && <div className={styles.error}>{errors.confirmPassword}</div>}
                        {errors.apiErrorSig && <div style={{ color: 'red', fontSize: '18px', marginTop: '10px' }}>{errors.apiErrorSig}</div>}
                        <component.Button type="submit" disabled={loading}>
                            {loading ? 'Sign Up ...' : 'Sign Up'}
                        </component.Button>
                        </component.Form>
                </component.SignUpContainer>

                <component.SignInContainer signinIn={signIn}>
                    <component.Form onSubmit={handleSignInSubmit}>
                        <component.Title>Sign in</component.Title>
                        <component.Input
                            type='text'
                            name='username'
                            placeholder='User Name'
                            required
                            onChange={handleSignInChange}
                        />
                        {errors.username && <div className={styles.error}>{errors.username}</div>}
                        <component.PasswordInputContainer>
                            <component.Input
                                type={showSignInPassword ? 'text' : 'password'}
                                name='password'
                                placeholder='Password'
                                required
                                onChange={handleSignInChange}
                            />
                            <component.PasswordToggle
                                onClick={() => setShowSignInPassword(!showSignInPassword)}
                                type="button"
                            >
                                {showSignInPassword ? <VisibilityOff /> : <Visibility />}
                            </component.PasswordToggle>
                        </component.PasswordInputContainer>
                        {errors.password && <div className={styles.error}>{errors.password}</div>}
                        {errors.apiError && <div style={{ color: 'red', fontSize: '18px', marginTop: '10px' }}>{errors.apiError}</div>}
                        <component.Anchor href='#'>Forgot your password?</component.Anchor>
                        <component.Button type="submit" disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </component.Button>
                    </component.Form>
                </component.SignInContainer>

                <component.OverlayContainer signinIn={signIn}>
                    <component.Overlay signinIn={signIn}>
                        <component.LeftOverlayPanel signinIn={signIn}>
                            <component.Title>Welcome Back!</component.Title>
                            <component.Paragraph>
                                To keep connected with us please login with your personal info
                            </component.Paragraph>
                            <component.GhostButton onClick={() => toggle(true)}>
                                Sign In
                            </component.GhostButton>
                        </component.LeftOverlayPanel>

                        <component.RightOverlayPanel signinIn={signIn}>
                            <component.Title>Hello, Friend!</component.Title>
                            <component.Paragraph>
                                Enter your personal details and start your journey with us
                            </component.Paragraph>
                            <component.GhostButton onClick={() => toggle(false)}>
                                Sign Up
                            </component.GhostButton>
                        </component.RightOverlayPanel>
                    </component.Overlay>
                </component.OverlayContainer>
            </div>
        </div>
    );
}

export default AuthForm;
