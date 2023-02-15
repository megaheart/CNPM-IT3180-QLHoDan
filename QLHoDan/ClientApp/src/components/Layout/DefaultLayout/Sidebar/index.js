import styles from './Sidebar.module.scss';
import { useState, useContext, useCallback, useMemo } from 'react';
//icon
//authentication
import authenticationService from '~/services/account/authentication';
// import MenuIcon from '@mui/icons-material/Menu';
import { PushPinOutlined } from '@mui/icons-material'
import { navForResident, navForAdmin, navForEmplyee } from './ButtonNav';
import classNames from 'classnames/bind';
import { NavLink } from "react-router-dom";
import CollapseButton from './Collapse';
import { TitleContext } from '../';
import { AuthContext } from '~/components/AuthenProvider';
const cx = classNames.bind(styles);

function Sidebar() {
    //authenticate management
    const changer = useContext(TitleContext);
    const { auth, setAuth } = useContext(AuthContext);
    const handleAuth = () => {
        authenticationService.logOut();
        setAuth({})
    }
    const buttons = useMemo(
        () => {
            if (auth.role === "Household") {
                return navForResident;
            }
            else if (auth.role === "Accountant" || auth.role === "ScopeLeader") {
                return navForEmplyee;
            }
            else {
                return navForAdmin;
            }
        }, [auth.role]
    )
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
                <span ><PushPinOutlined className={cx('icon-collapse')} /></span>
                <span className={open ? cx('normal-btn') : cx('hide-btn')} >{open && 'Ghim'}</span>
            </NavLink>
            <hr />
            {buttons.map((button) => {
                if (!button.hasOwnProperty('collapse')) {
                    if (button.isLogout) {
                        return (
                            <NavLink key={button.id} onClick={handleAuth} className={cx('btn-side')} to={button.link} >
                                <span className={cx('icon-text')} key={button.id + 'span1'} >{button.icon}</span>
                                <span key={button.id + 'span2'} className={open ? cx('normal-btn') : cx('hide-btn')}>{open && button.title}</span>
                            </NavLink>
                        )
                    }
                    return (
                        <NavLink key={button.id} className={({ isActive }) => {
                            if (isActive) {
                                setTimeout(() => changer(button.title), 100);
                                return cx('btn-side-active');
                            }
                            else {
                                return cx('btn-side');
                            }
                        }} to={button.link}  >
                            <span className={cx('icon-text')} key={button.id + 'span1'} >{button.icon}</span>
                            <span key={button.id + 'span2'} className={open ? cx('normal-btn') : cx('hide-btn')}>{open && button.title}</span>
                        </NavLink>
                    )
                }
                else {
                    return (
                        <CollapseButton key={button.id} buttonObject={button} isOpen={open} />
                    )
                }
            })
            }
        </ div>
    )
}
export default Sidebar;