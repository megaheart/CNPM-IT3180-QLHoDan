import { useState, useEffect, useCallback } from 'react';
import { Fab, Box, TextField, Button, Backdrop, CircularProgress, checkboxClasses } from '@mui/material';

import { Add, CloseOutlined } from '@mui/icons-material';
import styles from './DeathConfirm.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function DeathConfirm() {

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
                <h1>Đơn chứng tử</h1>
                <div className={cx('line-form')}>
                    <TextField
                        label="CMND/CCCD"
                        inputProps={{
                            style: { fontSize: 20 }
                        }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />

                </div>
                <div className={cx('input-image-area')}>
                    <label htmlFor="upload-photo" style={{ marginLeft: 10 }}>
                        <input
                            style={{ display: 'none' }}
                            id="upload-photo"
                            name="upload-photo"
                            type="file"
                            multiple="multiple"
                            onChange={handleFileImage}
                        />
                        <Fab
                            color="secondary"
                            size="small"
                            component="span"
                            aria-label="add"
                            variant="extended"
                        >
                            <Add /> Ảnh minh chứng
                        </Fab>

                    </label>
                    {(arrImg.length > 0) && <div className={cx('img-render')}>{arrImg.map((item, index) => (
                        <div key={"image" + index} style={{ position: 'relative', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: 'auto' }}>
                            <img src={item.preview}
                                style={{ width: 'auto', height: '150px', marginRight: 5, marginBottom: 5, cursor: 'pointer' }}
                                alt="evidence"
                                onClick={handleRequestFullScreen} />
                            <Fab
                                sx={{ position: 'absolute', right: -5, top: -7, backgroundColor: 'transparent' }}
                                color="error"
                                size="small"
                                component="span"
                                aria-label="add"
                                variant="extended"
                                onClick={() => removeImageByClick(index)}
                            >
                                <CloseOutlined />
                            </Fab>
                        </div>
                    ))}
                    </div>}
                </div>
            </Box>
            <Button onClick={handleToggle} style={{ margin: '0 auto', display: 'block' }} variant="contained">Gửi</Button>
        </div>
    );
}