import { forwardRef, useState, Fragment, useEffect } from 'react';
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
import ImageDialog from '~/components/ImageDialog';
const cx = classNames.bind(styles);
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormAwardDetail({ open, onClose, idAwardForm, type }) {
    const { auth } = useAuth();
    //handle save button
    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState(false);

    const [openBackdrop, setOpenBackdrop] = useState(false);

    const [imagesLink, setImagesLink] = useState([]);

    const [checkForm, setCheckForm] = useState(false);

    const [imageDialog, setImageDialog] = useState(false);

    const openImageDialog = () => {
        setImageDialog(true);
    }

    const closeCheckForm = () => {
        setCheckForm(false);
    }
    const [openConfirm, setOpenConfirm] = useState(false);

    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery(
        ['getFormAwardById', idAwardForm],
        async () => await formEnvidenceAward.getDetailFormAwardById(auth.token, idAwardForm),
    );
    console.log(data)

    useEffect(
        () => {
            if (data) {
                console.log(data.imageLinks[0])
                setImagesLink(data.imageLinks);
            }
        }, [data, isLoading]
    )
    // người duyệt
    const mutateAccept = useMutation(
        async (data) => await formEnvidenceAward.acceptAwardForm(auth.token, idAwardForm, data),
        {
            onMutate: () => {
                setOpenBackdrop(true);
            },
            onSuccess: () => {
                setSuccess(true);
                setOpenBackdrop(false);
                queryClient.invalidateQueries(['getFormAwardById', idAwardForm]);
                queryClient.invalidateQueries(['formsEnvidenceAward', type, auth.username]);

            },
            onSetted: () => {
                setOpenBackdrop(false);
            }
        }
    );

    // hộ dân
    const mutateReject = useMutation(
        async (id) => await formEnvidenceAward.deleteAward(auth.token, id),
        {
            onMutate: () => {
                setOpenBackdrop(true);
            },
            onError: () => {
                setOpenBackdrop(false);
            },
            onSuccess: () => {
                queryClient.invalidateQueries(['formsEnvidenceAward', type, auth.username]);
                setSuccess(true);
                setOpenBackdrop(false);
                onClose(!open);
                setOpenConfirm(false);
            },
            onSetted: () => {
                setOpenBackdrop(false);
                setCheckForm(false);
            }
        }
    );

    const deleteForm = () => {
        setOpenConfirm(true);

    }


    const handleCheckForm = () => {
        setCheckForm(true);
    }

    const handleAgree = () => {
        mutateReject.mutate(idAwardForm);
    }

    const handleReject = () => {
        setOpenConfirm(false);
    }

    const handleClose = () => {
        onClose(!open);
    }

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
            <ConfirmBox open={openConfirm} onClose={handleReject} onAgree={handleAgree} title='Rút lại đơn ?' content='Bạn có muốn rút lại đơn' />
            <AcceptForm
                open={checkForm}
                actionCancel={closeCheckForm}
                action={mutateAccept.mutate}
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
                    error ? <ErrorData /> :
                        isLoading ? <TableSkeleton /> :
                            <Fragment>
                                {loading && <LinearProgress />}
                                <div className={cx('header-paper-resident')}>
                                    {auth.role === 'Household' ?
                                        <Button variant='contained'
                                            onClick={deleteForm}

                                            sx={{ fontSize: 15, margin: '2px 0', maxWidth: 200 }}>Rút lại đơn
                                        </Button> :
                                        <Button variant='contained'
                                            onClick={handleCheckForm}
                                            disabled={data.notAcceptedReason === null && data.isAccepted === false ? false : true}
                                            sx={{ fontSize: 15, margin: '2px 0', maxWidth: 200 }}>Duyệt đơn
                                        </Button>
                                    }
                                    <Button variant="contained" color="error"
                                        sx={{ fontSize: 15, margin: '2px 0', width: 100 }} onClick={handleClose}>Đóng</Button>

                                </div>
                                {imagesLink && <ImageDialog title='Minh chứng thành tích' open={imageDialog} onClose={() => setImageDialog(false)} ids={imagesLink} />}
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
                                                value={data.achievementName}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='Loại thành tích'
                                                value={data.achievementType || 'không có'}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='Lý do không duyệt'
                                                value={data.notAcceptedReason || 'Chưa được duyệt'}
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
                                                value={
                                                    (data.notAcceptedReason === null && !data.isAccepted) ? 'Chưa được kiểm tra'
                                                        : (data.notAcceptedReason !== null) ? 'Từ chối' : 'Chấp nhận'
                                                }
                                                label='Trạng thái duyệt'
                                                disabled={true}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputBase
                                                label='Ngày gửi minh chứng'
                                                value={new Date(data.createdTime).toLocaleDateString('vi-VN')}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Button variant='contained'
                                                onClick={openImageDialog}>
                                                Xem minh chứng thành tích</Button>
                                        </Grid>
                                    </Grid>
                                    <h2>Thông tin cháu nhận thưởng</h2>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='Số CCCD/CMND'
                                                value={data.resident.identityCode}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='Họ và tên'
                                                value={data.resident.fullName}
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
                                                value={data.resident.isMale ? 'Nam' : 'Nữ'}
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
                                                value={data.resident.relationShip}
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
                                                value={data.rewardCeremony.title}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='Thời gian bắt đầu'
                                                value={new Date(data.rewardCeremony.time).toLocaleDateString()}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='Loại đợt'
                                                value={data.rewardCeremony.type === 'TTHT' ? 'Thành tích học tập' : 'Dịp đặc biệt'}
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