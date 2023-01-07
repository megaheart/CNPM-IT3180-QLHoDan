//hooks
import { useCallback, useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
//material-ui
import { Button, CircularProgress, FormHelperText, InputLabel, InputAdornment, IconButton, Input, FormControl } from '@mui/material'
//icons
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

//validation
import validation from '~/services/validate';

//api
import { AuthContext } from '../../../components/AuthenProvider'
import accountApi from '../../../services/api/accountApi'
//sass
import styles from './Login.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles);

export default function Login({ act }) {
    //auth context
    const { setAuth } = useContext(AuthContext);
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
                setPasswordError('');
                const user = await accountApi.checkLogin({ username });
                console.log(user)
                if (user.length === 0) {
                    setStart(true);
                    setErrMsg('Tài khoản không tồn tại');
                    userRef.current.focus();
                }
                else if (user[0].password !== password) {
                    setStart(true);
                    setErrMsg('Mật khẩu không đúng');
                    userRef.current.focus();
                }
                else {
                    setAuth(user[0]);
                    navigate('/profile');
                }
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
            errRef.current.focus();
        }
        setLoading(false);
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
                    <span className={cx('btn-text')}>Quên mật khẩu?</span>
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
                <p style={{ fontSize: 18 }}>Chưa có tài khoản? <span onClick={() => act('2')} className={cx('signup-btn')}>Đăng ký</span></p>
                <div>
                    <span></span>
                </div>
            </div>

        </div>
    )
}