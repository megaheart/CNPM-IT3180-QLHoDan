import styles from './Award.module.scss';
import classNames from 'classnames/bind';
import { useState, useCallback, useRef } from 'react';
import { Button, Dialog, CircularProgress, Box, Fab, Slide, Snackbar, Alert, TextField, Collapse } from '@mui/material';
import { green } from '@mui/material/colors';
import ConfirmBox from '~/components/component/Dialog/ConfirmBox';
//icons material
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import CreateEvent from './CreateEvent';
import ListAwardEvent from './ListAward'

const cx = classNames.bind(styles);

export default function PersistentDrawerRight() {
    const timer = useRef();
    const [status, setStatus] = useState(1);
    //handle save button
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [isClose, setIsClose] = useState(false);

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    const handleCloseConfirmBox = useCallback(() => {
        setIsClose(false);
    }, []);
    const handleClose = () => {
        setStatus(1);
        setSuccess(false);
        setIsClose(false);
    };
    const handleSave = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 2000);
        }
    };

    const handleAddEvent = () => {
        setStatus(2);
    }
    const handeReturn = () => {
        setIsClose(true);
    }
    return (
        <div className={cx('award')}>
            <div className={cx('header-award')}>
                <h1>{status === 2 ? 'Thêm dịp phát thưởng' : 'Danh sách dịp phát thưởng'}</h1>
                <div>
                    {status === 2 ?
                        <div className={cx('btn-group-addEvent')}>
                            <Box sx={{ m: 1, position: 'relative' }}>
                                <Fab
                                    aria-label="save"
                                    color="primary"
                                    sx={buttonSx}
                                    onClick={handleSave}
                                >
                                    {success ? <CheckIcon /> : <SaveIcon />}
                                </Fab>
                                {loading && (
                                    <CircularProgress
                                        size={68}
                                        sx={{
                                            color: green[500],
                                            position: 'absolute',
                                            top: -6,
                                            left: -6,
                                            zIndex: 1,
                                        }}
                                    />
                                )}
                            </Box>
                            <Button onClick={handeReturn} variant="contained" color="error" sx={{ fontSize: 15 }}>
                                Quay lại
                            </Button>
                        </div>
                        :
                        <Button onClick={handleAddEvent} variant="contained" color="primary" sx={{ fontSize: 15 }}>
                            Thêm dịp phát thưởng
                        </Button>
                    }
                </div>
            </div>
            <div className={cx('body-award')}>
                {status === 2 ? <CreateEvent /> : <ListAwardEvent />}
            </div>
            <ConfirmBox open={isClose} onClose={handleCloseConfirmBox} onAgree={handleClose} />
        </div >
    )
}