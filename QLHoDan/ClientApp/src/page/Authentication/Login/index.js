//hooks
import { useCallback, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from "~/hooks/useAuth";
//material-ui
import { Button, CircularProgress, FormHelperText, InputLabel, InputAdornment, IconButton, Input, FormControl } from '@mui/material';
//router
import { Link } from 'react-router-dom'
//icons
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

//validation
import validation from '~/services/validate';

// //api
// import Reaptcha from 'reaptcha';
import accountApi from '~/services/api/accountApi';
import authenticationService from '~/services/account/authentication';
//sass
import styles from './Login.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles);
//const REACT_APP_SITE_KEY = "6LcpTdwjAAAAAAKuHebI2kb4q1i2wXcDur3aL8kK"

export default function Login() {
    //auth context
    const { setAuth } = useAuth();
    //user state
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    //state of input
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    //ref
    const userRef = useRef();
    const passRef = useRef();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    const [start, setStart] = useState(false);
    const navigate = useNavigate();
    //capcha
    //capcha
    // const [captchaToken, setCaptchaToken] = useState('');
    // const verify = async () => {
    //     const res = await captchaRef.current.getResponse();
    //     setCaptchaToken(res);
    // }
    // const captchaRef = useRef(null)
    //handle loading
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        userRef.current.focus();
    }, [])
    useEffect(() => {
        setErrMsg('');
    }, [username, password])
    //effect
    //handle login
    const handleSubmit = async (e) => {
        // e.preventDefault();
        setLoading(true);
        setStart(false);
        try {
            const checkUser = validation.checkUsername(username);
            const checkPass = validation.checkPassword(password);
            console.log(checkUser, checkPass)
            if (!checkUser.isValid) {
                setUsernameError(checkUser.message);
                userRef.current.focus();
                setStart(true);
            }
            else if (!checkPass.isValid) {
                setUsernameError('');
                setPasswordError(checkPass.message);
                passRef.current.focus();
                setStart(true);
            }
            else {
                setUsernameError('');
                setPasswordError('');
                console.log(username, password)
                authenticationService.signIn(username, password).then(() => {
                    console.log(1);
                    if (authenticationService.isAuthenticated()) {
                        const userData = authenticationService.User;
                        console.log(userData);
                        setAuth(userData);
                    }
                    //setAuth(userData);
                    navigate('/dashboard');
                }).catch(
                    (e) => {
                        console.log('ERROR')
                        console.log(e)
                    }
                ).finally(
                    () => {
                        setLoading(false);
                    }
                );
                //if (user.length === 0) {
                //    setStart(true);
                //    setErrMsg('Tài khoản không tồn tại');
                //    userRef.current.focus();
                //}
                //else if (user[0].password !== password) {
                //    setStart(true);
                //    setErrMsg('Mật khẩu không đúng');
                //    userRef.current.focus();
                //}
                //else if (captchaToken === '' || captchaToken === null) {
                //    setStart(true);
                //    setErrMsg('Vui lòng xác nhận bạn không phải là robot');
                //}
                //else {
                //    setAuth(user[0]);
                //    navigate('/profile');
                //}

            }
        }
        catch (err) {
            if (!err?.response) {
                setErrMsg('Server is not available');
            }
            else if (err?.reponse?.status === 400) {
                setErrMsg('Missing username or password');
            }
            else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            }
            else {
                setErrMsg('Something went wrong');
            }
        }
    }

    const handleForgetPassword = () => {
        navigate('/forgetpassword');
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    }

    const handleValueInput = (e) => {
        if (e.target.id === 'input_login_account') {
            setUserName(e.target.value);
        }
        else if (e.target.id === 'input_login_password') {
            setPassword(e.target.value);
        }

    }

    //handle password visibility
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = useCallback(() => setShowPassword((show) => !show), []);
    const handleMouseDownPassword = useCallback((event) => {
        event.preventDefault();
    }, [])

    //render
    return (
        <div className={cx('login')}>
            <div className={cx('login-form')}>
                <div className={cx('login-form__input')} >
                    <FormControl sx={{ margin: '10px 0' }} className={cx('input-login')} variant="standard">
                        <InputLabel sx={{ fontSize: 20 }} htmlFor="input_login_account">
                            Tên đăng nhập
                        </InputLabel>
                        <Input
                            inputRef={userRef}
                            sx={{ fontSize: 20 }}
                            id="input_login_account"
                            startAdornment={
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            }
                            value={username || ''}
                            onChange={handleValueInput}
                            onKeyDown={handleKeyDown}
                            required
                        />
                        {start && <FormHelperText sx={{ fontSize: 10, color: 'red' }}>{usernameError}</FormHelperText>}
                    </FormControl>
                    <FormControl sx={{ margin: '10px 0' }} variant="standard">
                        <InputLabel sx={{ fontSize: 20 }} htmlFor="input_login_password">
                            Mật khẩu
                        </InputLabel>
                        <Input
                            inputRef={passRef}
                            sx={{ fontSize: 20 }}
                            id="input_login_password"
                            type={showPassword ? 'text' : 'password'}
                            startAdornment={
                                <InputAdornment position="start">
                                    <VpnKeyIcon />
                                </InputAdornment>
                            }
                            value={password || ''}
                            onChange={handleValueInput}
                            onKeyDown={handleKeyDown}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            required
                        />
                        {start && <FormHelperText sx={{ fontSize: 10, color: 'red' }}>{passwordError}</FormHelperText>}
                    </FormControl>
                    <span onClick={handleForgetPassword} className={cx('btn-text')}>Quên mật khẩu?</span>
                    {/* {<div style={{ margin: '0 auto' }}>
                        <Reaptcha sitekey={REACT_APP_SITE_KEY} onVerify={verify} ref={captchaRef} />
                    </div> || <CircularProgress
                            sx={{
                                marginTop: 1,
                                animationDuration: '550ms',
                            }}
                            size={20}
                            thickness={4} />} */}
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={(usernameError.isValid && passwordError.isValid) ? true : false}
                    onClick={handleSubmit} sx={{ fontSize: 16, padding: "8px 18px " }} >
                    Đăng nhập
                </Button>
                {loading &&
                    <CircularProgress
                        sx={{
                            marginTop: 1,
                            animationDuration: '550ms',
                        }}
                        size={20}
                        thickness={4} />}
                {start && <p ref={errRef} style={{ marginTop: 10, color: 'red' }}>{errMsg}</p>}
                <hr className={cx('hr-login')} />
                <p style={{ fontSize: 18 }}>Chưa có tài khoản? <Link to='/register'><span className={cx('signup-btn')}>Đăng ký</span></Link></p>
                <div>
                    <span></span>
                </div>
            </div>

        </div>
    )
}