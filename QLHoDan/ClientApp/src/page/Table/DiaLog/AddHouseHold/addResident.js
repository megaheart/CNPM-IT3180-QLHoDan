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


export default function AddResidentDialog({ open, onClose, action, data = null }) {

    const [identityCodeError, setIdentityCodeError] = useState('');

    const [dateOfBirth, setBirthday] = useState(null);
    const [idCardDate, setIdCardDate] = useState(null);
    const [moveInDate, setMoveInDate] = useState(null);

    const academicLevelRef = useRef();
    const aliasRef = useRef();
    const birthPlaceRef = useRef();
    const criminalRecordRef = useRef();
    const ethnicRef = useRef();
    const fullNameRef = useRef();
    const idCardPlaceRef = useRef();
    const identityCodeRef = useRef();
    const isMaleRef = useRef();
    const jobRef = useRef();
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
        if (currentData.identityCode !== '') {
            action(currentData);
            onClose(false);
        }
    }

    useEffect(
        () => {
            if (data) {
                setBirthday(dayjs(data.dateOfBirth));
                setIdCardDate(dayjs(data.idCardDate));
                setMoveInDate(dayjs(data.moveInDate));
            }
        }, []
    )

    //handle when clode this dislog
    const [isClose, setIsClose] = useState(false);
    const handleCloseConfirmBox = useCallback(() => {
        setIsClose(false);
    }, []);

    //start close this dialog
    const handlStartClose = () => {
        if (
            fullNameRef.current.value !== (data ? data.fullName : '') ||
            aliasRef.current.value !== (data ? data.alias : '') ||
            birthPlaceRef.current.value !== (data ? data.birthPlace : '') ||
            isMaleRef.current.value !== (data ? (data.isMale ? 'male' : 'female') : 'male') ||
            nativeLandRef.current.value !== (data ? data.nativeLand : '') ||
            ethnicRef.current.value !== (data ? data.ethnic : '') ||
            nationRef.current.value !== (data ? data.nation : '') ||
            jobRef.current.value !== (data ? data.job : '') ||
            workplaceRef.current.value !== (data ? data.workplace : '') ||
            identityCodeRef.current.value !== (data ? data.identityCode : '') ||
            idCardPlaceRef.current.value !== (data ? data.idCardPlace : '') ||
            relationShipRef.current.value !== (data ? data.relationShip : '') ||
            academicLevelRef.current.value !== (data ? data.academicLevel : '') ||
            criminalRecordRef.current.value !== (data ? data.criminalRecord : '') ||
            moveInReasonRef.current.value !== (data ? data.moveInReason : '')
        ) {
            setIsClose(true);
        }
        else {
            onClose(!open);
        }

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
                onClose={handlStartClose}
                TransitionComponent={Transition}
            >
                <div className={cx('state-dialog')} >
                    <Button variant="contained" color="success"
                        sx={{ fontSize: 15, margin: '2 0', width: 100 }} onClick={handleAdd}>{data ? 'C???p nh???t' : 'Th??m'}</Button>
                    <Button variant="contained" color="error"
                        sx={{ fontSize: 15, margin: '2 0', width: 60 }} onClick={handlStartClose}>????ng</Button>
                </div>
                <div className={cx('form-add-resident')} >
                    <h2 >{data ? 'Th??ng tin nh??n kh???u c???n th??m' : 'Th??m nh??n kh???u m???i'}</h2>
                    <div >
                        <div>
                            <TextField sx={{ m: 1, width: 270 }} label="H??? v?? t??n"
                                inputRef={fullNameRef}
                                variant="standard"
                                defaultValue={data ? data.fullName : ''}
                            />
                            <TextField sx={{ m: 1, width: 270 }} label="B?? danh"
                                variant="standard"
                                inputRef={aliasRef}
                                defaultValue={data ? data.alias : ''}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker
                                    value={dateOfBirth}
                                    onChange={(newValue) => {
                                        setBirthday(newValue);
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) =>
                                        <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                                            <InputLabel htmlFor="input_login_account">
                                                Ng??y sinh
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
                            <TextField sx={{ m: 1, width: 270 }} label="D??n t???c"
                                inputRef={ethnicRef}
                                defaultValue={data ? data.ethnic : ''}
                                variant="standard" />

                        </div>
                        <div>
                            <TextField sx={{ m: 1, width: 556 }}
                                defaultValue={data ? data.birthPlace : ''}
                                label="N??i sinh"
                                variant="standard"
                                inputRef={birthPlaceRef}
                            />
                            <TextField sx={{ m: 1, width: 270 }} label="Nguy??n qu??n"
                                variant="standard"
                                inputRef={nativeLandRef}
                                defaultValue={data ? data.nativeLand : ''}
                            />
                            <TextField sx={{ m: 1, width: 270 }} label="Qu???c t???ch"
                                inputRef={nationRef}
                                defaultValue={data ? data.nation : ''}
                                variant="standard" />
                        </div>
                        <div>
                            <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                                <InputLabel htmlFor="input_login_account">
                                    Gi???i t??nh
                                </InputLabel>
                                <Select
                                    inputRef={isMaleRef}
                                    defaultValue={data ? (data.isMale ? 'male' : 'female') : 'male'}
                                    id="input_login_account"
                                >
                                    <MenuItem value='male'>
                                        Nam
                                    </MenuItem>
                                    <MenuItem value='femake'>
                                        N???
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <TextField sx={{ m: 1, width: 270 }}
                                label="Ngh??? nghi???p"
                                inputRef={jobRef}
                                variant="standard"
                                defaultValue={data ? data.job : ''}
                            />
                            <TextField sx={{ m: 1, width: 556 }} label="N??i l??m vi???c"
                                defaultValue={data ? data.workplace : ''}
                                inputRef={workplaceRef}
                                variant="standard" />
                        </div>
                        <div>
                            <TextField sx={{ m: 1, width: 270 }} label="CMND/CCCD"
                                error={identityCodeError.length > 0}
                                inputRef={identityCodeRef}
                                variant="standard"
                                helperText={identityCodeError}
                                defaultValue={data ? data.identityCode : ''}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker
                                    value={idCardDate}
                                    onChange={(newValue) => {
                                        setIdCardDate(newValue);
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) =>
                                        <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                                            <InputLabel htmlFor="input_login_account">
                                                Ng??y c???p CMND/CCCD
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
                            <TextField sx={{ m: 1, width: 270 }} label="N??i c???p CMND/CCCD"
                                inputRef={idCardPlaceRef}
                                variant="standard"
                                defaultValue={data ? data.idCardPlace : ''}
                                helperText={identityCodeError}
                            />
                        </div>
                        <div>
                            <TextField sx={{ m: 1, width: 270 }} label="Quan h??? v???i ch??? h???"
                                inputRef={relationShipRef}
                                defaultValue={data ? data.relationShip : ''}
                                variant="standard" />
                            <TextField sx={{ m: 1, width: 270 }} label="Tr??nh ????? h???c v???n"
                                inputRef={academicLevelRef}
                                defaultValue={data ? data.academicLevel : ''}
                                variant="standard" />
                            <TextField sx={{ m: 1, width: 270 }} label="Ti???n ??n"
                                inputRef={criminalRecordRef}
                                defaultValue={data ? data.criminalRecord : ''}
                                variant="standard" />
                        </div>
                        <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker
                                    value={moveInDate}
                                    onChange={(newValue) => {
                                        setMoveInDate(newValue)
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) =>
                                        <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                                            <InputLabel htmlFor="input_date_account">
                                                Ng??y chuy???n ?????n
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
                            <TextField multiline sx={{ m: 1, width: 1130 }} label="L?? do chuy???n ?????n"
                                inputRef={moveInReasonRef}
                                defaultValue={data ? data.moveInReason : ''}
                                variant="standard" />
                        </div>
                    </div>
                </div>
            </Dialog>
            <ConfirmBox open={isClose} onClose={handleCloseConfirmBox} onAgree={handleClose} />
        </div >
    );
}