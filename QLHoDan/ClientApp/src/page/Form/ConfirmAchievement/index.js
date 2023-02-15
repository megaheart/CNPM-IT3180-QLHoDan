import { useState, useEffect, useCallback, useRef } from 'react';
import { Fab, Box, TextField, Button, Backdrop, CircularProgress, Snackbar, Alert } from '@mui/material';
import formEnvidenceAward from '~/services/api/formEnvidenceAward';
import { Add, CloseOutlined } from '@mui/icons-material';
import styles from './DeathConfirm.module.scss'
import classNames from 'classnames/bind';

import useAuth from '~/hooks/useAuth';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
const cx = classNames.bind(styles);
export default function ConfirmAchievement() {

    const { auth } = useAuth();
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
    };

    const idRef = useRef(null);
    const awardEventIdRef = useRef(null);
    const achivementNameRef = useRef(null);

    const [binaryDataArray, setBinaryDataArray] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

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



    const handleClose = () => {
        setOpen(false);
    };

    const handleRequestFullScreen = useCallback((e) => {
        e.target.requestFullscreen();
    }, []);

    function convertBinaryToIFormFile(binaryDataArray) {
        const formFiles = [];
        binaryDataArray.forEach((binaryData, index) => {
            const blob = new Blob([binaryData], { type: 'image/jpeg' });
            const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
            formFiles.push(file);
        });
        return formFiles;
    }


    useEffect(() => {
        return () => {
            binaryDataArray && binaryDataArray.forEach((file) => URL.revokeObjectURL(file))
            //remvove the temporary url if avatar exists
        }
    }, [binaryDataArray]);


    const mutateSend = useMutation((data) => formEnvidenceAward.sendFormAward(auth.token, data), {
        onMutate: () => {
            setOpen(true);
        },
        onSuccess: (data) => {
            setSuccess(true);
            setOpen(false);
        },
        onError: (error) => {
            alert('Co loi xay ra')
            console.log(error)
            setOpen(false);
        },
        onSettled: () => {
            setOpen(false);
        }
    });


    const handleSendForm = (e) => {
        e.preventDefault();
        // const formFiles = convertBinaryToIFormFile(binaryDataArray);
        const ResidentIdCode = idRef.current.value;
        const RewardCeremonyId = awardEventIdRef.current.value;
        const AchievementName = achivementNameRef.current.value;
        const formData = new FormData();
        formData.append('ResidentIdCode', ResidentIdCode);
        formData.append('RewardCeremonyId', +RewardCeremonyId);
        formData.append('AchievementName', AchievementName);

        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('Images', selectedFiles[i], selectedFiles[i].name);
        }

        console.log(Object.fromEntries(formData.entries()));
        mutateSend.mutate(formData);
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
                    '& .MuiTextField-root': { m: 1, width: '30ch' },
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    marginBottom: '5px',
                    backgroundColor: '#fff',
                    width: '80%',
                    padding: 2
                }}
                noValidate
                autoComplete="off"
            >
                <Snackbar open={success} autoHideDuration={3000} onClose={handleSuccess} >
                    <Alert onClose={handleSuccess} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                        Gửi minh chứng thành công !
                    </Alert>
                </Snackbar>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <h1>Minh chứng thành tích</h1>
                <div className={cx('line-form')}>
                    <TextField
                        inputRef={idRef}
                        label="Số giấy khai sinh"
                        inputProps={{
                            style: { fontSize: 20 }
                        }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                    <TextField
                        inputRef={awardEventIdRef}
                        label="ID đợt thưởng (xem thông báo)"
                        inputProps={{
                            style: { fontSize: 20 }
                        }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                    <TextField
                        inputRef={achivementNameRef}
                        label="Tiêu đề"
                        inputProps={{
                            style: { fontSize: 20 }
                        }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        helperText='Thành tích cháu đạt được'
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
                    {(binaryDataArray.length > 0) && <div className={cx('img-render')}>{binaryDataArray.map((binaryData, index) => (
                        <div key={"image" + index} style={{ position: 'relative', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: 'auto' }}>
                            <img src={binaryData}
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