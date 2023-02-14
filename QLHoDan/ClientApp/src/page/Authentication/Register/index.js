import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuth from "~/hooks/useAuth";
//router
import { Link } from 'react-router-dom';
//material-ui
import { Button, FormControl, IconButton, CircularProgress, InputLabel, InputAdornment, Input, FormHelperText } from '@mui/material';
//icons
import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import validation from '~/services/validate';
//style
import styles from './Register.module.scss';
import classNames from 'classnames/bind';
//call api
import householdAccountManager from '~/services/api/householdApi';

const cx = classNames.bind(styles)


export default function Signup() {
    //use to navigate
    const navigate = useNavigate();

    //loading update
    const [loading, setLoading] = useState(false);

    //auth context
    const { auth } = useAuth();

    //user state to register
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    //use to validate input
    const [userError, setUserError] = useState('');
    const [passError, setPassError] = useState('');
    const [confPassError, setConfPassError] = useState('');

    //status of register
    const [status, setStatus] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (auth.role) {
            navigate('/dashboard');
        }
    }, [])

    //handle register
    const handleRegister = async () => {
        setLoading(true);
        try {
            const userValidation = validation.checkUsername(username);
            const passValidation = validation.checkPassword(password);
            if (!userValidation.isValid || !passValidation.isValid) {
                setUserError(userValidation.message);
                setPassError(passValidation.message);
            }
            else if (password !== confPassword) {
                setUserError('');
                setConfPassError('Password and confirm password must be the same');
                setPassError('Password and confirm password must be the same');
            }
            else {
                setUserError('');
                setPassError('');
                setConfPassError('');
                const data = {
                    userName: username,
                    password: password,
                    role: 4,
                    fullName: 'Người dùng mới',
                    scope: 0,
                    note: 'Chưa có'

                }
                const res = await householdAccountManager.registerAccountResident(data);
                if (res.status === 200) {
                    setMsg('Đăng ký thành công');
                    const a = setTimeout(() => {
                        setMsg('');
                    }, 3000);
                }
                else {
                    console.log(res);
                }

            }

        }
        catch (err) {
            if (!err?.response) {
                setMsg('Something went wrong');
            }
            else {
                setMsg(err.response.data.message);
            }
        }
        setLoading(false);
    }

    //handle password visibility
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    //handle password visibility
    const [showComfPassword, setShowComfPassword] = useState(false);
    const handleClickShowComfPassword = () => setShowComfPassword((show) => !show);
    const handleMouseDownComfPassword = (event) => {
        event.preventDefault();
    };

    //render
    return (
        <div className={cx('login')}>
            <div className={cx('login-form')}>
                <div className={cx('login-form__input')}>
                    <FormControl error={userError.length > 0} sx={{ margin: '10px 0' }} className={cx('input-login')} variant="standard">
                        <InputLabel sx={{ fontSize: 20 }} htmlFor="input_regis_account">
                            Tên đăng nhập
                        </InputLabel>
                        <Input
                            sx={{ fontSize: 20 }}
                            id="input_regis_account"
                            startAdornment={
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            }
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            autoComplete="off"
                        />
                        {(userError.length > 0) && <FormHelperText sx={{ fontSize: 10, color: 'red' }}>{userError}</FormHelperText>}
                    </FormControl>
                    <FormControl error={passError.length > 0} sx={{ margin: '10px 0' }} variant="standard">
                        <InputLabel sx={{ fontSize: 20 }} htmlFor="input_regis_password">
                            Mật khẩu
                        </InputLabel>
                        <Input
                            sx={{ fontSize: 20 }}
                            id="input_regis_password"
                            startAdornment={
                                <InputAdornment position="start">
                                    <VpnKeyIcon />
                                </InputAdornment>
                            }
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
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="off"
                        />
                        {(passError.length > 0) && <FormHelperText sx={{ fontSize: 10, color: 'red' }}>{passError}</FormHelperText>}
                    </FormControl>
                    <FormControl error={confPassError.length > 0} sx={{ margin: '10px 0' }} variant="standard">
                        <InputLabel sx={{ fontSize: 20 }} htmlFor="input_regis_conf_password">
                            Xác nhận mật khẩu
                        </InputLabel>
                        <Input
                            sx={{ fontSize: 20 }}
                            id="input_regis_conf_password"
                            startAdornment={
                                <InputAdornment position="start">
                                    <VpnKeyIcon />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowComfPassword}
                                        onMouseDown={handleMouseDownComfPassword}
                                        edge="end"
                                    >
                                        {showComfPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            type={showComfPassword ? 'text' : 'password'}
                            value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                            autoComplete="off"
                        />
                        {(confPassError.length > 0) && <FormHelperText sx={{ fontSize: 10, color: 'red' }}>{confPassError}</FormHelperText>}
                    </FormControl>
                </div>

                <Button sx={{ fontSize: 16, padding: "8px 18px " }} variant="contained" color="primary" onClick={handleRegister} >
                    Đăng ký
                </Button>
                {loading && <CircularProgress sx={{
                    marginTop: 1,
                    animationDuration: '550ms',
                }}
                    size={20}
                    thickness={4} />}
                {(msg.length > 0) && <p style={{ marginTop: 10, color: 'red' }}>{msg}</p>}
                <hr className={cx('hr-login')} />
                <p style={{ fontSize: 18 }}>Đã có tài khoản? <Link to='/login'> <span className={cx('signin-btn')}>Đăng nhập</span></Link> </p>
            </div>
        </div>
    )
}