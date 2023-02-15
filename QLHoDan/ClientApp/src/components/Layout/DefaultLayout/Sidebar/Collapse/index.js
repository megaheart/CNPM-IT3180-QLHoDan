import { NavLink } from "react-router-dom";
import { useState, useCallback, useContext } from 'react'
import styles from '~/components/Layout/DefaultLayout/Sidebar/Sidebar.module.scss'
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import classNames from 'classnames/bind';
import SmoothCollapse from 'react-smooth-collapse';
import { TitleContext } from '../../';
const cx = classNames.bind(styles);
// onClick = { handleToggle }

function CollapseButton({ buttonObject, isOpen }) {
    const changer = useContext(TitleContext);
    const [visible, setVisible] = useState(false);
    const toggle = useCallback(() => setVisible(prev => !prev), []);
    return (
        <div className={cx('nav-div')}>
            <NavLink className={cx('btn-side')} onClick={toggle}>
                <span className={cx('icon-text')}>{buttonObject.icon}</span>
                <span className={isOpen ? cx('normal-btn') : cx('hide-btn')} >{isOpen && (buttonObject.title)}</span>
                <span className={cx('icon-collapse')}>{isOpen && (!visible ? <KeyboardArrowDown /> : <KeyboardArrowUp />)}</span>
            </NavLink>
            {isOpen && (
                <SmoothCollapse
                    expanded={visible}
                >
                    <div className={cx('nav-group-collapse')}>
                        {buttonObject.collapse.map((item) => {
                            return <NavLink
                                style={{ width: 200 }}
                                key={item.id}
                                className={({ isActive }) => {
                                    if (isActive) {
                                        setTimeout(() => changer(item.title), 100);
                                        return cx('nav-btn-collapse-active');
                                    }
                                    else {
                                        return cx('nav-btn-collapse');
                                    }
                                }}
                                to={item.linkCol}>
                                {/* <span>{item.icon}</span> */}
                                <span className={cx('text-btn')}>{item.title}</span>
                            </NavLink>
                        })}
                    </div>
                </SmoothCollapse>)
            }
        </div>
    )
}

export default CollapseButton