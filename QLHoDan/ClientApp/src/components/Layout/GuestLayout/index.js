import { useState } from 'react';
import React from 'react';
import Sidebar from "./SideBar";
import Header from "./Header";
import styles from './GuesstLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


function DefaultLayout({ children }) {
    return (

        <div className={cx('wrapper')} >
            <Sidebar />
            <div className={cx('container')}>
                <Header key='guest' />
                <div className={cx('content')}>
                    {children}
                </div>
            </div>
        </div >
    )
}

export default DefaultLayout;