import { useState, useRef, useContext, useEffect } from 'react';
import useAuth from '~/hooks/useAuth';

import { deepOrange } from '@mui/material/colors';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { NavLink } from "react-router-dom";
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import ActionItem from '~/components/component/Action';

//icons
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Badge, Alert, Stack } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
//authentication
import authenticationService from '~/services/account/authentication';
import notificationManager from '~/services/api/notificationManager';
//search
import { FormsAction, filterByTitle } from '~/components/component/Action/SearchResult';

import accountApi from '~/services/api/accountApi';
import { useQuery } from '@tanstack/react-query';

const cx = classNames.bind(styles);

function getLastName(string) {
    if (typeof string === 'string') {
        const arr = string.split(' ');
        return arr[arr.length - 1];
    }
    return '';
};

function Header({ text }) {
    const { auth, setAuth } = useAuth();

    const { data, isLoading } = useQuery(
        ['user'],
        async () => accountApi.getProfile(auth.token),
    );
    // const queryNotificationCount = useQuery(
    //     ['notification'],
    //     async () => notificationManager.getNumberOfUnreadNotification(auth.token),
    // );
    //tippy for avatar button
    const tippy = useRef();
    const [tippyAvatar, setTippyAvatar] = useState(null);
    const turnOnTippy = () => {
        setTippyAvatar(true);
    }
    //tippy for message button
    const tippyMessage = useRef();
    const [messageVisible, setMessageVisible] = useState(null);
    const turnOnTippyMessage = () => {
        setMessageVisible(true);
    }
    //tippy and event for search bar
    const tippySearch = useRef();
    const searchBar = useRef();
    const [search, setSearch] = useState('');
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    const clearSearch = () => {
        setSearch('');
    }
    useEffect(() => {
        searchBar.current.focus();
    }, [search])
    //logout
    const handleLogout = () => {
        authenticationService.logOut();
        setAuth({});
    }
    //count number of message
    const [count, setCount] = useState(4);
    //handle click outside tippy
    useEffect(() => {
        function handleClickOutside(event) {
            if (tippy.current && !tippy.current.contains(event.target)) {
                setTippyAvatar(false);
            }
            if (tippyMessage.current && !tippyMessage.current.contains(event.target)) {
                setMessageVisible(false);
            }
            if (tippySearch.current && !tippySearch.current.contains(event.target) && searchBar.current && !searchBar.current.contains(event.target)) {
                setSearch('');
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <header className={cx('header-default')} >
            <div className={cx('header-head')}>
                <div className={cx('header-1')}>
                    <div className={cx('header-1-2')}>
                        <span><NavLink className={cx('nav-item')} to='/profile'><HomeIcon /></NavLink></span>
                        <span><KeyboardArrowRightIcon className={cx('nav-item')} /></span>
                        <span>{text}</span>
                    </div>
                    <h3>{text}</h3>
                </div>
            </div>

            <Tippy
                interactive
                visible={filterByTitle(FormsAction, search).length > 0 && search.length > 0}
                render={attrs => (
                    <div ref={tippySearch} className={cx('search-result')} tabIndex="-1" {...attrs}>
                        {auth.role === 'Household' && <PopperWrapper>

                            <h4 className={cx('search-title')}>Kết quả tìm kiếm</h4>
                            {
                                filterByTitle(FormsAction, search).map(
                                    item => {
                                        return <ActionItem onClick={() => setSearch('')} key={item.link} item={item} />
                                    }
                                )
                            }
                        </PopperWrapper>
                        }
                    </div>
                )}
            >
                <div className={cx('search')}>
                    <input ref={searchBar} value={search} onChange={handleSearch} placeholder='Tìm kiếm' spellCheck={false} />
                    <div className={cx('clear')}>
                        {search.length > 0 &&
                            <button onClick={clearSearch} >
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        }
                    </div>
                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </Tippy>


            <div className={cx('actions')} >

                <NavLink to='/notification'>

                    <MailIcon sx={{ fontSize: 30, cursor: 'pointer' }} />
                </NavLink>
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
                                    <NavLink className={cx('btn-avatar-expand')} to='/login' onClick={handleLogout}>
                                        <span className={cx('icon-avatar-btn')}><FontAwesomeIcon icon={faRightFromBracket} /> </span>
                                        <span className={cx('avatar-text-btn')}>Đăng xuất</span>
                                    </NavLink>
                                </div>
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <Avatar sx={{ fontSize: 10, cursor: 'pointer', border: '2px solid transparent', '&:hover': { borderColor: 'green' }, bgcolor: deepOrange[500] }}
                        onClick={turnOnTippy} >
                        <span>{isLoading ? 'Loading...' : getLastName(data.fullName)}</span>
                    </Avatar>
                    {/* <Avatar sx={{ cursor: 'pointer', border: '2px solid transparent', '&:hover': { borderColor: 'green' } }} src={fuhua} onClick={turnOnTippy} /> */}
                </Tippy>
            </div>
        </ header >
    )
}

export default Header;