import { forwardRef, useState, useRef, useEffect, Fragment } from 'react';
import useAuth from '~/hooks/useAuth';
//validate
import validation from '~/services/validate/index.js';
//material components
import {
    Button, Dialog, Slide, Snackbar, Alert, Paper,
    InputLabel, InputAdornment, Input, FormControl, styled,
    Table, TableBody, TableContainer, TableHead, TablePagination, TableRow
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import LinearProgress from '@mui/material/LinearProgress';
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
    { id: 'achievementType', label: 'Loại thành tích', width: 150 },
    { id: 'achievementName', label: 'Miêu tả loại thành tích ', width: 170 },
    { id: 'rewardName', label: 'Miêu tả Phần thưởng', width: 170 },
    { id: 'rewardValue', label: 'Giá trị phần thưởng', width: 170 }
];


export default function AwardDetail({ open, onClose, idAward }) {
    const { auth } = useAuth();
    //handle save button
    const [loading, setLoading] = useState(false);
    //const [success, setSuccess] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);


    const idRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const [time, setTime] = useState(new Date());
    const typeRef = useRef();
    const totalValueRef = useRef();
    const isAcceptedRef = useRef();
    const idDoneRef = useRef();
    const [closingFormDate, setClosingFormDate] = useState(null);
    const [rewardDate, setRewardDate] = useState(null);
    const [achievementRewardPairs, setAchievementRewardPairs] = useState([]);

    const { data, isLoading } = useQuery(
        ['getRewardEventById', idAward],
        async () => await awardApi.getRewardEventById(auth.token, idAward),
    )

    useEffect(
        () => {
            if (data) {
                setTime(dayjs(data.time) || null);
                setClosingFormDate(dayjs(data.closingFormDate) || null);
                setRewardDate(dayjs(data.rewardDate) || null);
                setAchievementRewardPairs(data.achievementRewardPairs);
            }
        }, [data]
    )

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //handle when clode this dislog
    // const [isClose, setIsClose] = useState(false);
    // const handleCloseConfirmBox = () => {
    //     setIsClose(false);
    // };

    //start close this dialog
    // const handlStartClose = () => {
    //     onClose(!open);
    // };
    // // const [open, setOpen] = React.useState(false);
    // const handleSuccess = () => {
    //     setSuccess(false);
    // };
    // //handle close this dialog
    const handleClose = () => {
        onClose(!open);
        //setIsClose(false);
    };
    return (
        <div>
            {/* <Snackbar open={success} autoHideDuration={3000} onClose={handleSuccess} >
                <Alert onClose={handleSuccess} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    thành công !
                </Alert>
            </Snackbar> */}
            <Dialog
                fullWidth={true}
                maxWidth='600'
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            > {isLoading ? <TableSkeleton /> :
                <Fragment>
                    <div className={cx('header-paper-resident')}>

                        {/* <Button variant="contained" color="success"
                            sx={{ fontSize: 15, margin: '2 0', width: 120 }} >Cập nhật</Button> */}

                        <Button variant="contained" color="error"
                            sx={{ fontSize: 15, margin: '2 0', width: 60 }} onClick={handleClose}>Đóng</Button>

                    </div>

                    <div className={cx('resident-paper')}>
                        {loading && <LinearProgress color="success" />}
                        <h2 className={cx('title-resident')}>Chi tiết đợt thưởng</h2>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <InputBase
                                    label='Mã đợt thưởng'
                                    inputRef={idRef}
                                    disabled
                                    defaultValue={data.id}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <InputBase
                                    label='Tên đợt thưởng'
                                    inputRef={titleRef}
                                    defaultValue={data.title}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <InputBase
                                    label='Mô tả'
                                    inputRef={descriptionRef}
                                    defaultValue={data.description}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DatePicker
                                        value={time}
                                        onChange={(newValue) => {
                                            setTime(newValue);
                                        }}
                                        disabled
                                        renderInput={({ inputProps, InputProps }) =>
                                            <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                                                <InputLabel htmlFor="input_login_account">
                                                    Ngày đề xuất
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
                            </Grid>
                            <Grid item xs={3}>
                                <InputBase
                                    label='Loại đợt thưởng'
                                    inputRef={typeRef}
                                    defaultValue={data.type}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <InputBase
                                    label='Tổng tiền thưởng'
                                    inputRef={totalValueRef}
                                    defaultValue={data.totalValue}
                                    disabled
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DatePicker
                                        value={closingFormDate}
                                        onChange={(newValue) => {
                                            setClosingFormDate(newValue);
                                        }}
                                        disabled
                                        renderInput={({ inputProps, InputProps }) =>
                                            <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                                                <InputLabel htmlFor="input_login_account">
                                                    Ngày kết thúc minh chứng
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
                            </Grid>
                            <Grid item xs={3}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DatePicker
                                        value={rewardDate}
                                        onChange={(newValue) => {
                                            setRewardDate(newValue);
                                        }}
                                        disabled
                                        renderInput={({ inputProps, InputProps }) =>
                                            <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                                                <InputLabel htmlFor="input_login_account">
                                                    Thời gian nhận thưởng
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
                            </Grid>
                            <Grid item xs={3}>
                                <SelectBase
                                    inputRef={isAcceptedRef}
                                    values={[true, false]}
                                    labels={['Đã duyệt', 'Chưa duyệt']}
                                    defaultValue={data.isAccepted}
                                    label='Trạng thái duyệt'
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <SelectBase
                                    inputRef={idDoneRef}
                                    disabled
                                    values={[1, 2]}
                                    labels={['Đã hoàn thành', 'Chưa hoàn thành']}
                                    defaultValue={data.isDone ? 1 : 2}
                                    label='Trạng thái trao thưởng'
                                />
                            </Grid>
                            {/* <Grid item xs={3}>
                            </Grid> */}
                        </Grid>
                        <TableContainer sx={{ height: 200 }}>
                            <Table stickyHeader aria-label="sticky table">
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
                                        {/* <TableCell></TableCell> */}
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {achievementRewardPairs
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                    {columns.map((column) => {
                                                        let value = row[column.id];
                                                        return (
                                                            <StyledTableCell key={column.id + '' + row.id} align={column.align} style={{ fontSize: 15 }}>
                                                                <span>{value}</span>
                                                            </StyledTableCell>
                                                        );
                                                    })}
                                                    {/* <TableCell align="center" sx={{ height: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 1 }} >
                                                            <Button onClick={() => { viewDetail(row.id) }} variant='contained' sx={{ height: 30, width: 100 }} >Chi tiết</Button>
                                                            <Button variant='contained' color='error' sx={{ height: 30, width: 100 }}  >Xóa</Button>
                                                        </TableCell> */}
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
            {/* <ConfirmBox open={isClose} onClose={handleCloseConfirmBox} onAgree={handleClose} /> */}
        </div >
    );
}