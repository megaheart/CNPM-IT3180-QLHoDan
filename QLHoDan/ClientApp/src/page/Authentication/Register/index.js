import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react'
//router
import { Link } from 'react-router-dom'
//material-ui
import { Button, FormControl, CircularProgress, InputLabel, InputAdornment, Input, FormHelperText } from '@mui/material'
//icons
import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
//api
import accountApi from '../../../services/api/accountApi'
import validation from '~/services/validate';
//context 
import { AuthContext } from '~/components/AuthenProvider'
//style
import styles from './Register.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)


export default function Signup() {
    //use to navigate
    const navigate = useNavigate();

    //loading update
    const [loading, setLoading] = useState(false);

    //auth context
    const { setAuth } = useContext(AuthContext);

    //user state to register
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    //use to validate input
    const [userError, setUserError] = useState();
    const [passError, setPassError] = useState();
    const [confPassError, setConfPassError] = useState();

    //status of register
    const [status, setStatus] = useState(false);
    const [msg, setMsg] = useState('');

    //handle register
    const handleRegister = async () => {
        setLoading(true);
        setStatus(false);
        try {
            const userValidation = validation.checkUsername(username);
            const passValidation = validation.checkPassword(password);
            console.log(userValidation, passValidation)
            if (!userValidation.isValid) {
                setUserError(userValidation.message);
                setStatus(true);
            }
            else if (!passValidation.isValid) {
                setUserError('');
                setPassError(passValidation.message);
                setStatus(true);
            }
            else if (password !== confPassword) {
                setPassError('');
                setConfPassError('Password and confirm password must be the same');
                setStatus(true);
            }
            else {
                setConfPassError('');
                const account = await accountApi.checkLogin({ username: username });
                console.log(account)
                if (account.length > 0) {
                    setMsg('Username already exists');
                    setStatus(true);
                }
                else {
                    const data = {
                        username: username,
                        password: password
                    }
                    setAuth(data);
                    await accountApi.addAccount(data);
                    setTimeout(() => navigate('/profile'), 100);
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

    //render
    return (
        <div className={cx('login')}>
            <div className={cx('login-form')}>
                <div className={cx('login-form__input')}>
                    <FormControl sx={{ margin: '10px 0' }} className={cx('input-login')} variant="standard">
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
                        {status && <FormHelperText sx={{ fontSize: 10, color: 'red' }}>{userError}</FormHelperText>}
                    </FormControl>
                    <FormControl sx={{ margin: '10px 0' }} variant="standard">
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
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="off"
                        />
                        {status && <FormHelperText sx={{ fontSize: 10, color: 'red' }}>{passError}</FormHelperText>}
                    </FormControl>
                    <FormControl sx={{ margin: '10px 0' }} variant="standard">
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
                            type="password"
                            value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                            autoComplete="off"
                        />
                        {status && <FormHelperText sx={{ fontSize: 10, color: 'red' }}>{confPassError}</FormHelperText>}
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
                {status && <p style={{ marginTop: 10, color: 'red' }}>{msg}</p>}
                <hr className={cx('hr-login')} />
                <p style={{ fontSize: 18 }}>Đã có tài khoản? <Link to='/login'> <span className={cx('signin-btn')}>Đăng nhập</span></Link> </p>
            </div>
        </div>
    )
}