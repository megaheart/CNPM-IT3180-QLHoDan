import classNames from "classnames/bind";
import styles from './Action.module.scss';
import { NavLink } from "react-router-dom";
const cx = classNames.bind(styles);


function ActionItem({ item, onClick }) {
    return (
        <div className={cx('wrapper')}>
            <NavLink onClick={onClick} to={item.link} className={cx('info')}>
                <h4 className={cx('name')}>
                    {item.title}
                </h4>
            </NavLink>
        </div>
    );
}

export default ActionItem;