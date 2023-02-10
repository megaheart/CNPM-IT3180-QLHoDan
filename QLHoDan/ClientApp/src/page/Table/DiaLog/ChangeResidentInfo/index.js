import { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import useAuth from '~/hooks/useAuth';
//validate
import validation from '~/services/validate/index.js';
//material components
import {
    Button, Dialog, Slide, Snackbar, Alert,
    TextField, MenuItem, InputLabel, InputAdornment, Input, FormControl, Select
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import LinearProgress from '@mui/material/LinearProgress';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
//style
import classNames from 'classnames/bind';
import styles from './AddResident.module.scss';
import ConfirmBox from '../ConfirmBox';
import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import residentManager from '~/services/api/residentManager';

const cx = classNames.bind(styles);
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function UpdateResidentDialog({ open, onClose, dataId }) {
    const { auth } = useAuth();

    //handle save button
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [identityCodeError, setIdentityCodeError] = useState('');

    const { data, isLoading } = useQuery(['residentDetail', dataId], () => residentManager.getResident(auth.token, dataId));
    const queryClient = useQueryClient();
    const mutation = useMutation((data) => residentManager.updateResident(auth.token, data), {
        onSuccess: async () => {
            await queryClient.invalidateQueries(['residentDetail', dataId]);
            await queryClient.invalidateQueries(['allResidents']);
            await queryClient.invalidateQueries(['householdDetail']);

            setLoading(false);
            setSuccess(true);
            onClose();
        },
    });

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

    useEffect(
        () => {
            if (data) {
                setBirthday(dayjs(data.dateOfBirth || null) || null);
                setIdCardDate(dayjs(data.idCardDate || null) || null);
                setMoveOutDate(dayjs(data.moveOutDate || null) || null);
                setMoveInDate(dayjs(data.moveInDate || null) || null);
            }
        }, [data]
    )

    const handleUpdate = async () => {

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
            idCardDate: idCardDate.$d || null,
            idCardPlace: idCardPlaceRef.current.value,
            relationShip: relationShipRef.current.value,
            academicLevel: academicLevelRef.current.value,
            criminalRecord: criminalRecordRef.current.value,
            moveInDate: moveInDate.$d || null,
            moveInReason: moveInReasonRef.current.value,
            moveOutPlace: moveOutPlaceRef.current.value,
            moveOutDate: moveOutDate.$d || null,
            moveOutReason: moveOutReasonRef.current.value,
            scope: scopeRef.current.value ? +scopeRef.current.value : null,
            householdId: householdIdRef.current.value || null,
        }
        setIdentityCodeError('');
        mutation.mutate(
            currentData
        )
    }
    //handle when clode this dislog
    const [isClose, setIsClose] = useState(false);
    const handleCloseConfirmBox = useCallback(() => {
        setIsClose(false);
    }, []);

    //start close this dialog
    const handlStartClose = () => {
        console.log(fullNameRef.current.value !== data.fullName);
        console.log(aliasRef.current.value !== data.alias);
        console.log(isMaleRef.current.value !== (data.isMale === true ? 'male' : 'female'))
        console.log(birthPlaceRef.current.value !== data.birthPlace);
        console.log(nativeLandRef.current.value !== data.nativeLand);
        console.log(ethnicRef.current.value !== data.ethnic);
        console.log(nationRef.current.value !== data.nation);
        console.log(jobRef.current.value !== data.job);
        console.log(workplaceRef.current.value !== data.workplace);
        console.log(identityCodeRef.current.value !== data.identityCode);
        console.log(idCardPlaceRef.current.value !== data.idCardPlace);
        console.log(relationShipRef.current.value !== data.relationShip);
        console.log(academicLevelRef.current.value !== data.academicLevel);
        console.log(criminalRecordRef.current.value !== data.criminalRecord);
        console.log(moveInReasonRef.current.value !== data.moveInReason);
        console.log(moveOutReasonRef.current.value !== data.moveOutReason);
        console.log(moveOutPlaceRef.current.value !== data.moveOutPlace);

        if (
            fullNameRef.current.value !== (data.fullName || '') ||
            aliasRef.current.value !== (data.alias || '') ||
            isMaleRef.current.value !== (data.isMale === true ? 'male' : 'female') ||
            birthPlaceRef.current.value !== (data.birthPlace || '') ||
            nativeLandRef.current.value !== (data.nativeLand || '') ||
            ethnicRef.current.value !== (data.ethnic || '') ||
            nationRef.current.value !== (data.nation || '') ||
            jobRef.current.value !== (data.job || '') ||
            workplaceRef.current.value !== data.workplace ||
            identityCodeRef.current.value !== (data.identityCode || '') ||
            idCardPlaceRef.current.value !== (data.idCardPlace || '') ||
            relationShipRef.current.value !== data.relationShip ||
            academicLevelRef.current.value !== (data.academicLevel || '') ||
            criminalRecordRef.current.value !== (data.criminalRecord || '') ||
            moveInReasonRef.current.value !== (data.moveInReason || '') ||
            moveOutPlaceRef.current.value !== (data.moveOutPlace || '') ||
            moveOutReasonRef.current.value !== (data.moveOutReason || '') ||
            +scopeRef.current.value !== (data.scope || '') ||
            householdIdRef.current.value !== (data.householdId || '')
            || dayjs(dateOfBirth).format('DD/MM/YYYY') !== dayjs(data.dateOfBirth).format('DD/MM/YYYY') ||
            dayjs(idCardDate).format('DD/MM/YYYY') !== dayjs(data.idCardDate).format('DD/MM/YYYY') ||
            dayjs(moveOutDate).format('DD/MM/YYYY') !== dayjs(data.moveOutDate).format('DD/MM/YYYY') ||
            dayjs(moveInDate).format('DD/MM/YYYY') !== dayjs(data.moveInDate).format('DD/MM/YYYY')
        ) {
            setIsClose(true);
        }
        else {
            onClose();
        }

    };
    // const [open, setOpen] = React.useState(false);
    const handleSuccess = () => {
        setSuccess(false);
    };
    //handle close this dialog
    const handleClose = () => {
        onClose();
        setIsClose(false);
    };
    return (
        <div>
            <Snackbar open={success} autoHideDuration={3000} onClose={handleSuccess} >
                <Alert onClose={handleSuccess} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    Cập nhật nhân khẩu thành công !
                </Alert>
            </Snackbar>
            <Dialog
                fullWidth={true}
                maxWidth='600'
                open={open}
                onClose={handlStartClose}
                TransitionComponent={Transition}
            >
                <div className={cx('header-paper-resident')}>
                    <Button variant="contained" color="success"
                        sx={{ fontSize: 15, margin: '2 0', width: 120 }} onClick={handleUpdate}>Cập nhật</Button>

                    <Button variant="contained" color="error"
                        sx={{ fontSize: 15, margin: '2 0', width: 60 }} onClick={handlStartClose}>Đóng</Button>
                </div>
                {loading && <LinearProgress color="success" />}
                {!isLoading ?
                    <div className={cx('resident-paper')}>

                        <h2>Chi tiết nhân khẩu</h2>
                        <div className={cx('resident-detail')}>
                            <div>
                                <TextField sx={{ m: 1, width: 270 }} label="Họ và tên"
                                    inputRef={fullNameRef}
                                    variant="standard"
                                    defaultValue={data.fullName}
                                    aria-readonly={true}
                                />
                                <TextField sx={{ m: 1, width: 270 }} label="Bí danh"
                                    variant="standard"
                                    inputRef={aliasRef}
                                    defaultValue={data.alias}
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
                                    defaultValue={data.ethnic} />
                            </div>
                            <div>
                                <TextField sx={{ m: 1, width: 556 }} label="Nơi sinh"
                                    variant="standard"
                                    inputRef={birthPlaceRef}
                                    defaultValue={data.birthPlace}
                                />
                                <TextField sx={{ m: 1, width: 270 }} label="Nguyên quán"
                                    variant="standard"
                                    inputRef={nativeLandRef}
                                    defaultValue={data.nativeLand}
                                />
                                <TextField sx={{ m: 1, width: 270 }} label="Quốc tịch"
                                    inputRef={nationRef}
                                    defaultValue={data.nation}
                                    variant="standard" />
                            </div>
                            <div>
                                <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                                    <InputLabel htmlFor="input_login_account">
                                        Giới tính
                                    </InputLabel>
                                    <Select
                                        inputRef={isMaleRef}
                                        defaultValue={data.isMale ? 'male' : 'female'}
                                        id="input_login_account"
                                    >
                                        <MenuItem value='male'>
                                            Nam
                                        </MenuItem>
                                        <MenuItem value='female'>
                                            Nữ
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField sx={{ m: 1, width: 270 }} label="Nghề nghiệp"
                                    defaultValue={data.job}
                                    inputRef={jobRef}
                                    variant="standard" />
                                <TextField sx={{ m: 1, width: 556 }} label="Nơi làm việc"
                                    defaultValue={data.workplace}
                                    inputRef={workplaceRef}
                                    variant="standard" />
                            </div>
                            <div>
                                <TextField sx={{ m: 1, width: 270 }} label="CMND/CCCD"
                                    error={identityCodeError.length > 0}
                                    defaultValue={data.identityCode}
                                    disabled={true}
                                    inputRef={identityCodeRef}
                                    variant="standard"
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
                                    defaultValue={data.idCardPlace}
                                    inputRef={idCardPlaceRef}
                                    variant="standard"
                                    helperText={identityCodeError}
                                />
                                <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                                    <InputLabel htmlFor="input_login_account">
                                        Tình trạng
                                    </InputLabel>
                                    <Select
                                        defaultValue={data.isDead ? 'yes' : 'no'}
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
                                    defaultValue={data.relationShip}
                                    inputRef={relationShipRef}
                                    variant="standard" />
                                <TextField label="Sổ hộ khẩu thuộc về"
                                    defaultValue={data.householdId}
                                    inputRef={householdIdRef}
                                    sx={{ m: 1, width: 270 }}
                                    variant="standard" />
                                <TextField sx={{ m: 1, width: 270 }} label="Trình độ học vấn"
                                    defaultValue={data.academicLevel}
                                    inputRef={academicLevelRef}
                                    variant="standard" />
                                <TextField sx={{ m: 1, width: 270 }} label="Tiền án"
                                    defaultValue={data.criminalRecord}
                                    inputRef={criminalRecordRef}
                                    variant="standard" />
                            </div>
                            <div>
                                <TextField sx={{ m: 1, width: 270 }}
                                    inputRef={moveOutPlaceRef}
                                    defaultValue={data.moveOutPlace}
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
                                    defaultValue={data.scope}
                                    variant="standard" />
                            </div>
                            <div>
                                <TextField multiline sx={{ m: 1, width: 1130 }} label="Lý do chuyển đi"
                                    defaultValue={data.moveOutReason}
                                    inputRef={moveOutReasonRef}
                                    variant="standard" />

                                <TextField multiline sx={{ m: 1, width: 1130 }} label="Lý do chuyển đến"
                                    defaultValue={data.moveInReason}
                                    inputRef={moveInReasonRef}
                                    variant="standard" />
                            </div>
                        </div>
                    </div>
                    : <div>
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                    </div>
                }
            </Dialog>
            <ConfirmBox title='Đóng cửa sổ thay đổi nhân khẩu' open={isClose} onClose={handleCloseConfirmBox} onAgree={handleClose} />
        </div >
    );
}