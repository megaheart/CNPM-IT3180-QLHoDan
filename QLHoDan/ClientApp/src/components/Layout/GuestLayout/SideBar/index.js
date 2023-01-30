import { useState, useCallback } from 'react';
import { PushPinOutlined } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
const cx = classNames.bind(styles);

function SideBar() {
    //pin sidebar
    const [open, setOpen] = useState(true);
    const [pin, setPin] = useState(true);
    const toggle = () => {
        setTimeout(() => {
            setOpen(!open);
        }, 100)
    }
    const pinToggle = () => {
        setPin(!pin);
    }
    //function do nothing
    const fixedFunc = useCallback(() => { }, []);
    return (
        <div className={cx('side-bar')} onMouseOver={(pin === true) ? fixedFunc : (open === false) ? toggle : fixedFunc} onMouseLeave={(pin === true) ? fixedFunc : (open === true) ? toggle : fixedFunc
        } >
            <NavLink className={cx('btn-menu')} onClick={pinToggle} >
                <span><PushPinOutlined /></span>
                <span className={open ? cx('normal-btn') : cx('hide-btn')} >{open && 'Ghim'}</span>
            </NavLink>
            <hr />
            <NavLink className={({ isActive }) => {
                if (isActive) {
                    return cx('btn-side-active');
                }
                else {
                    return cx('btn-side');
                }
            }} to='/'  >
                <span><DashboardIcon /></span>
                <span className={open ? cx('normal-btn') : cx('hide-btn')}>{open && 'Trang chủ'}</span>
            </NavLink>
            <NavLink className={({ isActive }) => {
                if (isActive) {
                    return cx('btn-side-active');
                }
                else {
                    return cx('btn-side');
                }
            }} to='/guest/them_ho_khau'  >
                <span  ><AddBoxIcon /></span>
                <span className={open ? cx('normal-btn') : cx('hide-btn')}>{open && 'Thêm hộ khẩu'}</span>
            </NavLink>
            <NavLink className={({ isActive }) => {
                if (isActive) {
                    return cx('btn-side-active');
                }
                else {
                    return cx('btn-side');
                }
            }} to='/guest/them_nhan_khau'  >
                <span  ><AddBoxIcon /></span>
                <span className={open ? cx('normal-btn') : cx('hide-btn')}>{open && 'Thêm nhân khẩu'}</span>
            </NavLink>
        </ div>
    )
}

export default SideBar;