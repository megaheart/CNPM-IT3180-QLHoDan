import Button from '@mui/material/Button';
import classNames from 'classnames/bind';
import styles from './CreateEvent.module.scss';
import { useState, useRef, useEffect } from 'react';
import {
    TextField, FormControl, InputLabel, MenuItem,
    Select, InputAdornment, Input, Snackbar, Alert, Backdrop, CircularProgress
} from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import useAuth from '~/hooks/useAuth';
import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import awardApi from '~/services/api/awardApi';
//import ListAchievementAward from '../SetupAchivementAward';
//import ListSpecialAward from '../SetupSpecialAward/';

const cx = classNames.bind(styles);

function CreateEvent({ checkChange }) {
    const { auth } = useAuth();

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const typeRef = useRef(null);
    const [closingFormDate, setClosingFormDate] = useState(null);
    const [rewardDate, setRewardDate] = useState(null);
    const messageToSpecialAccountRef = useRef(null);

    const closingFormDateRef = useRef(null);
    const rewardDateRef = useRef(null);

    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const queryClient = useQueryClient();

    const mutateCreateAwardEvent = useMutation((data) => awardApi.createRewardEvent(auth.token, data), {
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['rewardEvents']);
            setSuccess(true);
            titleRef.current.value = '';
            descriptionRef.current.value = '';
            typeRef.current.value = 'TTHT';
            setClosingFormDate(null);
            setRewardDate(null);
            messageToSpecialAccountRef.current.value = '';
        },
        onSettled: () => {
            setLoading(false);
        }
    });


    const handleCloseSnackbar = () => {
        setSuccess(false);
    };

    const handleCreateAwardEvent = () => {
        const data = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            type: typeRef.current.value,
            closingFormDate: closingFormDate,
            rewardDate: rewardDate,
            messageToSpecialAccount: messageToSpecialAccountRef.current.value
        }
        mutateCreateAwardEvent.mutate(data);
    };

    useEffect(
        () => {
            if (checkChange.stateChange) {
                if (
                    titleRef.current.value !== '' ||
                    descriptionRef.current.value !== '' ||
                    typeRef.current.value !== 'TTHT' ||
                    closingFormDate !== null ||
                    rewardDate !== null ||
                    messageToSpecialAccountRef.current.value !== ''
                ) {
                    checkChange.setIsClose(true);
                }
                else {
                    checkChange.setStatus(1);
                    checkChange.setStateChange(false);
                }
            }

        }, [checkChange, closingFormDate, rewardDate]
    );

    return (
        <div className={cx('award-form')}>
            <Snackbar open={success} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    Thêm dịp thưởng thành công!
                </Alert>
            </Snackbar>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <TextField sx={{ m: 1, }} label="Tên đợt thưởng"
                inputRef={titleRef}
                defaultValue=''
                variant="standard" />
            <TextField sx={{ m: 1, }} label="Mô tả"
                inputRef={descriptionRef}
                defaultValue=''
                variant="standard" />

            <FormControl sx={{ m: 1, }} variant="standard">
                <InputLabel sx={{ fontSize: 22 }} >
                    Loại thưởng
                </InputLabel>
                <Select
                    defaultValue='TTHT'
                    inputRef={typeRef}
                    sx={{ fontSize: 20, width: 500 }}
                >
                    <MenuItem sx={{ fontSize: 20 }} value='TTHT'>
                        Dịp đặc biệt
                    </MenuItem>
                    <MenuItem sx={{ fontSize: 20 }} value='TT'>
                        Thành tích học tập
                    </MenuItem>
                </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={closingFormDate}
                    onChange={(newValue) => {
                        setClosingFormDate(newValue);
                    }}
                    inputRef={closingFormDateRef}
                    renderInput={({ inputRef, inputProps, InputProps }) =>
                        <FormControl sx={{ m: 1, width: 500 }} variant="standard">
                            <InputLabel sx={{ fontSize: 20 }} htmlFor="input_time" >
                                Thời gian kết thúc xác nhận minh chứng
                            </InputLabel>
                            <Input
                                inputRef={inputRef}
                                id="input_time"
                                sx={{ fontSize: 20 }}
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={rewardDate}
                    onChange={(newValue) => {
                        setRewardDate(newValue);
                    }}
                    inputRef={rewardDateRef}
                    renderInput={({ inputProps, inputRef, InputProps }) =>
                        <FormControl sx={{ m: 1, width: 500 }} variant="standard">
                            <InputLabel sx={{ fontSize: 20 }} htmlFor="input_time_award" >
                                Thời gian trao thưởng
                            </InputLabel>
                            <Input
                                {...inputProps}
                                inputRef={inputRef}
                                id='input_time_award'
                                sx={{ fontSize: 20 }}
                                endAdornment={
                                    <InputAdornment position="start">
                                        {InputProps?.endAdornment}
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    }
                />
            </LocalizationProvider>
            <TextField sx={{ m: 1, padding: '0 5px' }}
                label="Nội dung thông báo đến các tài khoản cấp  đặc biệt"
                inputRef={messageToSpecialAccountRef}
                variant="standard"
                multiline
                defaultValue=''
                rows={2}
            />
            <Button onClick={handleCreateAwardEvent} sx={{ m: 1, fontSize: 25 }} variant="contained" color="primary">
                Tạo dịp thưởng mới
            </Button>
            {/* <section className={cx('award-2')}>
                {typeOfEvent === 'special' ?
                    <ListSpecialAward /> :
                    <ListAchievementAward />}
            </section> */}
        </div>
    );
}

export default CreateEvent;