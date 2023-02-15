import { useState, useEffect, useRef, useCallback } from 'react';
import { Fab, Box, TextField, Button, Backdrop, CircularProgress, checkboxClasses } from '@mui/material';

import { Add, CloseOutlined } from '@mui/icons-material';
import styles from './DeathConfirm.module.scss'
import classNames from 'classnames/bind';
import formEvidenceDeath from '~/services/api/confirmDeath';
import useAuth from '~/hooks/useAuth';
const cx = classNames.bind(styles);

export default function DeathConfirm() {
    const { auth } = useAuth();
    const [open, setOpen] = useState(false);

    const [binaryDataArray, setBinaryDataArray] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleRequestFullScreen = useCallback((e) => {
        e.target.requestFullscreen();
    }, []);
    const ResidentIdCodeRef = useRef(null);

    const handleFileInput = (event) => {
        const files = event.target.files;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.addEventListener('load', function () {
                setBinaryDataArray(prev => {
                    return [...prev, reader.result]
                });
            });

            reader.readAsDataURL(file);
            setSelectedFiles(prev => {
                return [...prev, file]
            });
        }
    };

    useEffect(() => {
        return () => {
            binaryDataArray && binaryDataArray.forEach((file) => URL.revokeObjectURL(file))
            //remvove the temporary url if avatar exists
        }
    }, [binaryDataArray]);

    const handleSendForm = async () => {
        // const formFiles = convertBinaryToIFormFile(binaryDataArray);
        const ResidentIdCode = ResidentIdCodeRef.current.value;

        const formData = new FormData();
        formData.append('ResidentIdCode', ResidentIdCode);

        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('Images', selectedFiles[i], selectedFiles[i].name);
        }

        console.log(Object.fromEntries(formData.entries()));
        setOpen(true);
        await formEvidenceDeath.sendFormEvidenceDeath(auth.token, formData)
            .then(() => {
                alert('Gửi thành công');
                ResidentIdCodeRef.current.value = '';
                setBinaryDataArray([]);
            })
            .catch(
                (error) => {
                    alert(error?.response?.data?.description || 'Có lỗi xảy ra');
                }
            ).finally(() => {
                setOpen(false);
            });
    }

    const removeImageByClick = (index) => {
        setBinaryDataArray(prev => prev.filter((item, i) => i !== index) || [])
        setSelectedFiles(prev => prev.filter((item, i) => i !== index) || [])
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
                    padding: 2, backgroundColor: '#fff',
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
                <h1>Đơn chứng tử</h1>
                <div className={cx('line-form')}>
                    <TextField
                        inputRef={ResidentIdCodeRef}
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
                            onChange={handleFileInput}
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
                    {(binaryDataArray.length > 0) && <div className={cx('img-render')}>{binaryDataArray.map((item, index) => (
                        <div key={"image" + index} style={{ position: 'relative', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: 'auto' }}>
                            <img src={item}
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
                <Button onClick={handleSendForm} style={{ margin: '0 auto', display: 'block' }} variant="contained">Gửi</Button>
            </Box>
        </div>
    );
}