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
    // ng?????i duy???t
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

    // h??? d??n
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
                    Th??nh c??ng !
                </Alert>
            </Snackbar>
            <ConfirmBox open={openConfirm} onClose={handleReject} onAgree={handleAgree} title='R??t l???i ????n ?' content='B???n c?? mu???n r??t l???i ????n' />
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

                                            sx={{ fontSize: 15, margin: '2px 0', maxWidth: 200 }}>R??t l???i ????n
                                        </Button> :
                                        <Button variant='contained'
                                            onClick={handleCheckForm}
                                            disabled={data.notAcceptedReason === null && data.isAccepted === false ? false : true}
                                            sx={{ fontSize: 15, margin: '2px 0', maxWidth: 200 }}>Duy???t ????n
                                        </Button>
                                    }
                                    <Button variant="contained" color="error"
                                        sx={{ fontSize: 15, margin: '2px 0', width: 100 }} onClick={handleClose}>????ng</Button>

                                </div>
                                {imagesLink && <ImageDialog title='Minh ch???ng th??nh t??ch' open={imageDialog} onClose={() => setImageDialog(false)} ids={imagesLink} />}
                                <div className={cx('resident-paper')}>
                                    <h1 align='center' className={cx('title-resident')}>Chi ti???t </h1>
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
                                                label='Ti??u ????? th??nh t??ch'
                                                value={data.achievementName}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='Lo???i th??nh t??ch'
                                                value={data.achievementType || 'kh??ng c??'}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='L?? do kh??ng duy???t'
                                                value={data.notAcceptedReason || 'Ch??a ???????c duy???t'}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='T??i kho???n g???i'
                                                value={data.account}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputBase
                                                value={
                                                    (data.notAcceptedReason === null && !data.isAccepted) ? 'Ch??a ???????c ki???m tra'
                                                        : (data.notAcceptedReason !== null) ? 'T??? ch???i' : 'Ch???p nh???n'
                                                }
                                                label='Tr???ng th??i duy???t'
                                                disabled={true}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputBase
                                                label='Ng??y g???i minh ch???ng'
                                                value={new Date(data.createdTime).toLocaleDateString('vi-VN')}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Button variant='contained'
                                                onClick={openImageDialog}>
                                                Xem minh ch???ng th??nh t??ch</Button>
                                        </Grid>
                                    </Grid>
                                    <h2>Th??ng tin ch??u nh???n th?????ng</h2>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='S??? CCCD/CMND'
                                                value={data.resident.identityCode}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='H??? v?? t??n'
                                                value={data.resident.fullName}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='Ng??y sinh'
                                                value={new Date(data.resident.dateOfBirth).toLocaleDateString()}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='Gi???i t??nh'
                                                value={data.resident.isMale ? 'Nam' : 'N???'}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>

                                            <InputBase
                                                label='S??? h??? kh???u'
                                                value={data.resident.householdId}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>

                                            <InputBase
                                                label='Quan h??? v???i ch??? h???'
                                                value={data.resident.relationShip}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>

                                            <InputBase
                                                label='T??? qu???n l??'
                                                value={data.resident.scope}
                                                disabled={true}
                                            />
                                        </Grid>
                                    </Grid>
                                    <h2>Th??ng tin ?????t th?????ng</h2>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='T??n ?????t th?????ng'
                                                value={data.rewardCeremony.title}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='Th???i gian b???t ?????u'
                                                value={new Date(data.rewardCeremony.time).toLocaleDateString()}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='Lo???i ?????t'
                                                value={data.rewardCeremony.type === 'TTHT' ? 'Th??nh t??ch h???c t???p' : 'D???p ?????c bi???t'}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputBase
                                                label='T???ng gi?? tr??? ph???n th?????ng'
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