import { forwardRef, useState, useRef, useEffect, Fragment, useCallback } from 'react';
import useAuth from '~/hooks/useAuth';
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

import awardApi from '~/services/api/awardApi';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';

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
    { id: 'achievementType', label: 'Loại thành tích', width: 180 },
    { id: 'achievementName', label: 'Miêu tả loại thành tích ', width: 400 },
    { id: 'rewardName', label: 'Miêu tả Phần thưởng', width: 300 },
    { id: 'rewardValue', label: 'Giá trị phần thưởng', width: 200 }
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
                alert('Có lỗi xảy ra, có thể bạn chưa thay đổi gì phần chi tiết đợt thưởng');
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
                alert('Có lỗi xảy ra, vui lòng thử lại sau');
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
                alert('Có lỗi xảy ra, vui lòng thử lại sau');
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
                alert('Có lỗi xảy ra, vui lòng thử lại sau');
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
                    Thành công !
                </Alert>
            </Snackbar>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <AcceptCeremory
                open={acceptDialog}
                actionAgree={handleAcceptEvent}
                actionCancel={handeNotAgreeDialog}
            />
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
                                        sx={{ fontSize: 15, margin: '2px 4px', width: 130 }} >Chỉnh sửa </Button>
                                    {(!data.isAccepted) ?
                                        <Button variant="contained" color="success" onClick={handleOpenAcceptDialog}
                                            sx={{ fontSize: 15, margin: '2px 4px', width: 235 }} >Phê duyệt đợt thưởng</Button>
                                        : !data.isDone ?
                                            <Button variant="contained" color="success" onClick={handleDone}
                                                sx={{ fontSize: 15, margin: '2px 4px', width: 235 }} >Kết thúc đợt thưởng</Button>
                                            : null
                                    }
                                </div>
                                :
                                <div >
                                    <Button variant="contained" color="primary" onClick={handleUpdate}
                                        sx={{ fontSize: 15, margin: '2px 4px', width: 130 }} >Cập nhật</Button>

                                    <Button variant="contained" color="success" onClick={handleOpenAcceptDialog}
                                        sx={{ fontSize: 15, margin: '2px 4px', width: 235 }} >Phê duyệt đợt thưởng</Button>

                                    {/* <Button variant="contained" color="success" onClick={handleReset}
                                        sx={{ fontSize: 15, margin: '2px 4px', width: 130 }} >Reset</Button> */}

                                </div>
                            }
                            <Button variant="contained" color="error"
                                sx={{ fontSize: 15, margin: '2px 0', width: 60 }} onClick={handlStartClose}>Đóng</Button>
                        </div>

                        <div className={cx('resident-paper')}>

                            <h2 align='center' className={cx('title-resident')}>Chi tiết đợt thưởng</h2>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <InputBase
                                        label='Mã đợt thưởng'
                                        disabled={true}
                                        value={data.id}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <InputBase
                                        label='Tên đợt thưởng'
                                        value={title}
                                        disabled={!editMode}
                                        onChange={setTitle}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <InputBase
                                        label='Mô tả'
                                        value={description}
                                        disabled={!editMode}
                                        onChange={setDescription}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <SelectBase
                                        values={['TTHT', 'TT']}
                                        labels={['Thưởng thành tích học tập', 'Dip đặc biệt']}
                                        value={type}
                                        label='Loại đợt thưởng'
                                        disabled={!editMode}
                                        inputRef={typeRef}
                                        onChange={setType}
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
                                    <SelectBase
                                        disabled={true}
                                        values={[true, false]}
                                        labels={['Đã hoàn thành', 'Chưa hoàn thành']}
                                        value={isDone}
                                        label='Trạng thái trao thưởng'
                                    />
                                </Grid>
                                {editMode ?
                                    <Grid item xs={6}>
                                        <InputBase
                                            key='message'
                                            label='Tin nhắn gửi đến các cán bộ, kế toán'
                                            value={messageToSpecialAccount}
                                            onChange={setMessageToSpecialAccount}
                                        />
                                    </Grid>
                                    :
                                    <Grid item xs={6}>
                                        <InputBase
                                            key='totalSpend'
                                            label='Tổng tiền thưởng'
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
                                                        Ngày kết thúc minh chứng
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
                                                        Thời gian nhận thưởng
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
                                                        Ngày đề xuất
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
                                                    sx={{ width: 100, color: '#fff', borderColor: '#fff' }}  >Thêm</Button>
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
                                                                color='primary' sx={{ width: 100, marginRight: 3 }}  >Sửa</Button>
                                                            <Button disabled={!editMode} variant='contained'
                                                                onClick={() => { handleDeletePair(row.achievementType) }}
                                                                color='error' sx={{ width: 100 }}  >Xóa</Button>
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
            <ConfirmBox title='Đóng cửa sổ ?' open={isClose} onClose={handleCloseConfirmBox} onAgree={handleClose} />
        </div >
    );
}