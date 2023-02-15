import styles from './Award.module.scss';
import useAuth from '~/hooks/useAuth';
import classNames from 'classnames/bind';
import { useState, useCallback, useRef } from 'react';
import { Button, Dialog, CircularProgress, Box, Fab, Slide, Snackbar, Alert, TextField, Collapse } from '@mui/material';
import { green } from '@mui/material/colors';
import ConfirmBox from '~/components/component/Dialog/ConfirmBox';

import CreateEvent from './CreateEvent';
import ListAwardEvent from './ListAward'

const cx = classNames.bind(styles);

export default function PersistentDrawerRight() {
    const { auth } = useAuth();

    const [status, setStatus] = useState(1);
    //handle save button
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [isClose, setIsClose] = useState(false);

    const [stateChange, setStateChange] = useState(false);


    const handleCloseConfirmBox = () => {
        setIsClose(false);
        setStateChange(false);
    };

    const handleClose = () => {
        setIsClose(false);
        setStateChange(false);
        setStatus(1);
    };

    const handleAddEvent = () => {
        setStatus(2);
    }
    const handeReturn = () => {
        setStateChange(true);
    }
    return (
        <div className={cx('award')}>
            <div className={cx('header-award')}>
                <h1>{status === 2 ? 'Thêm dịp phát thưởng' : 'Danh sách dịp phát thưởng'}</h1>
                <div>
                    {auth.role === 'CommitteeChairman' ?
                        status === 2 ?
                            <Button onClick={handeReturn} variant="contained" color="error" sx={{ fontSize: 15 }}>
                                Quay lại
                            </Button>
                            :
                            <Button onClick={handleAddEvent} variant="contained" color="primary" sx={{ fontSize: 15 }}>
                                Thêm dịp phát thưởng
                            </Button>
                        : null
                    }
                </div>
            </div>
            <div className={cx('body-award')}>
                {status === 2 ? <CreateEvent checkChange={{ stateChange, setIsClose, setStatus, setStateChange }} /> : <ListAwardEvent />}
            </div>
            <ConfirmBox title='Quay lại ?' open={isClose} onClose={handleCloseConfirmBox} onAgree={handleClose} />
        </div >
    )
}