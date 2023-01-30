import styles from './ProfileUser.module.scss';
import classNames from 'classnames/bind';

import { CircularProgress, TextField, Backdrop, Snackbar, Alert } from '@mui/material';

import accountApi from '~/services/api/accountApi';
import { AuthContext } from '~/components/AuthenProvider'
import { useState, useContext } from 'react';

const cx = classNames.bind(styles);

export default function User() {

    const { auth, setAuth } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorMessageCurrentPassword, setErrorMessageCurrentPassword] = useState('');
    const [errorCur, setErrorCur] = useState(false);
    const [errorMessageNewPassword, setErrorMessageNewPassword] = useState('');
    const [errorNew, setErrorNew] = useState(false);

    const [success, setSuccess] = useState(false);
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSuccess(false);
    };

    const handleUpdate = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (currentPassword === '') {
            setErrorMessageCurrentPassword('Vui lòng nhập mật khẩu hiện tại');
            setErrorCur(true);
        }
        else if (currentPassword !== auth.password) {
            setErrorMessageCurrentPassword('Mật khẩu không đúng');
            setErrorCur(true);
        }
        if (newPassword === '') {
            setErrorMessageNewPassword('Vui lòng nhập mật khẩu mới');
            setErrorNew(true);
        }
        else if (confirmPassword === '') {
            setErrorMessageNewPassword('Vui lòng nhập lại mật khẩu mới');
            setErrorNew(true);
        }
        else if (newPassword !== confirmPassword) {
            setErrorMessageNewPassword('Mật khẩu không khớp');
            setErrorNew(true);
        }

        if (currentPassword === auth.password && newPassword === confirmPassword) {
            setAuth({ ...auth, password: newPassword });
            // call api to change passwrod, waiting....
            await accountApi.changePassword(
                auth.id,
                newPassword,
                auth
            );
            //finish
            setSuccess(true);
            setErrorCur(false);
            setErrorNew(false);
            setErrorMessageCurrentPassword('');
            setErrorMessageNewPassword('');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
        setLoading(false);
    }

    const handleChangeInputCur = (e) => {
        setCurrentPassword(e.target.value);
        setErrorCur(false);
    }

    const handleChangeInputNew = (e) => {
        setNewPassword(e.target.value);
        setErrorNew(false);
    }

    const handleChangeInputConfirm = (e) => {
        setConfirmPassword(e.target.value);
        setErrorNew(false);
    }

    return (
        <div className={cx('profile-setting')}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    Đổi mật khẩu thành công!
                </Alert>
            </Snackbar>
            <div className={cx('profile-info')}>
                <TextField
                    value={currentPassword}
                    onChange={handleChangeInputCur}
                    sx={{ fontSize: 20, width: 200 }}
                    label="Mật khẩu hiện tại"
                    inputProps={{ style: { fontSize: 15 } }}
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    helperText={errorCur && errorMessageCurrentPassword}
                    error={errorCur}
                    variant="standard"
                />
                <TextField
                    sx={{ fontSize: 20, width: 200 }}
                    label="Mật khẩu mới"
                    inputProps={{ style: { fontSize: 15 } }}
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    helperText={errorNew && errorMessageNewPassword}
                    variant="standard"
                    error={errorNew}
                    value={newPassword}
                    onChange={handleChangeInputNew}
                />
                <TextField
                    sx={{ fontSize: 20, width: 200 }}
                    label="Xác nhận "
                    inputProps={{ style: { fontSize: 15 } }}
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    helperText={errorNew && errorMessageNewPassword}
                    variant="standard"
                    error={errorNew}
                    value={confirmPassword}
                    onChange={handleChangeInputConfirm}
                />

            </div>
            <div>
                <button
                    className={cx('btn-update')}
                    onClick={handleUpdate}>
                    Cập nhật
                </button>
            </div>
        </div>
    )
}