import { forwardRef, useState, Fragment } from 'react';
import useAuth from '~/hooks/useAuth';
//validate
import validation from '~/services/validate/index.js';
//material components
import {
    Button, Dialog, Slide, Snackbar, Alert, Backdrop, CircularProgress
} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

import ErrorData from '~/page/ErrorData';
//style
import classNames from 'classnames/bind';

import AcceptForm from '~/features/FormList/AcceptForm';

import { InputBase, SelectBase } from '../../Award/components';
import Grid from '@mui/material/Grid';

import TableSkeleton from '~/page/Skeleton';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';

import styles from './Award.module.scss';
import formEnvidenceAward from '~/services/api/formEnvidenceAward';
import ConfirmBox from '~/components/component/Dialog/ConfirmBox';

const cx = classNames.bind(styles);
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});




export default function FormAwardDetail({ open, onClose, idAwardForm }) {
    const { auth } = useAuth();
    //handle save button
    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState(false);

    const [openBackdrop, setOpenBackdrop] = useState(false);

    const [checkForm, setCheckForm] = useState(false);

    const closeCheckForm = () => {
        setCheckForm(false);
    }
    const [openConfirm, setOpenConfirm] = useState(false);
    const {
        id,
        resident,
        rewardCeremony,
        achievementName,
        achievementType,
        imageLinks,
        //createdTime,
        isAccepted,
        notAcceptedReason,
        account,
    }
        = {
        id: 1,
        resident: {},
        rewardCeremony: {},
        achievementName: 'abc',
        achievementType: 'abc',
        imageLinks: [],
        createdTime: '2021-10-10',
        isAccepted: true,
        notAcceptedReason: 'abc',
        account: 'helloworld'
    }
    const queryClient = useQueryClient();
    // const { data, isLoading, error } = useQuery(
    //     ['getFormAwardById', idAwardForm],
    //     async () => await formEnvidenceAward.getDetailFormAwardById(auth.token, idAwardForm),
    // );

    // const mutateAccept = useMutation(
    //     async () => await formEnvidenceAward.acceptFormAward(auth.token, idAwardForm),
    //     {
    //         onMutate:() => {
    //             setOpenBackdrop(true);
    //         },
    //         onSuccess: () => {
    //             setSuccess(true);
    //             setOpenBackdrop(false);
    //             queryClient.invalidateQueries(['getFormAwardById', idAwardForm]);
    //             queryClient.invalidateQueries(['formsEnvidenceAward', auth.username]);

    //         },
    //         onSetted: () => {
    //             setOpenBackdrop(false);
    //         }
    //     }
    // );

    // const mutateReject = useMutation(
    //     async () => await formEnvidenceAward.deleteAward(auth.token, idAwardForm),
    //     {
    //         onMutate:() => {
    //             setOpenBackdrop(true);
    //         },
    //         onSuccess: () => {
    //             queryClient.invalidateQueries(['formsEnvidenceAward', auth.username]);
    //             setSuccess(true);
    //             setOpenBackdrop(false);
    //             onClose(!open)
    //         },
    //         onSetted: () => {
    //             setOpenBackdrop(false);
    //         }
    //     }
    // );

    const handleCheckForm = () => {
        setCheckForm(true);
    }

    const handleClose = () => {
        onClose(!open);
    }

    const handleDeleteForm = () => {
        setOpenConfirm(true);
    }


    const [isLoading, setIsLoading] = useState(false);

    //console.log(data);


    const handleSuccess = () => {
        setSuccess(false);
    };
    return (
        <div>
            <Snackbar open={success} autoHideDuration={3000} onClose={handleSuccess} >
                <Alert onClose={handleSuccess} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    Thành công !
                </Alert>
            </Snackbar>
            <ConfirmBox open={openConfirm} onClose={setOpenConfirm} title='Rút lại đơn ?' />
            <AcceptForm
                open={checkForm}
                actionCancel={closeCheckForm}
                action={() => { console.log('ok') }}
            />
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
                    // error ? <ErrorData /> : 
                    isLoading ? <TableSkeleton /> :
                        <Fragment>
                            {loading && <LinearProgress />}
                            <div className={cx('header-paper-resident')}>
                                {auth.role === 'Household' ?
                                    <Button variant='contained'
                                        onClick={handleDeleteForm}
                                        sx={{ fontSize: 15, margin: '2px 0', maxWidth: 200 }}>Rút lại đơn
                                    </Button> :
                                    <Button variant='contained'
                                        onClick={handleCheckForm}
                                        sx={{ fontSize: 15, margin: '2px 0', maxWidth: 200 }}>Duyệt đơn
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
                                            value={idAwardForm}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <InputBase
                                            label='Tiêu đề thành tích'
                                            value={achievementName}
                                            disabled={true}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <InputBase
                                            label='Lý do không duyệt'
                                            value={notAcceptedReason}
                                            disabled={true}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <InputBase
                                            label='Tài khoản gửi'
                                            value={account}
                                            disabled={true}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <InputBase
                                            label='Loại thành tích'
                                            value={achievementType}
                                            disabled={true}
                                        //onChange={}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <SelectBase
                                            values={[true, false]}
                                            labels={['Đã duyệt', 'Chưa duyệt']}
                                            value={isAccepted}
                                            label='Trạng thái duyệt'
                                            disabled={true}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputBase
                                            label='Ngày gửi minh chứng'
                                            value={'1'}
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
                                            value={'1'}
                                            disabled={true}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <InputBase
                                            label='Ngày sinh'
                                            value={'1'}
                                            disabled={true}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <InputBase
                                            label='Giới tính'
                                            value={'1'}
                                            disabled={true}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>

                                        <InputBase
                                            label='Số hộ khẩu'
                                            value={'1'}
                                            disabled={true}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>

                                        <InputBase
                                            label='Quan hệ với chủ hộ'
                                            value={'1'}
                                            disabled={true}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>

                                        <InputBase
                                            label='Tổ quản lý'
                                            value={'1'}
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
                                            value={'1'}
                                            disabled={true}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <InputBase
                                            label='Loại đợt'
                                            value={'1'}
                                            disabled={true}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <InputBase
                                            label='Tổng giá trị phần thưởng'
                                            value={'1'}
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