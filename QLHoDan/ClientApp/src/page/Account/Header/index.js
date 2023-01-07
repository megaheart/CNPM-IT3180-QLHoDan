import styles from './Header.module.scss'
import classNames from 'classnames/bind';
import fuhua from '~/assets/avatars/fuhua.png';
import { CameraAltOutlined } from '@mui/icons-material';

const cx = classNames.bind(styles);

export default function Header() {
    return (
        <div className={cx('account-view')}>
            <div style={{ position: 'relative' }}>
                <img className={cx('avatar')} src={fuhua} alt='Hello' />
                <button className={cx('change-avatar')}><CameraAltOutlined /></button>
            </div>
            <h3>Hello World</h3>
            <span>helloworld123</span>
            <span>Quyền hạn: Tổ trưởng</span>
            <hr />
            <span>Nghề nghiệp : Tổ trưởng </span>
            <span>Số điện thoại : 123456789</span>
        </div>
    )
}