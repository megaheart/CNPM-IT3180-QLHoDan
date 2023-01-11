import { NavLink } from 'react-router-dom';
import styles from './Dashboard.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function DashboardComponent() {
    return (
        <div >
            <h1>Chào mừng bạn đến với ứng dụng quản lý hộ dân của Group 1 </h1>
        </div>
    )
}