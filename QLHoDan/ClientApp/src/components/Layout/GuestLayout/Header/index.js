import { Button } from '@mui/material';

import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { NavLink } from "react-router-dom";



const cx = classNames.bind(styles);


function Header() {
    return (
        <header className={cx('header-guest')} >
            <div className={cx('actions')} >
                <Button variant="contained" ><NavLink to='/login' className={cx('btn-contained')}><span >Đăng nhập</span></NavLink></Button>
                <Button variant="outlined" ><NavLink to='/register' className={cx('btn-outlined')}><span>Đăng ký</span></NavLink></Button>
            </div>
        </ header>
    )
}

export default Header;