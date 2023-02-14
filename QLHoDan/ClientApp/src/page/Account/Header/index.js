import styles from './Header.module.scss'
import classNames from 'classnames/bind';
import { deepOrange } from '@mui/material/colors';
import { Avatar } from '@mui/material';
import useAuth from '~/hooks/useAuth';
import { useMemo } from 'react';
const cx = classNames.bind(styles);

export default function Header() {
    const { auth } = useAuth();
    const role = useMemo(() => {
        if (auth.role === 'CommitteeChairman') {
            return 'Chủ tịch xã';
        }
        else if (auth.role === 'Accountant') {
            return 'Kế toán';
        }
        else if (auth.role === 'ScopeLeader') {
            return 'Tổ trưởng';
        }
        else return 'Hộ dân';
    }, [auth.role])
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
                <span><b>Tên đăng nhập</b>: {auth.username}</span>
                <span><b>Quyền hạn</b>: {
                    role
                }</span>
                <hr />
            </div>
        </div>
    )
}