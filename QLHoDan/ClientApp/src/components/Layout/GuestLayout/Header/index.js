import { useState, useContext, useCallback } from 'react';
import { Button } from '@mui/material';

import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { NavLink, useNavigate } from "react-router-dom";



const cx = classNames.bind(styles);


function Header() {
    const navigate = useNavigate();
    const handleLogin = useCallback(() => {
        navigate('/authenticate');
    }, [])
    return (
        <header className={cx('header-guest')} >
            <div className={cx('actions')} >
                <Button variant="contained" onClick={handleLogin}><span className={cx('btn-contained')}>Đăng nhập</span></Button>
                <Button variant="outlined"  ><span className={cx('btn-outlined')}>Đăng ký</span></Button>
            </div>
        </ header>
    )
}

export default Header;