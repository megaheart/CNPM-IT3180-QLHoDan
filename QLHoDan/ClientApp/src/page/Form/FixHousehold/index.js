import { useState, useEffect, useCallback } from 'react';
import { Fab, Box, TextField, Button, Backdrop, CircularProgress, checkboxClasses } from '@mui/material';

import { Add, CloseOutlined } from '@mui/icons-material';
import styles from './DeathConfirm.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function FixHouseholdNumber() {

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    const handleRequestFullScreen = useCallback((e) => {
        e.target.requestFullscreen();
    }, []);

    const [arrImg, setArrImg] = useState([]);

    const handleFileImage = useCallback((e) => {
        let files = [...e.target.files].map((file) => {
            file.preview = URL.createObjectURL(file);
            return file;
        })
        setArrImg([...arrImg, ...files]);
        e.target.value = null;

        return () => {
            arrImg && arrImg.forEach((file) => URL.revokeObjectURL(file.preview))
            //remvove the temporary url if avatar exists
        }

    }, [arrImg]);
    const removeImageByClick = (index) => {
        setArrImg(prev => prev.filter((item, i) => i !== index) || [])
    }
    return (
        <div className={cx('container')}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    marginBottom: '5px',
                    padding: 2
                    , backgroundColor: '#fff',
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
                <h1>Đơn chuyển hộ khẩu</h1>
                <div className={cx('line-form')}>
                    <TextField
                        label="CMND/CCCD người chuyển"
                        inputProps={{
                            style: { fontSize: 20 }
                        }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                    <TextField
                        label="Sổ hộ khẩu mới"
                        inputProps={{
                            style: { fontSize: 20 }
                        }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                </div>

            </Box>
            <Button onClick={handleToggle} style={{ margin: '0 auto', display: 'block' }} variant="contained">Gửi</Button>
        </div>
    );
}