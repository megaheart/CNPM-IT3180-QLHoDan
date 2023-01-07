import { useState, useEffect, useCallback } from 'react';
import { Fab, MenuItem, Box, TextField, Button, Backdrop, CircularProgress, checkboxClasses } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import styles from './RequireRemove.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function RequireRemoving() {

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const [value, setValue] = useState(null);
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
                    paddingBottom: '20px'
                }}
                noValidate
                autoComplete="off"
            >
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <h1>Đơn xin chuyển đi</h1>
                <div className={cx('line-form')}>
                    <TextField required label="CMND/CCCD" variant="outlined" />
                    <TextField required label="Nơi chuyển đi" variant="outlined" />
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
                    <TextField required label="Lý do chuyển đi" variant="outlined" />
                </div>
            </Box>
            <Button onClick={handleToggle} style={{ margin: '0 auto', display: 'block' }} variant="contained">Gửi</Button>
        </div>
    );
}