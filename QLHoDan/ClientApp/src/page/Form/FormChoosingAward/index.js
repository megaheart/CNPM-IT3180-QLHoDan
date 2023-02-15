import { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Backdrop, CircularProgress } from '@mui/material';
import useAuth from '~/hooks/useAuth';
import styles from './DeathConfirm.module.scss'
import classNames from 'classnames/bind';
import formRewardForChance from '~/services/api/formRewardForChance';
import { useQuery, useMutation } from '@tanstack/react-query';
const cx = classNames.bind(styles);

export default function FormChoosingAward() {
    const { auth } = useAuth();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const mutationSend = useMutation((formData) => formRewardForChance.sendFormRewardForChance(auth.token, formData), {
        onMutate: () => {
            setOpen(true);
        },
        onSuccess: (data) => {
            alert('Gửi thành công');
        },
        onError: (error) => {
            alert('Gửi thất bại');
        },
        onSettled: () => {
            setOpen(false);
        }
    });


    const ResidentIdCodeRef = useRef(null);
    const RewardCeremonyIdRef = useRef(null);
    const PresentsTypeRef = useRef(null);

    const handleSendForm = async () => {
        setOpen(true);
        const formData = new FormData();
        formData.append('ResidentIdCode', ResidentIdCodeRef.current.value);
        formData.append('RewardCeremonyId', RewardCeremonyIdRef.current.value);
        formData.append('PresentsType', +PresentsTypeRef.current.value);
        mutationSend.mutate(formData);
    }

    return (
        <div className={cx('container')}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    marginBottom: '5px',
                    padding: 2,
                    backgroundColor: '#fff',
                }}
                noValidate
                autoComplete="off"
            >
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                //onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <h1>Đơn chọn phần quà dịp đặc biệt</h1>
                <div className={cx('choosing-form')}>
                    <TextField
                        label="ID của cháu"
                        inputProps={{
                            style: { fontSize: 20 }
                        }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        inputRef={ResidentIdCodeRef}
                        variant="standard" />
                    <TextField
                        label="ID của dịp thưởng muốn nộp đến"
                        inputProps={{
                            style: { fontSize: 20 }
                        }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        inputRef={RewardCeremonyIdRef}
                        variant="standard" />
                    <TextField
                        label="Loại phần quà muốn nhận"
                        inputProps={{
                            style: { fontSize: 20 }
                        }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        inputRef={PresentsTypeRef}
                        variant="standard" />

                </div>
                <Button onClick={handleSendForm} style={{ margin: '0 auto', display: 'block' }} variant="contained">Gửi</Button>
            </Box>
        </div>
    );
}