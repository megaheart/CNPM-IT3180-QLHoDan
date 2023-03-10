import { forwardRef, useState, useRef, useEffect, Fragment, useCallback } from 'react';
//validate
import validation from '~/services/validate/index.js';
//material components
import {
    Button, Dialog, Slide, Snackbar, Alert,
    InputLabel, InputAdornment, Input, FormControl, styled,
    Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, Backdrop, CircularProgress
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import ConfirmBox from '~/components/component/Dialog/ConfirmBox';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import LinearProgress from '@mui/material/LinearProgress';

import ErrorData from '~/page/ErrorData';
//style
import classNames from 'classnames/bind';

import { InputBase, SelectBase } from '../components';
import Grid from '@mui/material/Grid';

import TableSkeleton from '~/page/Skeleton';
import AwardListEstimate from '../AwardListEstimate';
import AwardComplete from '../AwardComplete';

import awardApi from '~/services/api/awardApi';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import useAuth from '~/hooks/useAuth';
import AcceptCeremory from '~/components/component/FormDialog';

import ChangeAwardPair from '../ChangeAwardPair';

import styles from './Award.module.scss';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const cx = classNames.bind(styles);
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const columns = [
    { id: 'achievementType', label: 'Lo???i th??nh t??ch', width: 180 },
    { id: 'achievementName', label: 'Mi??u t??? lo???i th??nh t??ch ', width: 400 },
    { id: 'rewardName', label: 'Mi??u t??? Ph???n th?????ng', width: 300 },
    { id: 'rewardValue', label: 'Gi?? tr??? ph???n th?????ng', width: 200 }
];


export default function AwardDetail({ open, onClose, idAward }) {
    const { auth } = useAuth();

    const [acceptDialog, setAcceptDialog] = useState(false);
    //handle save button
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [success, setSuccess] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [isClose, setIsClose] = useState(false);

    const [time, setTime] = useState(null);
    const timeRef = useRef();

    const [estimateAward, setEstimateAward] = useState(false);

    const [closingFormDate, setClosingFormDate] = useState(null);
    const closingFormDateRef = useRef();
    const [rewardDate, setRewardDate] = useState(null);
    const rewardDateRef = useRef();
    const [achievementRewardPairs, setAchievementRewardPairs] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const typeRef = useRef();
    const [type, setType] = useState('TTHT');

    const [totalValue, setTotalValue] = useState('');

    const [isAccepted, setIsAccepted] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const [openBackdrop, setOpenBackdrop] = useState(false);

    const [messageToSpecialAccount, setMessageToSpecialAccount] = useState('');


    const [awardComplete, setAwardComplete] = useState(false);

    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery(
        ['getRewardEventById', idAward],
        async () => await awardApi.getRewardEventById(auth.token, idAward),
    );
    console.log(error)
    const mutationChangeRewardEvent = useMutation(
        async (data) => await awardApi.updateRewardEvent(auth.token, data),
        {
            onMutate: () => {

            },
            onError: () => {
                alert('C?? l???i x???y ra, c?? th??? b???n ch??a thay ?????i g?? ph???n chi ti???t ?????t th?????ng');
            },
            onSuccess: () => {
                queryClient.invalidateQueries(['getRewardEventById', idAward]);
                queryClient.invalidateQueries(['rewardEvents']);
            },
            onSettled: () => {

            }
        }
    );

    const mutationChangePair = useMutation(
        async (data) => await awardApi.transferRewardFromAchivement(auth.token, idAward, data),
        {
            onMutate: () => {

            },
            onError: () => {
                alert('C?? l???i x???y ra, vui l??ng th??? l???i sau');
            },
            onSuccess: () => {
                queryClient.invalidateQueries(['getRewardEventById', idAward]);
                queryClient.invalidateQueries(['rewardEvents']);
            },
            onSettled: () => {

            }
        }
    );

    const mutationAcceptRewardEvent = useMutation(
        async (data) => await awardApi.acceptRewardEvent(auth.token, idAward, data),
        {
            onMutate: () => {
                setOpenBackdrop(true);
            },
            onError: () => {
                alert('C?? l???i x???y ra, vui l??ng th??? l???i sau');
            },
            onSuccess: () => {
                queryClient.invalidateQueries(['getRewardEventById', idAward]);
                queryClient.invalidateQueries(['rewardEvents']);
                setSuccess(true);
            },
            onSettled: () => {
                setOpenBackdrop(false);
            }
        }
    );

    const mutationDoneEvent = useMutation(
        async (id) => await awardApi.markDoneRewardEvent(auth.token, id),
        {
            onMutate: () => {
                setOpenBackdrop(true);
            },
            onError: () => {
                alert('C?? l???i x???y ra, vui l??ng th??? l???i sau');
            },
            onSuccess: () => {
                queryClient.invalidateQueries(['getRewardEventById', idAward]);
                queryClient.invalidateQueries(['rewardEvents']);
                setSuccess(true);
            },
            onSettled: () => {
                setOpenBackdrop(false);
            }
        }
    );


    const handleAcceptEvent = useCallback(
        (data) => {
            mutationAcceptRewardEvent.mutate(data);
            setAcceptDialog(false);
        }, [mutationAcceptRewardEvent]
    )



    const [changePairDialog, setChangePairDialog] = useState(false);
    const [pairToChange, setPairToChange] = useState(null);

    const handleOpenChangePairDialog = (pair) => {
        setPairToChange(pair);
        setChangePairDialog(true);
    }

    const handleCloseChangePairDialog = () => {
        setChangePairDialog(false);
        setPairToChange(null);
    }

    const handleStartAddPair = () => {
        setChangePairDialog(true);
    }

    const handleOpenAcceptDialog = () => {
        setAcceptDialog(true);
    }

    const handeNotAgreeDialog = () => {
        setAcceptDialog(false);
    }

    const viewComplete = () => {
        setAwardComplete(true);
    }

    useEffect(
        () => {
            if (!isLoading && data) {
                data.time && setTime(dayjs(data['time']));
                data.closingFormDate && setClosingFormDate(dayjs(data['closingFormDate']));
                data.rewardDate && setRewardDate(dayjs(data['rewardDate']));
                data.achievementRewardPairs && setAchievementRewardPairs(data['achievementRewardPairs']);
                setIsAccepted(data['isAccepted']);
                setIsDone(data['isDone']);
                setTitle(data['title']);
                setDescription(data['description']);
                setTotalValue(data['totalValue']);
            }
        }, [data, isLoading]
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const startEdit = () => {
        setEditMode(true);
    }

    const handleAddPair = (pair) => {
        setAchievementRewardPairs(
            prev => [...prev, { ...pair, achievementType: prev.length + 1 }]
        );
    }
    const handleChangePair = (pair) => {
        setAchievementRewardPairs(
            prev => prev.map(
                (item) => item.achievementType === pair.achievementType ? pair : item
            )
        );
    }
    const handleDeletePair = (index) => {
        setAchievementRewardPairs(
            prev =>
                prev.filter(
                    (item) => item.achievementType !== index
                ).map(
                    (item, i) => ({ ...item, achievementType: i + 1 }
                    )
                ));
    }


    const handleReset = () => {
        console.log(title)
        console.log(type)
        console.log(description)
        console.log(time)
        console.log(closingFormDate)
        console.log(rewardDate)
        console.log(totalValue)
        console.log(isAccepted)
        console.log(isDone)
    }

    const handleDone = () => {
        mutationDoneEvent.mutate(idAward);
    }

    const handleUpdate = () => {
        setOpenBackdrop(true);
        if (
            title !== data.title ||
            type !== data.type ||
            description !== data.description ||
            closingFormDate !== dayjs(data.closingFormDate) ||
            rewardDate !== dayjs(data.rewardDate)
        ) {
            const data = {
                id: idAward,
                title: title,
                description: description,
                type: type,
                closingFormDate: closingFormDate,
                rewardDate: rewardDate,
                messageToSpecialAccount: messageToSpecialAccount
            }
            mutationChangeRewardEvent.mutate(data);
        }
        console.log(achievementRewardPairs);
        mutationChangePair.mutate(achievementRewardPairs);

        setOpenBackdrop(false);
        setSuccess(true);
        setEditMode(false);
    }


    //handle when clode this dislog

    const handleCloseConfirmBox = () => {
        setIsClose(false);
    };
    //start close this dialog
    const handlStartClose = () => {
        if (editMode) {
            setIsClose(true);
        }
        else {
            handleClose();
        }
    };

    const handleSuccess = () => {
        setSuccess(false);
    };
    //handle close this dialog
    const handleClose = () => {
        setAchievementRewardPairs((data && data.achievementRewardPairs) ? data['achievementRewardPairs'] : []);
        setEditMode(false);
        onClose(!open);
        setIsClose(false);
    };
    return (
        <div>
            <Snackbar open={success} autoHideDuration={3000} onClose={handleSuccess} >
                <Alert onClose={handleSuccess} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    Th??nh c??ng !
                </Alert>
            </Snackbar>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <AwardListEstimate open={estimateAward} onClose={setEstimateAward} idAward={idAward} />
            <AcceptCeremory
                open={acceptDialog}
                actionAgree={handleAcceptEvent}
                actionCancel={handeNotAgreeDialog}
            />
            {awardComplete && <AwardComplete open={awardComplete} onClose={setAwardComplete} idAward={idAward} />}
            <Dialog
                fullWidth={true}
                maxWidth='600'
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >

                <ChangeAwardPair
                    change={(d) => handleChangePair(d)}
                    add={(pair) => { handleAddPair(pair) }}
                    info={pairToChange}
                    open={changePairDialog}
                    onClose={handleCloseChangePairDialog} />
                {error ? <ErrorData /> : isLoading ? <TableSkeleton /> :
                    <Fragment>
                        {loading && <LinearProgress />}
                        <div className={cx('header-paper-resident')}>

                            {!editMode ?
                                <div>
                                    <Button variant="contained" color="primary" onClick={startEdit}
                                        disabled={auth.role !== 'CommitteeChairman' && auth.role !== 'Accountant'}
                                        sx={{ fontSize: 15, margin: '2px 4px', width: 130 }} >Ch???nh s???a </Button>
                                    {(!data.isAccepted) ?
                                        <Button variant="contained" color="success" onClick={handleOpenAcceptDialog}
                                            sx={{ fontSize: 15, margin: '2px 4px', width: 235 }} >Ph?? duy???t ?????t th?????ng</Button>
                                        : !data.isDone ?
                                            <Button variant="contained" color="success" onClick={handleDone}
                                                sx={{ fontSize: 15, margin: '2px 4px', maxWidth: 235 }} >K???t th??c ?????t th?????ng</Button>
                                            : null
                                    }
                                    <Button variant="contained" color="primary" onClick={() => setEstimateAward(true)}
                                        disabled={auth.role !== 'CommitteeChairman' && auth.role !== 'Accountant' && !data.isAccepted}
                                        sx={{ fontSize: 15, margin: '2px 4px', maxWidth: 300 }} >Danh s??ch th?????ng d??? ki???n </Button>
                                    <Button variant="contained" color="primary" onClick={viewComplete}
                                        disabled={auth.role !== 'CommitteeChairman' && auth.role !== 'Accountant' && !data.isAccepted}
                                        sx={{ fontSize: 15, margin: '2px 4px', maxWidth: 400 }} >Danh s??ch th?????ng ch??nh th???c </Button>
                                </div>
                                :
                                <div >
                                    <Button variant="contained" color="primary" onClick={handleUpdate}
                                        sx={{ fontSize: 15, margin: '2px 4px', width: 130 }} >C???p nh???t</Button>

                                    <Button variant="contained" color="success" onClick={handleOpenAcceptDialog}
                                        sx={{ fontSize: 15, margin: '2px 4px', maxWidth: 235 }} >Ph?? duy???t ?????t th?????ng</Button>

                                    {/* <Button variant="contained" color="success" onClick={handleReset}
                                        sx={{ fontSize: 15, margin: '2px 4px', width: 130 }} >Reset</Button> */}

                                </div>
                            }
                            <Button variant="contained" color="error"
                                sx={{ fontSize: 15, margin: '2px 0', width: 60 }} onClick={handlStartClose}>????ng</Button>
                        </div>

                        <div className={cx('resident-paper')}>

                            <h2 align='center' className={cx('title-resident')}>Chi ti???t ?????t th?????ng</h2>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <InputBase
                                        label='M?? ?????t th?????ng'
                                        disabled={true}
                                        value={data.id}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <InputBase
                                        label='T??n ?????t th?????ng'
                                        value={title}
                                        disabled={!editMode}
                                        onChange={setTitle}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <InputBase
                                        label='M?? t???'
                                        value={description}
                                        disabled={!editMode}
                                        onChange={setDescription}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <SelectBase
                                        values={['TTHT', 'TT']}
                                        labels={['Th?????ng th??nh t??ch h???c t???p', 'Dip ?????c bi???t']}
                                        value={type}
                                        label='Lo???i ?????t th?????ng'
                                        disabled={!editMode}
                                        inputRef={typeRef}
                                        onChange={setType}
                                    />
                                </Grid>


                                <Grid item xs={3}>
                                    <SelectBase
                                        values={[true, false]}
                                        labels={['???? duy???t', 'Ch??a duy???t']}
                                        value={isAccepted}
                                        label='Tr???ng th??i duy???t'
                                        disabled={true}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <SelectBase
                                        disabled={true}
                                        values={[true, false]}
                                        labels={['???? ho??n th??nh', 'Ch??a ho??n th??nh']}
                                        value={isDone}
                                        label='Tr???ng th??i trao th?????ng'
                                    />
                                </Grid>
                                {editMode ?
                                    <Grid item xs={6}>
                                        <InputBase
                                            key='message'
                                            label='Tin nh???n g???i ?????n c??c c??n b???, k??? to??n'
                                            value={messageToSpecialAccount}
                                            onChange={setMessageToSpecialAccount}
                                        />
                                    </Grid>
                                    :
                                    <Grid item xs={6}>
                                        <InputBase
                                            key='totalSpend'
                                            label='T???ng ti???n th?????ng'
                                            value={totalValue}
                                            disabled={true}
                                        />
                                    </Grid>
                                }



                                <Grid item xs={3}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            value={closingFormDate}
                                            onChange={(newValue) => {
                                                setClosingFormDate(newValue);
                                            }}
                                            inputRef={closingFormDateRef}
                                            defaultValue={(data && data.closingFormDate) ? data.closingFormDate : null}
                                            disabled={!editMode}
                                            renderInput={({ inputRef, inputProps, InputProps }) =>
                                                <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                                                    <InputLabel htmlFor="input_login_account">
                                                        Ng??y k???t th??c minh ch???ng
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
                                </Grid>
                                <Grid item xs={3}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            value={rewardDate}
                                            onChange={(newValue) => {
                                                setRewardDate(newValue);
                                            }}
                                            inputRef={rewardDateRef}
                                            defaultValue={(data && data.rewardDate) ? data.rewardDate : null}
                                            disabled={!editMode}
                                            renderInput={({ inputRef, inputProps, InputProps }) =>
                                                <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                                                    <InputLabel htmlFor="input_login_account">
                                                        Th???i gian nh???n th?????ng
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
                                </Grid>
                                {!editMode && <Grid item xs={3}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            value={time}
                                            onChange={(newValue) => {
                                                setTime(newValue);
                                            }}
                                            inputRef={timeRef}
                                            defaultValue={(data && data.time) ? data.time : null}
                                            disabled={!editMode}
                                            renderInput={({ inputRef, inputProps, InputProps }) =>
                                                <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                                                    <InputLabel htmlFor="input_login_account">
                                                        Ng??y ????? xu???t
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
                                </Grid>
                                }
                                {/* <Grid item xs={3}>
                            </Grid> */}
                            </Grid>
                            <TableContainer sx={{ height: 210 }}>
                                <Table aria-label="sticky table">
                                    <TableHead>
                                        <StyledTableRow sx={{ backgroundColor: '#000' }}>
                                            {columns.map((column, index) => (
                                                <StyledTableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ width: column.width, fontSize: 15 }}
                                                >
                                                    {column.label}
                                                </StyledTableCell>
                                            ))}
                                            <StyledTableCell align="center" style={{ fontSize: 15 }}>
                                                <Button disabled={!editMode} variant='outlined' color='primary'
                                                    onClick={handleStartAddPair}
                                                    sx={{ width: 100, color: '#fff', borderColor: '#fff' }}  >Th??m</Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    </TableHead>
                                    <TableBody>
                                        {achievementRewardPairs
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => {
                                                return (
                                                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={'row' + row.achievementType}>
                                                        {columns.map((column, index) => {
                                                            let value = row[column.id];
                                                            return (
                                                                <StyledTableCell key={'cell' + row.achievementType + '-' + index} align={column.align} style={{ fontSize: 15 }}>
                                                                    <span>{value}</span>
                                                                </StyledTableCell>
                                                            );
                                                        })}
                                                        <StyledTableCell align="center" style={{ fontSize: 15 }} >
                                                            <Button disabled={!editMode} variant='contained'
                                                                onClick={() => { handleOpenChangePairDialog(row) }}
                                                                color='primary' sx={{ width: 100, marginRight: 3 }}  >S???a</Button>
                                                            <Button disabled={!editMode} variant='contained'
                                                                onClick={() => { handleDeletePair(row.achievementType) }}
                                                                color='error' sx={{ width: 100 }}  >X??a</Button>
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[3, 6, 9]}
                                component="div"
                                count={achievementRewardPairs.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </div>
                    </Fragment>
                }
            </Dialog>
            <ConfirmBox title='????ng c???a s??? ?' open={isClose} onClose={handleCloseConfirmBox} onAgree={handleClose} />
        </div >
    );
}