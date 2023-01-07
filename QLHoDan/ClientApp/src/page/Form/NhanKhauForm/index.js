import { useState, useEffect, useCallback } from 'react';
import { Fab, MenuItem, Box, TextField, Button, Backdrop, CircularProgress, InputLabel, InputAdornment, IconButton, Input, FormControl, Select } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

import { Add } from '@mui/icons-material';
import styles from './NhanKhau.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function FormNKComponent() {

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const [value, setValue] = useState(null);
    const [img, setImg] = useState();
    const handleFileImage = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImg(file);
        e.target.value = null;
    }
    useEffect(() => {
        //clean up function
        return () => {
            img && URL.revokeObjectURL(img.preview);
            //remvove the temporary url if avatar exists
        }
    }, [img]);
    const handleRequestFullScreen = useCallback((e) => {
        e.target.requestFullscreen();
    }, []);
    return (
        <div className={cx('container')}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: 5
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
                <h1 style={{ textAlign: 'center' }}>Đơn xin thêm nhân khẩu </h1>
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
                    <TextField sx={{ m: 1, width: 270 }} label="Họ và tên chủ hộ"
                        inputProps={{
                            style: { fontSize: 20 }
                        }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />

                </div>
                <div className={cx('line-form')} >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={({ inputRef, inputProps, InputProps }) =>
                                <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                                    <InputLabel sx={{ fontSize: 22 }} htmlFor="input_login_account">
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
                </div>
                <div className={cx('line-form')}>
                    <TextField sx={{ m: 1, width: 270 }} label="Dân tộc" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
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
                </div>
                <div className={cx('line-form')}>
                    <TextField sx={{ m: 1, width: 270 }} label="Nơi làm việc" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
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
                </div>
                <div className={cx('line-form')} >
                    <TextField label="Sổ hộ khẩu"
                        inputProps={{
                            style: { fontSize: 20 }
                        }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
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

                    <TextField sx={{ m: 1, width: 270 }} label="Quan hệ với chủ hộ" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                </div>
                <div className={cx('line-form')}>
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
                    <TextField sx={{ m: 1, width: 270 }} label="Lý do chuyển đến" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                </div>
                <div className={cx('line-start')} >
                    <label htmlFor="upload-photo" style={{ marginLeft: 10 }}>
                        <input
                            style={{ display: 'none' }}
                            id="upload-photo"
                            name="upload-photo"
                            type="file"
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
                    {
                        img && (
                            <div>
                                <img src={img.preview}
                                    alt="avatar"
                                    style={{ cursor: 'pointer', width: "300px", margin: 5 }}
                                    onClick={handleRequestFullScreen} />
                            </div>
                        )
                    }
                </div>
            </Box>


            <Button onClick={handleToggle} style={{ width: 150 }} variant="contained">Gửi</Button>
        </div>
    );
}