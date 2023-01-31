import styles from './Award.module.scss';
import classNames from 'classnames/bind';
import { Button } from '@mui/material';
import { useState } from 'react';

import CreateEvent from './CreateEvent';

const cx = classNames.bind(styles);

export default function PersistentDrawerRight() {
    const [status, setStatus] = useState(1);
    const handleAddEvent = () => {
        setStatus(2);
    }
    return (
        <div className={cx('award')}>
            <div className={cx('header-award')}>
                <h1>Danh sách dịp phát thưởng</h1>
                <div>
                    <Button variant="contained" color="primary" sx={{ fontSize: 15 }}>
                        Thêm dịp phát thưởng
                    </Button>
                </div>
            </div>
            <div className={cx('body-award')}>
                <CreateEvent />
            </div>
        </div >
    )
}