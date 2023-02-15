import { forwardRef, useState, Fragment } from 'react';
import useAuth from '~/hooks/useAuth';

//material components
import {
    Button, Dialog, Slide, Backdrop, CircularProgress
} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

import ErrorData from '~/page/ErrorData';
//style
import classNames from 'classnames/bind';

import { InputBase } from '../../Award/components';
import Grid from '@mui/material/Grid';

import TableSkeleton from '~/page/Skeleton';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';

import styles from './Award.module.scss';
import formRewardForChance from '~/services/api/formRewardForChance';
import ConfirmBox from '~/components/component/Dialog/ConfirmBox';

const cx = classNames.bind(styles);
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});




export default function FormChoosingDetail({ open, onClose, idForm }) {
    const { auth } = useAuth();
    //handle save button
    const [loading, setLoading] = useState(false);

    const [openBackdrop, setOpenBackdrop] = useState(false);

    const [openConfirm, setOpenConfirm] = useState(false);

    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery(
        ['getFormAwardById', auth.username],
        async () => await formRewardForChance.getDetailFormRewardForChanceById(auth.token, idForm),
    );

    const mutateDeleteForm = useMutation(
        async (idForm) => await formRewardForChance.deleteFormRewardForChance(auth.token, idForm),
        {
            onMutate: () => {
                setOpenBackdrop(true);
            },
            onSuccess: () => {
                queryClient.invalidateQueries(['formRewardForChance', auth.username]);
                setOpenBackdrop(false);
                handleClose();
                setOpenConfirm(false);
            },
            onError: () => {
                alert('Lỗi !, reset lại trang và thử lại')
            },
            onSettled: () => {
                setOpenBackdrop(false);
            }
        }
    );

    const startDelete = () => {
        setOpenConfirm(true);
    }

    const closeConfirm = () => {
        setOpenConfirm(false);
    }

    const handleDelete = () => {
        mutateDeleteForm.mutate(idForm);
    }

    const handleClose = () => {
        onClose(!open);
    }

    return (
        <div>
            <ConfirmBox open={openConfirm} onClose={closeConfirm} onAgree={handleDelete} title='Rút lại đơn ?' />

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Dialog
                fullWidth={true}
                maxWidth='600'
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                {
                    error ? <ErrorData /> :
                        isLoading ? <TableSkeleton /> :
                            <Fragment>
                                {loading && <LinearProgress />}
                                <div className={cx('header-paper-resident')}>
                                    {auth.role === 'Household' &&
                                        <Button variant='contained'
                                            onClick={startDelete}
                                            sx={{ fontSize: 15, margin: '2px 0', maxWidth: 200 }}>Rút lại đơn
                                        </Button>
                                    }
                                    <Button variant="contained" color="error"
                                        sx={{ fontSize: 15, margin: '2px 0', width: 100 }} onClick={handleClose}>Đóng</Button>

                                </div>

                                <div className={cx('resident-paper')}>
                                    <h1 align='center' className={cx('title-resident')}>Chi tiết </h1>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='ID'
                                                disabled={true}
                                                value={idForm}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='Loại quà muốn nhận'
                                                value={data.presentsType}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='Tên của loại quà'
                                                value={data.presentsName}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='Tài khoản gửi'
                                                value={data.account}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='Ngày gửi'
                                                value={new Date(data.createdTime).toLocaleDateString()}
                                                disabled={true}
                                            />
                                        </Grid>
                                    </Grid>
                                    <h2>Thông tin cháu nhận thưởng</h2>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='Số CCCD/CMND'
                                                value={'1'}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='Họ và tên'
                                                value={data.fullName}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='Ngày sinh'
                                                value={new Date(data.resident.dateOfBirth).toLocaleDateString()}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='Giới tính'
                                                value={data.isMale ? 'Nam' : 'Nữ'}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>

                                            <InputBase
                                                label='Số hộ khẩu'
                                                value={data.resident.householdId}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>

                                            <InputBase
                                                label='Quan hệ với chủ hộ'
                                                value={data.resident.reletionShip}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>

                                            <InputBase
                                                label='Tổ quản lý'
                                                value={data.resident.scope}
                                                disabled={true}
                                            />
                                        </Grid>
                                    </Grid>
                                    <h2>Thông tin đợt thưởng</h2>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='Tên đợt thưởng'
                                                value={'1'}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='Thời gian bắt đầu'
                                                value={data.rewardCeremony.title}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='Tổng giá trị phần thưởng'
                                                value={data.rewardCeremony.totalValue}
                                                disabled={true}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            </Fragment>
                }
            </Dialog>
        </div >
    );
}