import { forwardRef, useState, useRef, useEffect, useCallback, Fragment } from 'react';
import useAuth from '~/hooks/useAuth';
//material components
import {
    Button, Dialog, Slide, Snackbar, Alert, TextField,
    InputLabel, InputAdornment, Input, FormControl
} from '@mui/material';
import { green } from '@mui/material/colors';
//icons material
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
//style
import classNames from 'classnames/bind';
import styles from './FullScreenDialog.module.scss';
//components
import Population from '../TableTemplate/Population';
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '../../Skeleton';
import ConfirmBox from './ConfirmBox';

//api
import {
    useQuery,
    useMutation,
    useQueryClient,
    useQueries
} from '@tanstack/react-query';
import householdManager from '~/services/api/householdManager';
import residentManager from '~/services/api/residentManager';
const cx = classNames.bind(styles);
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, onClose, idHousehold, resetIfoId, allResidents }) {
    //handle save button
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const { auth } = useAuth();
    //loading data
    const { data, isLoading } = useQuery(['householdDetail', idHousehold], () => householdManager.getHousehold(auth.token, idHousehold));

    //edit mode
    const [editMode, setEditMode] = useState(false);

    //handle when clode this dislog
    const [isClose, setIsClose] = useState(false);

    //data change
    const addressRef = useRef();
    const [createdTime, setCreatedTime] = useState(null);
    const [moveOutDate, setMoveOutDate] = useState(null);
    const moveOutPlaceRef = useRef();
    const moveOutReasonRef = useRef();
    const scopeRef = useRef();

    const queryClient = useQueryClient();

    console.log(data);

    useEffect(() => {
        if (data) {
            setCreatedTime(data.createdTime || null);
            setMoveOutDate(data.moveOutDate || null);
        }
    }, [data]);

    const queryUpdateHousehold = useMutation({
        mutationFn: async (dataChange) => householdManager.updateHousehold(auth.token, data.householdId, dataChange),
        onMutate: async () => {
            setLoading(true);
        },
        onError: () => {
            alert('Bạn không thể cập nhật hộ khẩu này');
            setLoading(false);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries('households');
            await queryClient.invalidateQueries('residents');
            setLoading(false);
            setSuccess(true);
            setEditMode(false);
        }
    });
    const handleCloseConfirmBox = useCallback(() => {
        setIsClose(false);
    }, []);

    // const [open, setOpen] = React.useState(false);
    const handleSuccess = () => {
        setSuccess(false);
    };
    //handle edit mode
    const handleEdit = useCallback(() => {
        setEditMode(true);
        setSuccess(false);
    }, [])
    //handle close this dialog
    const handleClose = () => {
        setEditMode(false);
        resetIfoId();
        onClose(!open);
        setIsClose(false);
    };

    const handlStartClose = () => {
        if (editMode) {
            setIsClose(true);
        }
        else {
            onClose(!open);
            resetIfoId();
        }
    };

    const handleSave = () => {
        const requestBody = {
            householdId: data.householdId,
            address: addressRef.current.value,
            moveOutDate: moveOutDate,
            moveOutPlace: moveOutPlaceRef.current.value,
            moveOutReason: moveOutReasonRef.current.value,
            scope: +scopeRef.current.value,
            nonExistMembers: []
        }
        queryUpdateHousehold.mutate(requestBody);
    }


    return (
        <div>
            <Snackbar open={success} autoHideDuration={6000} onClose={handleSuccess} >
                <Alert onClose={handleSuccess} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    Thay đổi thông tin thành công!
                </Alert>
            </Snackbar>

            <Dialog
                fullWidth={true}
                maxWidth='1000'
                open={open}
                onClose={handlStartClose}
                TransitionComponent={Transition}
            >
                {loading && <LinearProgress />}
                {isLoading ? <Skeleton /> :
                    <Fragment>
                        <div className={cx('header-paper-population')}>
                            <div className={cx('change-and-save')}>
                                <Button variant="contained" disabled={editMode} color="primary" sx={{ fontSize: '1rem' }} onClick={handleEdit}>Chỉnh sửa</Button>
                                {editMode && <Button variant="outlined" color='success'
                                    sx={{ fontSize: '1rem' }} onClick={handleSave}>Lưu</Button>}
                            </div>
                            <Button variant="contained" color="error" sx={{ fontSize: '1rem' }} onClick={handlStartClose}>Đóng</Button>
                        </div>
                        <div className={cx('household-paper')}>
                            <h2 className={cx('title-household')}>Thông tin sổ hộ khẩu</h2>
                            <div className={cx('household-detail')}>
                                <div className={cx('household-detail-line')}>
                                    <TextField
                                        disabled={true}
                                        sx={{ width: 300 }}
                                        inputProps={{ style: { fontSize: 15 } }}
                                        InputLabelProps={{ style: { fontSize: 20 } }}
                                        label="Số hộ khẩu"
                                        defaultValue={data.householdId}
                                        variant="standard"
                                    />
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            disabled={true}
                                            value={createdTime}
                                            onChange={(newValue) => {
                                                setCreatedTime(newValue);
                                            }}
                                            renderInput={({ inputProps, InputProps }) =>
                                                <FormControl sx={{ width: 300 }} variant="standard">
                                                    <InputLabel htmlFor="input_login_account">
                                                        Ngày tạo
                                                    </InputLabel>
                                                    <Input
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
                                    <TextField
                                        disabled={!editMode}
                                        sx={{ width: 650 }}
                                        inputProps={{ style: { fontSize: 15 } }}
                                        InputLabelProps={{ style: { fontSize: 20 } }}
                                        label="Nơi thường trú"
                                        inputRef={addressRef}
                                        defaultValue={data.address || ''}
                                        variant="standard"
                                    />
                                </div>
                                <div className={cx('household-detail-line')}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            value={moveOutDate}
                                            onChange={(newValue) => {
                                                setMoveOutDate(newValue);
                                            }}
                                            renderInput={({ inputProps, InputProps }) =>
                                                <FormControl sx={{ width: 300 }} variant="standard">
                                                    <InputLabel htmlFor="input_login_account">
                                                        Ngày chuyển
                                                    </InputLabel>
                                                    <Input
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
                                    <TextField
                                        disabled={!editMode}
                                        sx={{ width: 300 }}
                                        inputProps={{ style: { fontSize: 15 } }}
                                        InputLabelProps={{ style: { fontSize: 20 } }}
                                        label="Nơi chuyển "
                                        defaultValue={data.moveOutPlace || ''}
                                        inputRef={moveOutPlaceRef}
                                        variant="standard"
                                    />
                                    <TextField
                                        disabled={!editMode}
                                        sx={{ width: 300 }}
                                        inputProps={{ style: { fontSize: 15 } }}
                                        InputLabelProps={{ style: { fontSize: 20 } }}
                                        label="Lý do chuyển "
                                        defaultValue={data.moveOutReason || ''}
                                        variant="standard"
                                        inputRef={moveOutReasonRef}
                                    />
                                    <TextField
                                        disabled={!editMode}
                                        sx={{ width: 300 }}
                                        inputProps={{ style: { fontSize: 15 } }}
                                        InputLabelProps={{ style: { fontSize: 20 } }}
                                        label="Tổ phụ trách"
                                        defaultValue={data.scope || ''}
                                        variant="standard"
                                        inputRef={scopeRef}
                                    />
                                </div>
                            </div>
                        </div>
                        {<Population editMode={editMode} data={
                            allResidents.filter((resident) => {
                                return resident.householdId === idHousehold
                            })}
                        />}
                    </Fragment>
                }
            </Dialog>
            <ConfirmBox open={isClose} onClose={handleCloseConfirmBox} onAgree={handleClose} />
        </div >
    );
}