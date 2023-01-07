import { useState } from 'react';
import React from 'react';
import Sidebar from "./Sidebar";
import Header from "./Header";
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const TitleContext = React.createContext();

function DefaultLayout({ children }) {
    const [headText, setHeadText] = useState('Dashboard');
    return (
        <TitleContext.Provider value={setHeadText}>
            <div className={cx('wrapper')} >
                <Sidebar state={headText} stateChanger={setHeadText} />
                <div className={cx('container')}>
                    <Header text={headText} />
                    <div className={cx('content')}>
                        {children}
                    </div>
                </div>
            </div >
        </TitleContext.Provider>


    )
}
export { TitleContext };
export default DefaultLayout;