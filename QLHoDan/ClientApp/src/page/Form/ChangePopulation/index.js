import { useState, useEffect, useCallback, useRef } from 'react';
import {
    MenuItem, Box, TextField, Button, Backdrop, CircularProgress,
    InputLabel, InputAdornment, Input, FormControl, Select, Fab
} from '@mui/material';
import { Add, CloseOutlined } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import validation from '~/services/validate'
import formResidentChange from '~/services/api/changeResident';
import styles from './NhanKhau.module.scss'
import classNames from 'classnames/bind';
import useAuth from '~/hooks/useAuth'
const cx = classNames.bind(styles);

export default function ChangePopulation() {

    const { auth } = useAuth();

    const [open, setOpen] = useState(false);

    const [value, setValue] = useState(null);
    const [moveInDate, setMoveInDate] = useState(null);

    const [binaryDataArray, setBinaryDataArray] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const [errorIdentify, setErrorIdentify] = useState('');
    const [errorReson, setErrorReason] = useState('');

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
    const ReasonRef = useRef(null);

    const resetInput = () => {
        fullNameRef.current.value = '';
        aliasRef.current.value = '';
        isMaleRef.current.value = 'male';
        birthPlaceRef.current.value = '';
        nativeLandRef.current.value = '';
        ethnicRef.current.value = '';
        nationRef.current.value = '';
        jobRef.current.value = '';
        workplaceRef.current.value = '';
        identityCodeRef.current.value = '';
        relationShipRef.current.value = '';
        academicLevelRef.current.value = '';
        criminalRecordRef.current.value = '';
        ReasonRef.current.value = '';
        setMoveInDate(null);
        setValue(null);
        setBinaryDataArray([]);
        setSelectedFiles([]);
    }


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

    const removeImageByClick = (index) => {
        setBinaryDataArray(prev => prev.filter((item, i) => i !== index) || [])
        setSelectedFiles(prev => prev.filter((item, i) => i !== index) || [])
    }

    const handleSendChangePolulationForm = async () => {
        const currentData = {
            FullName: fullNameRef.current.value || '',
            Alias: aliasRef.current.value || '',
            DateOfBirth: value,
            IsMale: isMaleRef.current.value === 'male' ? true : false,
            BirthPlace: birthPlaceRef.current.value || '',
            NativeLand: nativeLandRef.current.value || '',
            Ethnic: ethnicRef.current.value || '',
            Nation: nationRef.current.value || '',
            Job: jobRef.current.value || '',
            Workplace: workplaceRef.current.value || '',
            ResidentIdCode: identityCodeRef.current.value || '',
            AcademicLevel: academicLevelRef.current.value || '',
            CriminalRecord: criminalRecordRef.current.value || '',
            Reason: ReasonRef.current.value || ''
        }
        // const a = validation.checkIdentifi(currentData.IdentityCode);
        // if (!a.isValid) {
        //     setErrorIdentify(a.message);
        // }
        // else {
        //     setErrorIdentify('');
        // }
        if (currentData.Reason === '') {
            setErrorReason('Vui lòng nhập lý do');
        }
        else {
            setErrorReason('');
        }
        if (selectedFiles.length === 0) {
            alert('Thiếu minh chứng');
            return;
        }
        const formData = new FormData();
        Object.keys(currentData).forEach(
            (key) => {
                formData.append(key, currentData[key])
            }
        )
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('Images', selectedFiles[i], selectedFiles[i].name)
        }
        setOpen(true);
        await formResidentChange.sendFormResidentChange(auth.token, formData)
            .then(
                () => {
                    alert('Gửi đơn thành công');
                    resetInput();
                }
            )
            .catch(
                (err) => {
                    alert(err?.response?.data?.description)
                }
            )
            .finally(
                () => {
                    setOpen(false);
                }
            )

    }

    useEffect(() => {
        return () => {
            binaryDataArray && binaryDataArray.forEach((file) => URL.revokeObjectURL(file))
            //remvove the temporary url if avatar exists
        }
    }, [binaryDataArray]);

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
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <h1 style={{ textAlign: 'center' }}>Đơn xin thay đổi nhân khẩu </h1>
                <div className={cx('line-form')}>
                    <TextField sx={{ m: 1, width: 270 }} label="Họ và tên" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        inputRef={fullNameRef}
                        variant="standard" />
                    <TextField sx={{ m: 1, width: 270 }} label="Bí danh" inputProps={{
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
                </div>
                <div className={cx('line-form')} >
                    <TextField sx={{ m: 1, width: 270 }} inputRef={birthPlaceRef} label="Nơi sinh" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                    <TextField sx={{ m: 1, width: 270 }} inputRef={nativeLandRef} label="Nguyên quán" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                    <TextField sx={{ m: 1, width: 270 }} inputRef={ethnicRef} label="Dân tộc" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                </div>
                <div className={cx('line-form')}>
                    <TextField sx={{ m: 1, width: 270 }} inputRef={nationRef} label="Quốc tịch" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                    <TextField sx={{ m: 1, width: 270 }} inputRef={jobRef} label="Nghề nghiệp" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                    <TextField sx={{ m: 1, width: 270 }} inputRef={workplaceRef} label="Nơi làm việc" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                </div>
                <div className={cx('line-form')}>
                    <TextField sx={{ m: 1, width: 270 }} required inputRef={identityCodeRef} label="CMND/CCCD" inputProps={{
                        style: { fontSize: 20 }
                    }
                    }
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        error={errorIdentify.length > 0}
                        helperText={errorIdentify}
                        variant="standard" />

                    <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                        <InputLabel sx={{ fontSize: 22 }} htmlFor="input_login_account">
                            Giới tính
                        </InputLabel>
                        <Select
                            defaultValue='male'
                            sx={{ fontSize: 20 }}
                            id="input_login_account"
                            inputRef={isMaleRef}
                        >
                            <MenuItem sx={{ fontSize: 20 }} value='male'>
                                Nam
                            </MenuItem>
                            <MenuItem sx={{ fontSize: 20 }} value='femake'>
                                Nữ
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <TextField helperText='' inputRef={relationShipRef} label="Quan hệ với chủ hộ" defaultValue=''
                        variant="standard" />

                </div>
                <div className={cx('line-form')}>
                    <TextField inputRef={academicLevelRef} sx={{ m: 1, width: 270 }} label="Trình độ học vấn" inputProps={{
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
                        inputRef={criminalRecordRef}
                        variant="standard" />
                </div>
                <div>
                    <TextField sx={{ m: 1, width: 1000 }} label="Lý do thay đổi" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        inputRef={ReasonRef}
                        helperText={errorReson}
                        error={errorReson.length !== 0}
                        variant="standard" />
                </div>
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
                        <img src={binaryDataArray}
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

                <Button color="primary" sx={{ margin: 5 }} onClick={handleSendChangePolulationForm} variant="contained">
                    Gửi
                </Button>

            </Box>

        </div>
    );
}