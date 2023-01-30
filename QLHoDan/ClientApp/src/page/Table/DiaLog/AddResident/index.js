import * as React from 'react';
import { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
//validate
import validation from '~/services/validate/index.js';
//material components
import {
    Button, Dialog, CircularProgress, Box, Fab, Slide, Snackbar, Alert,
    TextField, MenuItem, InputLabel, InputAdornment, IconButton, Input, FormControl, Select
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

import { Add } from '@mui/icons-material';
// import ListItemText from '@mui/material/ListItemText';
// import ListItem from '@mui/material/ListItem';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import CloseIcon from '@mui/icons-material/Close';
import { green } from '@mui/material/colors';
//icons material
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
//style
import classNames from 'classnames/bind';
import styles from './AddResident.module.scss';
import ConfirmBox from '../ConfirmBox';

const cx = classNames.bind(styles);
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddResidentDialog({ open, onClose }) {
    //handle save button
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const timer = useRef();
    const [errorMessage, setErrorMessage] = useState('');
    const [checkErrorStatus, setCheckErrorStatus] = useState(false);
    const [errorMessageMain, setErrorMessageMain] = useState('');
    const [checkErrorMainStatus, setCheckErrorMainStatus] = useState(false);
    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };
    //các dữ liệu form cần điền
    const [value, setValue] = useState(null);

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);
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
    //handle when clode this dislog
    const [isClose, setIsClose] = useState(false);
    const handleCloseConfirmBox = useCallback(() => {
        setIsClose(false);
    }, []);

    // const [open, setOpen] = React.useState(false);
    const handleSuccess = () => {
        setSuccess(false);
    };
    //handle close this dialog
    const handleClose = () => {
        onClose(!open);
        setIsClose(false);
    };
    const handleInput = useCallback(
        (e) => {
            if (checkErrorStatus) {
                setCheckErrorStatus(false)
            }
        }, []);

    const handlStartClose = () => {
        onClose(!open);
    };
    return (
        <div>
            <Snackbar open={success} autoHideDuration={6000} onClose={handleSuccess} >
                <Alert onClose={handleSuccess} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    Thên hộ khẩu mới thành công !
                </Alert>
            </Snackbar>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <div className={cx('header-paper-resident')}>
                    <Button variant="contained" color="error" sx={{ fontSize: '1.5rem', margin: '2 0', textAlign: 'right', width: 50 }} onClick={handlStartClose}>Đóng</Button>
                </div>
                <div className={cx('resident-paper')}>
                    <h2 className={cx('title-resident')}>Thêm nhân khẩu mới</h2>
                    <div className={cx('resident-detail')}>
                        <div className={cx('line-form')}>
                            <TextField sx={{ m: 1, width: 270 }} label="Họ và tên" inputProps={{
                                style: { fontSize: 20 }
                            }}
                                InputLabelProps={{
                                    style: { fontSize: 20 }
                                }}
                                variant="standard" />
                            <TextField sx={{ m: 1, width: 270 }} label="Bí danh" inputProps={{
                                style: { fontSize: 20 }
                            }}
                                InputLabelProps={{
                                    style: { fontSize: 20 }
                                }}
                                variant="standard" />

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) =>
                                        <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                                            <InputLabel sx={{ fontSize: 20 }} htmlFor="input_login_account">
                                                Ngày sinh
                                            </InputLabel>
                                            <Input
                                                inputRef={inputRef}
                                                sx={{ fontSize: 20 }}
                                                id="input_login_account"
                                                endAdornment={
                                                    <InputAdornment position="start">
                                                        {InputProps?.endAdornment}
                                                    </InputAdornment>
                                                }
                                                {...inputProps}
                                            />
                                        </FormControl>
                                    }
                                />
                            </LocalizationProvider>
                        </div>
                        <div className={cx('line-form')} >
                            <TextField sx={{ m: 1, width: 270 }} label="Nơi sinh" inputProps={{
                                style: { fontSize: 20 }
                            }}
                                InputLabelProps={{
                                    style: { fontSize: 20 }
                                }}
                                variant="standard" />
                            <TextField sx={{ m: 1, width: 270 }} label="Nguyên quán" inputProps={{
                                style: { fontSize: 20 }
                            }}
                                InputLabelProps={{
                                    style: { fontSize: 20 }
                                }}
                                variant="standard" />
                            <TextField sx={{ m: 1, width: 270 }} label="Dân tộc" inputProps={{
                                style: { fontSize: 20 }
                            }}
                                InputLabelProps={{
                                    style: { fontSize: 20 }
                                }}
                                variant="standard" />
                        </div>
                        <div className={cx('line-form')}>
                            <TextField sx={{ m: 1, width: 270 }} label="Quốc tịch" inputProps={{
                                style: { fontSize: 20 }
                            }}
                                InputLabelProps={{
                                    style: { fontSize: 20 }
                                }}
                                variant="standard" />
                            <TextField sx={{ m: 1, width: 270 }} label="Nghề nghiệp" inputProps={{
                                style: { fontSize: 20 }
                            }}
                                InputLabelProps={{
                                    style: { fontSize: 20 }
                                }}
                                variant="standard" />
                            <TextField sx={{ m: 1, width: 270 }} label="Nơi làm việc" inputProps={{
                                style: { fontSize: 20 }
                            }}
                                InputLabelProps={{
                                    style: { fontSize: 20 }
                                }}
                                variant="standard" />
                        </div>
                        <div className={cx('line-form')}>
                            <TextField sx={{ m: 1, width: 270 }} label="CMND/CCCD" inputProps={{
                                style: { fontSize: 20 }
                            }}
                                InputLabelProps={{
                                    style: { fontSize: 20 }
                                }}
                                variant="standard" />
                            <TextField sx={{ m: 1, width: 270 }} label="Quan hệ với chủ hộ" inputProps={{
                                style: { fontSize: 20 }
                            }}
                                InputLabelProps={{
                                    style: { fontSize: 20 }
                                }}
                                variant="standard" />
                            <TextField label="Sổ hộ khẩu thuộc về"
                                sx={{ m: 1, width: 270 }}
                                inputProps={{
                                    style: { fontSize: 20 }
                                }}
                                InputLabelProps={{
                                    style: { fontSize: 20 }
                                }}
                                variant="standard" />
                        </div>
                        <div className={cx('line-form')} >
                            <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                                <InputLabel sx={{ fontSize: 22 }} htmlFor="input_login_account">
                                    Giới tính
                                </InputLabel>
                                <Select
                                    defaultValue='male'
                                    sx={{ fontSize: 20 }}
                                    id="input_login_account"
                                >
                                    <MenuItem sx={{ fontSize: 20 }} value='male'>
                                        Nam
                                    </MenuItem>
                                    <MenuItem sx={{ fontSize: 20 }} value='femake'>
                                        Nữ
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <TextField sx={{ m: 1, width: 270 }} label="Trình độ học vấn" inputProps={{
                                style: { fontSize: 20 }
                            }}
                                InputLabelProps={{
                                    style: { fontSize: 20 }
                                }}
                                variant="standard" />
                            <TextField sx={{ m: 1, width: 270 }} label="Tiền án" inputProps={{
                                style: { fontSize: 20 }
                            }}
                                InputLabelProps={{
                                    style: { fontSize: 20 }
                                }}
                                variant="standard" />
                        </div>
                        <div className={cx('line-form')}>

                            <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                                <InputLabel sx={{ fontSize: 22 }} htmlFor="input_login_account">
                                    Trạng thái (Sống hay chết)
                                </InputLabel>
                                <Select
                                    defaultValue='no'
                                    sx={{ fontSize: 20 }}
                                    id="input_login_account"
                                >
                                    <MenuItem sx={{ fontSize: 20 }} value='yes'>
                                        Đã
                                    </MenuItem>
                                    <MenuItem sx={{ fontSize: 20 }} value='no'>
                                        Chưa
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <TextField sx={{ m: 1, width: 270 }}
                                label="Nơi chuyển đi"
                                inputProps={{
                                    style: { fontSize: 20 }
                                }}
                                InputLabelProps={{
                                    style: { fontSize: 20 }
                                }}
                                variant="standard" />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) =>
                                        <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                                            <InputLabel sx={{ fontSize: 20 }} htmlFor="input_date_account">
                                                Ngày chuyển đi
                                            </InputLabel>
                                            <Input
                                                inputRef={inputRef}
                                                sx={{ fontSize: 20 }}
                                                id="input_date_account"
                                                endAdornment={
                                                    <InputAdornment position="start">
                                                        {InputProps?.endAdornment}
                                                    </InputAdornment>
                                                }
                                                {...inputProps}
                                            />
                                        </FormControl>
                                    }
                                />
                            </LocalizationProvider>
                        </div>
                        <div className={cx('line-start')}>
                            <TextField sx={{ m: 1, width: 1230 }} label="Lý do chuyển đến" inputProps={{
                                style: { fontSize: 20 }
                            }}
                                InputLabelProps={{
                                    style: { fontSize: 20 }
                                }}
                                variant="standard" />
                        </div>
                        <div className={cx('line-start')}>
                            <TextField sx={{ m: 1, width: 1230 }} label="Lý do chuyển đi" inputProps={{
                                style: { fontSize: 20 }
                            }}
                                InputLabelProps={{
                                    style: { fontSize: 20 }
                                }}
                                variant="standard" />

                        </div>
                    </div>
                </div>
                <div>
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

                </div>
            </Dialog>
            <ConfirmBox open={isClose} onClose={handleCloseConfirmBox} onAgree={handleClose} />
        </div >
    );
}