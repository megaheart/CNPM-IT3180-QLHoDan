import { useState, useRef } from 'react';
import { Fab, MenuItem, Box, TextField, Button, Backdrop, CircularProgress, checkboxClasses } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import styles from './RequireRemove.module.scss'
import classNames from 'classnames/bind';

import formMovement from '~/services/api/moveForm';

import useAuth from '~/hooks/useAuth';
const cx = classNames.bind(styles);

export default function RequireRemoving() {
    const { auth } = useAuth();
    const [open, setOpen] = useState(false);

    const moveOutPlaceRef = useRef(null);
    const moveOutDateRef = useRef(null);
    const [value, setValue] = useState(null);
    const moveOutReasonRef = useRef(null);
    const ResidentIdCodeRef = useRef(null);


    const handleClose = () => {
        setOpen(false);
    };

    const handleSendForm = async () => {
        const data = new FormData();
        data.append('moveOutPlace', moveOutPlaceRef.current.value);
        data.append('moveOutDate', value);
        data.append('moveOutReason', moveOutReasonRef.current.value);
        data.append('ResidentIdCode', ResidentIdCodeRef.current.value);
        if (moveOutPlaceRef.current.value === '' || value === null || moveOutReasonRef.current.value === '' || ResidentIdCodeRef.current.value === '') {
            alert('Vui lòng nhập đầy đủ thông tin')
        } else {
            setOpen(true);
            await formMovement.sendFormMovement(auth.token, data).then(res => {
                if (res.status === 200) {
                    alert('Gửi đơn thành công')
                }
            })
                .finally(() => {
                    setOpen(false);
                });
        }

    };


    return (
        <div className={cx('container-require')}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    marginBottom: '5px',
                    paddingBottom: '20px', backgroundColor: '#fff',
                }}
                noValidate
                autoComplete="off"
            >
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <h1>Đơn xin chuyển đi</h1>
                <div className={cx('line-form')}>
                    <TextField inputRef={ResidentIdCodeRef} required label="CMND/CCCD" variant="outlined" />
                    <TextField inputRef={moveOutPlaceRef} required label="Nơi chuyển đi" variant="outlined" />
                </div>
                <div className={cx('line-form')}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            required
                            sx={{ fontSize: 12 }}
                            label="Ngày chuyển đi"
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField inputRef={moveOutReasonRef} required label="Lý do chuyển đi" variant="outlined" />
                </div>
                <Button onClick={handleSendForm} style={{ margin: '0 auto', display: 'block' }} variant="contained">Gửi</Button>
            </Box>
        </div>
    );
}