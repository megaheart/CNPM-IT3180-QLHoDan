import { useState } from 'react';
import { Button, Backdrop, Snackbar, Alert, CircularProgress } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { ChangeCircleOutlined } from '@mui/icons-material';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';


import classNames from 'classnames/bind';
import styles from './AccountSetting.module.scss';
const cx = classNames.bind(styles);


export default function AccountSetting() {
    const [isChange, setIsChange] = useState(true);
    const changeState = () => {
        setIsChange(!isChange);
    }

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState(false);
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSuccess(false);
    };

    const handleUpdate = () => {
        setLoading(true);
        setIsChange(!isChange);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 2000);
    }

    return (
        <div className={cx('account-setting')}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    Cập nhật thông tin thành công!
                </Alert>
            </Snackbar>
            <div className={cx('account-info')}>
                <Button onClick={changeState} sx={{ position: 'absolute', top: -30, right: -20, color: '#000' }}>Thay đổi thông tin <ChangeCircleOutlined /></Button>
                <FormControl sx={{ width: '30%' }} variant="standard">
                    <InputLabel sx={{ fontSize: 20 }} htmlFor="component-simple1">First name</InputLabel>
                    <Input sx={{ fontSize: 15 }}
                        id="component-simple1"
                        defaultValue="Bùi Trọng"
                        readOnly={isChange}
                    />
                </FormControl>
                <FormControl sx={{ width: '30%' }} variant="standard">
                    <InputLabel sx={{ fontSize: 20 }} >Họ </InputLabel>
                    <Input readOnly={isChange} sx={{ fontSize: 15 }} defaultValue="Đức" />
                </FormControl>
                <FormControl sx={{ width: '30%' }} variant="standard">
                    <InputLabel sx={{ fontSize: 20 }} >Số điện thoại</InputLabel>
                    <Input readOnly={isChange} sx={{ fontSize: 15 }} defaultValue="3243243423" />
                </FormControl>
                <FormControl sx={{ width: '30%' }} variant="standard">
                    <InputLabel sx={{ fontSize: 20 }} >Email</InputLabel>
                    <Input readOnly={isChange} sx={{ fontSize: 15 }} defaultValue="helloworld123@gmail.com" />
                </FormControl>
                <FormControl sx={{ width: '30%' }} variant="standard">
                    <InputLabel sx={{ fontSize: 20 }} >Thành phố</InputLabel>
                    <Input readOnly={isChange} sx={{ fontSize: 15 }} defaultValue="Hà Nội" />
                </FormControl>
                <FormControl sx={{ width: '30%' }} variant="standard">
                    <InputLabel sx={{ fontSize: 20 }} >Quốc gia</InputLabel>
                    <Input readOnly={isChange} sx={{ fontSize: 15 }} defaultValue="Việt Nam" />
                </FormControl>
                <FormControl sx={{ width: '30%' }} variant="standard">
                    <InputLabel sx={{ fontSize: 20 }} >Địa chỉ</InputLabel>
                    <Input readOnly={isChange} sx={{ fontSize: 15 }} defaultValue="Việt Nam" />
                </FormControl>
                <FormControl sx={{ width: '30%' }} variant="standard">
                    <InputLabel sx={{ fontSize: 20 }} >Nghề nghiệp</InputLabel>
                    <Input readOnly={isChange} sx={{ fontSize: 15 }} defaultValue="Remote" />
                </FormControl>
            </div>
            <Button color='primary' variant="contained" sx={{ marginTop: 20, fontSize: 15, zIndex: 1 }} disabled={isChange} onClick={handleUpdate}>Cập nhật</Button>
        </div>
    )
}