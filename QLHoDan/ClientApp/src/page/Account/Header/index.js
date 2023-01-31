import styles from './Header.module.scss'
import classNames from 'classnames/bind';
import { deepOrange } from '@mui/material/colors';
import { Avatar } from '@mui/material';

const cx = classNames.bind(styles);

export default function Header() {
    return (
        <div className={cx('account-view')}>
            <div style={{ position: 'relative' }}>
                <Avatar sx={{
                    width: '20vw',
                    margin: '0 auto',
                    height: '20vw',
                    fontSize: '9vw',
                    bgcolor: deepOrange[500]
                }}
                >Đức</Avatar>
            </div>
            <h3>Bùi Trọng Đức</h3>
            <div className={cx('info-container')}>
                <span><b>Tên đăng nhập</b>: helloworld123</span>
                <span><b>Quyền hạn</b>: Admin</span>
                <hr />
                <span><b>Nghề nghiệp</b> : Tổ trưởng </span>
                <span><b>Số điện thoại</b> : 3243243423</span>
            </div>
        </div>
    )
}