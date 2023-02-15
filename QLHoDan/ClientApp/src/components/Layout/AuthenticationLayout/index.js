import { Button } from '@mui/material';
import styles from './AuthenticationLayout.module.scss';
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function AuthenticationLayout({ children }) {
    const navigate = useNavigate();
    const returnGuest = () => {
        navigate('/');
    }
    return (
        <div className={cx('author-layout')} >
            <header className={cx('authenticate-header')}>
                {/* <div className={cx('header-nav')}>
                    <button variant='contained'>Chính sách</button>
                    <button variant='contained' >Bảo mật</button>
                    <button variant='contained'>Quyền</button>
                    <button variant='contained'>Liên lạc</button>
                </div> */}
                <Button onClick={returnGuest} sx={{ fontSize: 16, color: '#fff', borderColor: '#fff' }} variant="outlined">Chế độ khách</Button>
            </header>
            {children}
        </div>
    )
}