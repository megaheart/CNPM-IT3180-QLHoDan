import { useState, useEffect, useCallback, useRef } from 'react';
import { MenuItem, Box, TextField, Button, Backdrop, CircularProgress, InputLabel, InputAdornment, Input, FormControl, Select } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

import formResidentChange from '~/services/api/changeResident';
import styles from './NhanKhau.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function ChangePopulation() {

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const householdIdRef = useRef(null);
    const addressRef = useRef(null);
    const scopeRef = useRef(null);

    const [value, setValue] = useState(null);
    const [moveInDate, setMoveInDate] = useState(null);


    const fullNameRef = useRef(null);
    const aliasRef = useRef(null);
    const dateOfBirthRef = useRef(null);
    const isMaleRef = useRef(null);
    const birthPlaceRef = useRef(null);
    const nativeLandRef = useRef(null);
    const ethnicRef = useRef(null);
    const nationRef = useRef(null);
    const jobRef = useRef(null);
    const workplaceRef = useRef(null);
    const identityCodeRef = useRef(null);
    const relationShipRef = useRef(null);
    const academicLevelRef = useRef(null);
    const criminalRecordRef = useRef(null);
    const moveInDateRef = useRef(null);
    const moveInReasonRef = useRef(null);


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
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #ccc',
                    alignItems: 'stretch',
                    borderRadius: 5,
                    padding: 2,
                    marginBottom: 1, backgroundColor: '#fff',
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
                <h1 style={{ textAlign: 'center' }}>????n xin thay ?????i nh??n kh???u </h1>
                <div className={cx('line-form')}>
                    <TextField sx={{ m: 1, width: 270 }} label="H??? v?? t??n" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        inputRef={fullNameRef}
                        variant="standard" />
                    <TextField sx={{ m: 1, width: 270 }} label="B?? danh" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard"
                        inputRef={aliasRef}
                    />


                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={({ inputRef, inputProps, InputProps }) =>
                                <FormControl sx={{ m: 1, width: 264 }} variant="standard">
                                    <InputLabel sx={{ fontSize: 22 }} htmlFor="input_login_account">
                                        Ng??y sinh
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
                    <TextField sx={{ m: 1, width: 270 }} inputRef={birthPlaceRef} label="N??i sinh" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                    <TextField sx={{ m: 1, width: 270 }} inputRef={nativeLandRef} label="Nguy??n qu??n" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                    <TextField sx={{ m: 1, width: 270 }} label="D??n t???c" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                </div>
                <div className={cx('line-form')}>
                    <TextField sx={{ m: 1, width: 270 }} label="Qu???c t???ch" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                    <TextField sx={{ m: 1, width: 270 }} label="Ngh??? nghi???p" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                    <TextField sx={{ m: 1, width: 270 }} label="N??i l??m vi???c" inputProps={{
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

                    <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                        <InputLabel sx={{ fontSize: 22 }} htmlFor="input_login_account">
                            Gi???i t??nh
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
                                N???
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <TextField sx={{ m: 1, width: 270 }} label="Tr??nh ????? h???c v???n" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                </div>
                <div className={cx('line-form')}>
                    <TextField sx={{ m: 1, width: 270 }} label="Ti???n ??n" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                    <TextField sx={{ m: 1, flex: 0.79 }} label="L?? do thay ?????i" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                </div>
            </Box>
            <div>
                <Button color="primary" onClick={handleToggle} variant="contained">
                    G???i
                </Button>
            </div>

        </div>
    );
}