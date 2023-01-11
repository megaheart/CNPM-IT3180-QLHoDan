import styles from './Header.module.scss'
import classNames from 'classnames/bind';
import fuhua from '~/assets/avatars/fuhua.png';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { CameraAltOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';

const cx = classNames.bind(styles);

export default function Header() {
    return (
        <div className={cx('account-view')}>
            <div style={{ position: 'relative' }}>
                {/* <img className={cx('avatar')} src={fuhua} alt='Hello' /> */}
                <Avatar sx={{
                    width: 300,
                    margin: '0 auto',
                    height: 300,
                    fontSize: 150,
                    bgcolor: deepOrange[500]
                }}
                >N</Avatar>
                {/* <button className={cx('change-avatar')}><CameraAltOutlined /></button> */}
            </div>
            <h3>Bùi Trọng Đức</h3>
            <span>helloworld123</span>
            <span>Quyền hạn: Admin</span>
            <hr />
            <span>Nghề nghiệp : Tổ trưởng </span>
            <span>Số điện thoại : 3243243423</span>
        </div>
    )
}