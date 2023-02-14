import { useState, forwardRef } from 'react';
import {
    Paper, Dialog, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Button, Slide, Snackbar, Backdrop, CircularProgress, Alert
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
import formManageAwardHistory from '~/services/api/awardHistory';
import ConfirmBox from '~/components/component/Dialog/ConfirmBox';
const columns = [
    { id: 'identityCode', label: 'Số định danh' },
    { id: 'fullName', label: 'Họ và tên', width: 50 },
    { id: 'householdId', label: 'Sổ hộ khẩu', width: 100 },
    { id: 'achievementName', label: 'Thành tích', width: 100 },
    { id: 'rewardName', label: 'Phần quà', width: 100 },
    { id: 'rewardValue', label: 'Trị giá', width: 100 }
];


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AwardComplete({ open, onClose, idAward }) {

    const { auth } = useAuth();

    const { data, isLoading, error } = useQuery(
        ['AwardCoompleteHistory', idAward],
        async () => await formManageAwardHistory.getAllAwardHistory(auth.token, idAward)
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

    return (
        <Dialog
            fullWidth={true}
            maxWidth='600'
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            {!error ? <ErrorData /> :
                (isLoading || !data) ? <TableSkeleton /> :
                    (data.length > 0 && <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

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
                                    {data
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
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>)
            }
        </Dialog>
    );
}