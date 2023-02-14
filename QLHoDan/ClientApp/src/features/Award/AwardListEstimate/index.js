import { useState, forwardRef } from 'react';
import {
    Paper, Dialog, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Button, Slide, Snackbar, Backdrop, CircularProgress
} from '@mui/material';
import ErrorData from '~/page/ErrorData';
import { InputBase } from '../components';
import TableSkeleton from '~/page/Skeleton';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import Grid from '@mui/material/Grid';
import useAuth from '~/hooks/useAuth';
import formManageAwardHistory from '~/services/api/formManageAwardHistory';
import ConfirmBox from '~/components/component/Dialog/ConfirmBox';
const columns = [
    { id: 'identityCode', label: 'Số định danh' },
    { id: 'fullName', label: 'Họ và tên', width: 50 },
    { id: 'householdId', label: 'Sổ hộ khẩu', width: 100 },
    { id: 'achievementName', label: 'Thành tích', width: 100 },
    { id: 'rewardName', label: 'Phần quà', width: 100 },
    { id: 'rewardValue', label: 'Trị giá', width: 100 }
];

const rows = [
    {
        id: '1',
        resident: '1',
        rewardCeremony: '1',
        achievementName: '1',
        achievementType: '1',
        rewardName: '1',
        rewardValue: '1'
    },
]

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AwardListEstimate({ open, onClose, idAward }) {

    const { auth } = useAuth();

    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);

    const handleSuccess = () => {
        setSuccess(false);
    }

    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery(
        ['AwardEstimateHistory', idAward],
        () => formManageAwardHistory.getFormManageAwardHistoryById(auth.token, idAward)
    );

    const mutateSaveHistory = useMutation(
        (id) => formManageAwardHistory.saveFormManageAwardHistory(auth.token, id),
        {
            onMutate: () => {
                setOpenBackdrop(true);
            },
            onError: () => {
                alert('Lưu thất bại, thử lại hoặc không thể lưu')
            },
            onSuccess: (data) => {
                setSuccess(true);
                queryClient.invalidateQueries('formRewardForChance');
            },
            onError: (error) => {
                //console.log(error);
            },
            onSettled: () => {
                setOpenBackdrop(false);
            }

        }
    );



    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClose = () => {
        onClose(!open);
    };

    const handleStartSaveHistory = () => {
        setOpen(true);
    }
    const handleCloseConfirmBox = () => {
        setOpen(false);
    }
    const handleAgreeSave = () => {
        mutateSaveHistory.mutate(idAward);
        setOpen(false);
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth='600'
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <ConfirmBox title='Đóng cửa sổ ?' open={open} onClose={handleCloseConfirmBox} onAgree={handleAgreeSave} />
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
            {error ? <ErrorData /> :
                isLoading ? <TableSkeleton /> :
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="contained" color="success" onClick={handleStartSaveHistory}
                                sx={{ fontSize: 15, margin: '2px 4px', minWidth: 130 }} >Lưu vào lịch sử trao thưởng</Button>
                            <Button variant="contained" color="error" onClick={handleClose}
                                sx={{ fontSize: 15, margin: '2px 4px', maxWidth: 300 }} >Đóng</Button>
                        </div>
                        <h1>Danh sách phát thưởng dự kiến</h1>
                        <h2>Thông tin dịp thưởng</h2>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <InputBase
                                    label='Mã đợt thưởng'
                                    disabled={true}
                                    value={data[0].rewardCeremony.id}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputBase
                                    label='Tên đợt thưởng'
                                    disabled={true}
                                    value={data[0].rewardCeremony.title}
                                />
                            </Grid>
                        </Grid>
                        <h2>Thông tin các cháu nhận thưởng</h2>
                        <TableContainer sx={{ maxHeight: 600 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth, fontSize: 15 }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    <TableCell align="center" style={{ fontSize: 15 }}>
                                                        {row.resident.identityCode}
                                                    </TableCell>
                                                    <TableCell align="center" style={{ fontSize: 15 }}>
                                                        {row.resident.fullName}
                                                    </TableCell>
                                                    <TableCell align="center" style={{ fontSize: 15 }}>
                                                        {row.resident.householdId}
                                                    </TableCell>
                                                    <TableCell align="center" style={{ fontSize: 15 }}>
                                                        {row.achievementName}
                                                    </TableCell>
                                                    <TableCell align="center" style={{ fontSize: 15 }}>
                                                        {row.rewardName}
                                                    </TableCell>
                                                    <TableCell align="center" style={{ fontSize: 15 }}>
                                                        {row.rewardValue}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 20, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>}
        </Dialog>
    );
}