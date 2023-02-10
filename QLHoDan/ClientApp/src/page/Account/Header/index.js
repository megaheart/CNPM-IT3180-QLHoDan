import styles from './Header.module.scss'
import classNames from 'classnames/bind';
import { deepOrange } from '@mui/material/colors';
import { Avatar } from '@mui/material';
import useAuth from '~/hooks/useAuth';
import { useMemo } from 'react';
import accountApi from '~/services/api/accountApi';
import { useQuery } from '@tanstack/react-query';
const cx = classNames.bind(styles);

function getLastName(string) {
    if (typeof string === 'string') {
        const arr = string.split(' ');
        return arr[arr.length - 1];
    }
    return '';
};

export default function Header() {
    const { auth } = useAuth();

    const { data, isLoading } = useQuery(
        ['user'],
        async () => accountApi.getProfile(auth.token),
    );
    console.log(data)

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
    }, [auth.role]);

    return (
        <div className={cx('account-view')}>
            <div style={{ position: 'relative' }}>
                <Avatar sx={{
                    width: '20vw',
                    margin: '0 auto',
                    height: '20vw',
                    fontSize: '5vw',
                    bgcolor: deepOrange[500]
                }}
                >{isLoading ? 'Loading...' : getLastName(data.fullName)}</Avatar>
            </div>
            <h3>{isLoading ? 'Loading...' : data.fullName}</h3>
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