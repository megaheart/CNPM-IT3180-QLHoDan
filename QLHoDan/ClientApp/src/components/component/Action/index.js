import classNames from "classnames/bind";
import styles from './Action.module.scss';
import { NavLink } from "react-router-dom";
const cx = classNames.bind(styles);


function ActionItem({ item, onClick }) {
    return (
        <div className={cx('wrapper')}>
            <NavLink onClick={onClick} to={item.link} className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{item.title}</span>
                </h4>
                <span className={cx('username')} >{item.title}</span>
            </NavLink>
        </div>
    );
}

export default ActionItem;