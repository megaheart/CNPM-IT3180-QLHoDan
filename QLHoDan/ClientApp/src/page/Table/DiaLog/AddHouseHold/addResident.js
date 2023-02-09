import { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
//validate
import validation from '~/services/validate/index.js';
//material components
import {
    Button, Dialog, Slide, Snackbar, Alert,
    TextField, MenuItem, InputLabel, InputAdornment, Input, FormControl, Select, styled
} from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
//style
import classNames from 'classnames/bind';
import ConfirmBox from '../ConfirmBox';
import styles from './AddHousehold.module.scss';

const cx = classNames.bind(styles);
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function AddResidentDialog({ open, onClose, action }) {

    const [identityCodeError, setIdentityCodeError] = useState('');

    const [dateOfBirth, setBirthday] = useState(null);
    const [idCardDate, setIdCardDate] = useState(null);
    const [moveOutDate, setMoveOutDate] = useState(null);
    const [moveInDate, setMoveInDate] = useState(null);

    const academicLevelRef = useRef();
    const aliasRef = useRef();
    const birthPlaceRef = useRef();
    const criminalRecordRef = useRef();
    const dateOfBirthRef = useRef();
    const ethnicRef = useRef();
    const fullNameRef = useRef();
    const idCardDateRef = useRef();
    const idCardPlaceRef = useRef();
    const identityCodeRef = useRef();
    const isMaleRef = useRef();
    const jobRef = useRef();
    const moveInDateRef = useRef();
    const moveInReasonRef = useRef();
    const nationRef = useRef();
    const nativeLandRef = useRef();
    const relationShipRef = useRef();
    const workplaceRef = useRef();

    const handleAdd = () => {
        console.log('ADDING....')
        const currentData = {
            fullName: fullNameRef.current.value,
            alias: aliasRef.current.value,
            dateOfBirth: dateOfBirth,
            isMale: isMaleRef.current.value === 'male' ? true : false,
            birthPlace: birthPlaceRef.current.value,
            nativeLand: nativeLandRef.current.value,
            ethnic: ethnicRef.current.value,
            nation: nationRef.current.value,
            job: jobRef.current.value,
            workplace: workplaceRef.current.value,
            identityCode: identityCodeRef.current.value,
            idCardDate: idCardDate,
            idCardPlace: idCardPlaceRef.current.value,
            relationShip: relationShipRef.current.value,
            academicLevel: academicLevelRef.current.value,
            criminalRecord: criminalRecordRef.current.value,
            moveInDate: moveInDate,
            moveInReason: moveInReasonRef.current.value,
        }
        console.log(currentData);
        action(currentData);
        onClose(false);
    }

    //handle when clode this dislog
    const [isClose, setIsClose] = useState(false);
    const handleCloseConfirmBox = useCallback(() => {
        setIsClose(false);
    }, []);

    //start close this dialog
    const handlStartClose = () => {
        onClose(!open);
    };
    //handle close this dialog
    const handleClose = () => {
        onClose(!open);
        setIsClose(false);
    };
    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth='600'
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <div className={cx('state-dialog')} >
                    <Button variant="contained" color="success"
                        sx={{ fontSize: 15, margin: '2 0', width: 60 }} onClick={handleAdd}>Thêm</Button>
                    <Button variant="contained" color="error"
                        sx={{ fontSize: 15, margin: '2 0', width: 60 }} onClick={handlStartClose}>Đóng</Button>
                </div>
                <div className={cx('form-add-resident')} >
                    <h2 >Thêm nhân khẩu mới</h2>
                    <div >
                        <div>
                            <TextField sx={{ m: 1, width: 270 }} label="Họ và tên"
                                inputRef={fullNameRef}
                                variant="standard"
                                defaultValue=''
                            />
                            <TextField sx={{ m: 1, width: 270 }} label="Bí danh"
                                variant="standard"
                                inputRef={aliasRef}
                                defaultValue=''
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker
                                    value={dateOfBirth}
                                    onChange={(newValue) => {
                                        setBirthday(newValue);
                                    }}
                                    inputRef={dateOfBirthRef}
                                    renderInput={({ inputRef, inputProps, InputProps }) =>
                                        <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                                            <InputLabel htmlFor="input_login_account">
                                                Ngày sinh
                                            </InputLabel>
                                            <Input
                                                inputRef={inputRef}
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
                            <TextField sx={{ m: 1, width: 270 }} label="Dân tộc"
                                inputRef={ethnicRef}
                                defaultValue=''
                                variant="standard" />

                        </div>
                        <div>
                            <TextField sx={{ m: 1, width: 556 }}
                                defaultValue=''
                                label="Nơi sinh"
                                variant="standard"
                                inputRef={birthPlaceRef}
                            />
                            <TextField sx={{ m: 1, width: 270 }} label="Nguyên quán"
                                variant="standard"
                                inputRef={nativeLandRef}
                                defaultValue=''
                            />
                            <TextField sx={{ m: 1, width: 270 }} label="Quốc tịch"
                                inputRef={nationRef}
                                defaultValue=''
                                variant="standard" />
                        </div>
                        <div>
                            <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                                <InputLabel htmlFor="input_login_account">
                                    Giới tính
                                </InputLabel>
                                <Select
                                    inputRef={isMaleRef}
                                    defaultValue='male'
                                    id="input_login_account"
                                >
                                    <MenuItem value='male'>
                                        Nam
                                    </MenuItem>
                                    <MenuItem value='femake'>
                                        Nữ
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <TextField sx={{ m: 1, width: 270 }} label="Nghề nghiệp"
                                inputRef={jobRef}
                                variant="standard" />
                            <TextField sx={{ m: 1, width: 556 }} label="Nơi làm việc"
                                inputRef={workplaceRef}
                                variant="standard" />
                        </div>
                        <div>
                            <TextField sx={{ m: 1, width: 270 }} label="CMND/CCCD"
                                error={identityCodeError.length > 0}
                                inputRef={identityCodeRef}
                                variant="standard"
                                helperText={identityCodeError}
                                defaultValue=''
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker
                                    value={idCardDate}
                                    onChange={(newValue) => {
                                        setIdCardDate(newValue);
                                    }}
                                    inputRef={idCardDateRef}
                                    renderInput={({ inputRef, inputProps, InputProps }) =>
                                        <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                                            <InputLabel htmlFor="input_login_account">
                                                Ngày cấp CMND/CCCD
                                            </InputLabel>
                                            <Input
                                                inputRef={inputRef}
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
                            <TextField sx={{ m: 1, width: 270 }} label="Nơi cấp CMND/CCCD"
                                inputRef={idCardPlaceRef}
                                variant="standard"
                                helperText={identityCodeError}
                            />
                        </div>
                        <div>
                            <TextField sx={{ m: 1, width: 270 }} label="Quan hệ với chủ hộ"
                                inputRef={relationShipRef}
                                defaultValue=''
                                variant="standard" />
                            <TextField sx={{ m: 1, width: 270 }} label="Trình độ học vấn"
                                inputRef={academicLevelRef}
                                defaultValue=''
                                variant="standard" />
                            <TextField sx={{ m: 1, width: 270 }} label="Tiền án"
                                inputRef={criminalRecordRef}
                                defaultValue=''
                                variant="standard" />
                        </div>
                        <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker
                                    value={moveInDate}
                                    inputRef={moveInDateRef}
                                    onChange={(newValue) => {
                                        setMoveInDate(newValue)
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) =>
                                        <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                                            <InputLabel htmlFor="input_date_account">
                                                Ngày chuyển đến
                                            </InputLabel>
                                            <Input
                                                inputRef={inputRef}
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
                        <div>
                            <TextField multiline sx={{ m: 1, width: 1130 }} label="Lý do chuyển đến"
                                inputRef={moveInReasonRef}
                                defaultValue=''
                                variant="standard" />
                        </div>
                    </div>
                </div>
            </Dialog>
            <ConfirmBox open={isClose} onClose={handleCloseConfirmBox} onAgree={handleClose} />
        </div >
    );
}