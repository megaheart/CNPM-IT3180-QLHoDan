import { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import useAuth from '~/hooks/useAuth';
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
import LinearProgress from '@mui/material/LinearProgress';
//style
import classNames from 'classnames/bind';
import styles from './AddResident.module.scss';
import ConfirmBox from '../ConfirmBox';
import residentManager from '~/services/api/residentManager';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
const cx = classNames.bind(styles);
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export default function AddResidentDialog({ open, onClose, type }) {
    const { auth } = useAuth();

    //handle save button
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

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
    const householdIdRef = useRef();
    const idCardDateRef = useRef();
    const idCardPlaceRef = useRef();
    const identityCodeRef = useRef();
    const isDeadRef = useRef();
    const isMaleRef = useRef();
    const isManagedRef = useRef();
    const jobRef = useRef();
    const moveInDateRef = useRef();
    const moveInReasonRef = useRef();
    const moveOutDateRef = useRef();
    const moveOutPlaceRef = useRef();
    const moveOutReasonRef = useRef();
    const nationRef = useRef();
    const nativeLandRef = useRef();
    const relationShipRef = useRef();
    const scopeRef = useRef();
    const workplaceRef = useRef();
    const {
        academicLevel,
        alias,
        birthPlace,
        criminalRecord,
        ethnic,
        fullName,
        householdId,
        idCardPlace,
        identityCode,
        isDead,
        isMale,
        isManaged,
        job,
        moveInReason,
        moveOutPlace,
        moveOutReason,
        nation,
        nativeLand,
        relationShip,
        scope,
        workplace
    } = type.data ? type.data : {
        academicLevel: '',
        alias: '',
        birthPlace: '',
        criminalRecord: '',
        ethnic: '',
        fullName: '',
        householdId: '',
        idCardPlace: '',
        identityCode: '',
        isDead: '',
        isMale: '',
        isManaged: '',
        job: '',
        moveInReason: '',
        moveOutPlace: '',
        moveOutReason: '',
        nation: '',
        nativeLand: '',
        relationShip: '',
        scope: '',
        workplace: ''
    }

    useEffect(() => {
        if (type.data) {
            setBirthday(dayjs(type.data.dateOfBirth))
            setIdCardDate(dayjs(type.data.idCardDate))
            setMoveOutDate(dayjs(type.data.moveOutDate))
            setMoveInDate(dayjs(type.data.moveInDate))
        }
        else {
            setBirthday(dayjs('2020-01-01'))
            setIdCardDate(dayjs('2020-01-01'))
            setMoveOutDate(dayjs('2020-01-01'))
            setMoveInDate(dayjs('2020-01-01'))
        }
    }, [type.data])

    const handleUpdate = async () => {
        console.log('UPDATEING....');
        console.log('dateOfBirth', dateOfBirth);

        const currentData = {
            fullName: fullNameRef.current.value,
            alias: aliasRef.current.value,
            dateOfBirth: dateOfBirth.$d,
            isMale: isMaleRef.current.value === 'male' ? true : false,
            birthPlace: birthPlaceRef.current.value,
            nativeLand: nativeLandRef.current.value,
            ethnic: ethnicRef.current.value,
            nation: nationRef.current.value,
            job: jobRef.current.value,
            workplace: workplaceRef.current.value,
            identityCode: identityCodeRef.current.value,
            idCardDate: idCardDate.$d,
            idCardPlace: idCardPlaceRef.current.value,
            relationShip: relationShipRef.current.value,
            academicLevel: academicLevelRef.current.value,
            criminalRecord: criminalRecordRef.current.value,
            moveInDate: moveInDate.$d,
            moveInReason: moveInReasonRef.current.value,
            moveOutPlace: moveOutPlaceRef.current.value,
            moveOutDate: moveOutDate.$d,
            moveOutReason: moveOutReasonRef.current.value,
            scope: scopeRef.current.value ? +scopeRef.current.value : null,
            householdId: householdIdRef.current.value || null,
        }
        console.log(currentData)
        const identityCodeCheck = validation.checkIdentifi(currentData.identityCode);
        if (identityCodeCheck.isValid) {
            setIdentityCodeError(identityCodeCheck.message);
            setLoading(false);
            return;
        }
        else {
            setIdentityCodeError('');
            if (type.type !== 'UPDATE') {
                await type.mutation.mutate(currentData);
                onClose(false);
                setSuccess(true);
                setLoading(false);
            }
        }
    }
    const handleAdd = async () => {
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
            scope: scopeRef.current.value ? +scopeRef.current.value : null,
            householdId: householdIdRef.current.value ? householdIdRef.current.value : null
        }
        console.log(currentData)
        const identityCodeCheck = validation.checkIdentifi(currentData.identityCode);
        if (!identityCodeCheck.isValid) {
            setIdentityCodeError(identityCodeCheck.message);
            setLoading(false);
            return;
        }
        else {
            console.log('ADDING CONTINUE....')
            setIdentityCodeError('');
            if (type.type === 'ADD') {
                await type.mutation.mutate(currentData);
                onClose(false);
                setSuccess(true);
                setLoading(false);
            }
        }
    }

    const actionForm = async () => {
        setSuccess(false);
        setLoading(true);
        if (type.type === 'ADD') {
            await handleAdd();
        }
        else {
            await handleUpdate();
        }
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
    // const [open, setOpen] = React.useState(false);
    const handleSuccess = () => {
        setSuccess(false);
    };
    //handle close this dialog
    const handleClose = () => {
        onClose(!open);
        setIsClose(false);
    };
    return (
        <div>
            <Snackbar open={success} autoHideDuration={3000} onClose={handleSuccess} >
                <Alert onClose={handleSuccess} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    {type.type === 'ADD' ? 'Thêm' : 'Cập nhật'} nhân khẩu thành công !
                </Alert>
            </Snackbar>
            <Dialog
                fullWidth={true}
                maxWidth='600'
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <div className={cx('header-paper-resident')}>

                    <Button variant="contained" color="success"
                        sx={{ fontSize: 15, margin: '2 0', width: 120 }} onClick={actionForm}>{type.type === 'ADD' ? 'Thêm' : 'Cập nhật'}</Button>

                    <Button variant="contained" color="error"
                        sx={{ fontSize: 15, margin: '2 0', width: 60 }} onClick={handlStartClose}>Đóng</Button>

                </div>

                <div className={cx('resident-paper')}>
                    {loading && <LinearProgress color="success" />}
                    <h2 className={cx('title-resident')}>{type.type === 'ADD' ? 'Thêm nhân khẩu mới' : 'Chi tiết nhân khẩu'}</h2>
                    <div className={cx('resident-detail')}>
                        <div>
                            <TextField sx={{ m: 1, width: 270 }} label="Họ và tên"
                                inputRef={fullNameRef}
                                variant="standard"
                                defaultValue={fullName}
                                aria-readonly={true}
                            />
                            <TextField sx={{ m: 1, width: 270 }} label="Bí danh"
                                variant="standard"
                                inputRef={aliasRef}
                                defaultValue={alias}
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
                                variant="standard"
                                defaultValue={ethnic} />
                        </div>
                        <div>
                            <TextField sx={{ m: 1, width: 556 }} label="Nơi sinh"
                                variant="standard"
                                inputRef={birthPlaceRef}
                                defaultValue={birthPlace}
                            />
                            <TextField sx={{ m: 1, width: 270 }} label="Nguyên quán"
                                variant="standard"
                                inputRef={nativeLandRef}
                                defaultValue={nativeLand}
                            />
                            <TextField sx={{ m: 1, width: 270 }} label="Quốc tịch"
                                inputRef={nationRef}
                                defaultValue={nation}
                                variant="standard" />
                        </div>
                        <div>
                            <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                                <InputLabel htmlFor="input_login_account">
                                    Giới tính
                                </InputLabel>
                                <Select
                                    inputRef={isMaleRef}
                                    defaultValue={isMale ? 'male' : 'femake'}
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
                                defaultValue={job}
                                inputRef={jobRef}
                                variant="standard" />
                            <TextField sx={{ m: 1, width: 556 }} label="Nơi làm việc"
                                defaultValue={workplace}
                                inputRef={workplaceRef}
                                variant="standard" />
                        </div>
                        <div>
                            <TextField sx={{ m: 1, width: 270 }} label="CMND/CCCD"
                                error={identityCodeError.length > 0}
                                defaultValue={identityCode}
                                disabled={type.type === 'VIEW_AND_UPDATE'}
                                inputRef={identityCodeRef}
                                variant="standard"
                                helperText={identityCodeError}
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
                                defaultValue={idCardPlace}
                                inputRef={idCardPlaceRef}
                                variant="standard"
                                helperText={identityCodeError}
                            />
                            <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                                <InputLabel htmlFor="input_login_account">
                                    Tình trạng
                                </InputLabel>
                                <Select
                                    defaultValue={isDead ? 'yes' : 'no'}
                                    inputRef={isDeadRef}

                                    id="input_login_account"
                                >
                                    <MenuItem value='yes'>
                                        Đã chết
                                    </MenuItem>
                                    <MenuItem value='no'>
                                        Còn sống
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <TextField sx={{ m: 1, width: 270 }} label="Quan hệ với chủ hộ"
                                defaultValue={relationShip}
                                inputRef={relationShipRef}
                                variant="standard" />
                            <TextField label="Sổ hộ khẩu thuộc về"
                                defaultValue={householdId}
                                inputRef={householdIdRef}
                                sx={{ m: 1, width: 270 }}
                                variant="standard" />
                            <TextField sx={{ m: 1, width: 270 }} label="Trình độ học vấn"
                                defaultValue={academicLevel}
                                inputRef={academicLevelRef}
                                variant="standard" />
                            <TextField sx={{ m: 1, width: 270 }} label="Tiền án"
                                defaultValue={criminalRecord}
                                inputRef={criminalRecordRef}
                                variant="standard" />
                        </div>
                        <div>
                            <TextField sx={{ m: 1, width: 270 }}
                                inputRef={moveOutPlaceRef}
                                defaultValue={moveOutPlace}
                                label="Nơi chuyển đi"
                                variant="standard" />

                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker
                                    value={moveOutDate}
                                    inputRef={moveOutDateRef}
                                    onChange={(newValue) => {
                                        setMoveOutDate(newValue)
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) =>
                                        <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                                            <InputLabel htmlFor="input_date_account">
                                                Ngày chuyển đi
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
                            <TextField sx={{ m: 1, width: 270 }} label="Tổ quản lý"
                                inputRef={scopeRef}
                                defaultValue={scope}
                                variant="standard" />
                        </div>
                        <div>
                            <TextField multiline sx={{ m: 1, width: 1130 }} label="Lý do chuyển đi"
                                defaultValue={moveOutReason}
                                inputRef={moveOutReasonRef}
                                variant="standard" />

                            <TextField multiline sx={{ m: 1, width: 1130 }} label="Lý do chuyển đến"
                                defaultValue={moveInReason}
                                inputRef={moveInReasonRef}
                                variant="standard" />
                        </div>
                    </div>
                </div>
            </Dialog>
            <ConfirmBox open={isClose} onClose={handleCloseConfirmBox} onAgree={handleClose} />
        </div >
    );
}