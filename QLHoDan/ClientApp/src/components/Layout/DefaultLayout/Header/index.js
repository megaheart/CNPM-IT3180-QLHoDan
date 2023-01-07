import { useState, useRef, useContext, useEffect } from 'react';
import { AuthContext } from '~/components/AuthenProvider';

import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { NavLink } from "react-router-dom";
import fuhua from '~/assets/avatars/fuhua.png';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
//services
import accountService from '~/services/account';
//icons
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Badge, Alert, Stack } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';

const cx = classNames.bind(styles);


function Header({ text }) {
    const { setAuth } = useContext(AuthContext);

    const tippy = useRef();
    const [tippyAvatar, setTippyAvatar] = useState(null);
    const turnOnTippy = (e) => {
        setTippyAvatar(true);
    }

    const tippyMessage = useRef();
    const [messageVisible, setMessageVisible] = useState(null);
    const turnOnTippyMessage = (e) => {
        setMessageVisible(true);
    }

    const handleLogout = () => {
        accountService.logout(setAuth);
    }

    const [count, setCount] = useState(4);

    useEffect(() => {
        function handleClickOutside(event) {
            if (tippy.current && !tippy.current.contains(event.target)) {
                setTippyAvatar(false);
            }
            if (tippyMessage.current && !tippyMessage.current.contains(event.target)) {
                setMessageVisible(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <header >
            <div className={cx('header-head')}>
                <div className={cx('header-1')}>
                    <div className={cx('header-1-2')}>
                        <span><NavLink className={cx('nav-item')} to='/dashboard'><HomeIcon /></NavLink></span>
                        <span><KeyboardArrowRightIcon className={cx('nav-item')} /></span>
                        <span>{text}</span>
                    </div>
                    <h3>{text}</h3>
                </div>
            </div>
            <div className={cx('search')}>
                <input placeholder='Tìm kiếm' spellCheck={false} />
                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
            <div className={cx('actions')} >
                <Tippy
                    interactive
                    visible={messageVisible}
                    render={attrs => (
                        <div ref={tippyMessage} className={cx('tippy')} tabIndex="-1" {...attrs}>
                            {/* <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="error">This is an error alert — check it out!</Alert>
                                <Alert severity="warning">This is a warning alert — check it out!</Alert>
                                <Alert severity="info">This is an info alert — check it out!</Alert>
                                <Alert severity="success">This is a success alert — check it out!</Alert>
                            </Stack> */}
                            <PopperWrapper>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert sx={{ fontSize: 15 }} severity="warning">Tài khoản của bạn đã bị khóa!</Alert>
                                    <Alert sx={{ fontSize: 15 }} severity="error">Tài khoản của bạn đã bị đăng nhập ở nơi khác!</Alert>
                                    <Alert sx={{ fontSize: 15 }} severity="success">Đơn xin đăng ký nhân khẩu của bạn đã được duyệt!</Alert>
                                    <Alert sx={{ fontSize: 15 }} severity="info">Bạn đã gửi đơn xin đăng ký nhân khẩu thành công!</Alert>
                                </Stack>
                            </PopperWrapper>

                        </div>
                    )}
                >
                    <Badge color="secondary" badgeContent={count}  >
                        <MailIcon sx={{ fontSize: 30, cursor: 'pointer' }} onClick={turnOnTippyMessage} />
                    </Badge>
                </Tippy>
                <Tippy
                    interactive
                    visible={tippyAvatar}
                    render={attrs => (
                        <div ref={tippy} className={cx('tippy')} tabIndex="-1" {...attrs}>
                            <PopperWrapper >
                                <div className={cx('btn')}>
                                    <NavLink className={cx('btn-avatar-expand')} to='/profile'>
                                        <span className={cx('icon-avatar-btn')}>
                                            <FontAwesomeIcon icon={faUser} />
                                        </span>
                                        <span className={cx('avatar-text-btn')}>Thông tin tài khoản</span>
                                    </NavLink>
                                </div>
                                <div className={cx('btn')}>
                                    <NavLink className={cx('btn-avatar-expand')} to='/' onClick={handleLogout}>
                                        <span className={cx('icon-avatar-btn')}><FontAwesomeIcon icon={faRightFromBracket} /> </span>
                                        <span className={cx('avatar-text-btn')}>Đăng xuất</span>
                                    </NavLink>
                                </div>
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <Avatar sx={{ cursor: 'pointer' }} src={fuhua} onClick={turnOnTippy} />
                </Tippy>
            </div>
        </ header>
    )
}

export default Header;