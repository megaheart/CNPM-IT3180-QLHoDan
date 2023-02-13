import { useState, Fragment } from 'react';
import useAuth from '~/hooks/useAuth';
import { Backdrop, CircularProgress, Snackbar, Alert } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TableSkeleton from '~/page/Skeleton';
import rewardApi from '../../../services/api/awardApi';
import ConfirmBox from '~/components/component/Dialog/ConfirmBox';

import AwardDetail from '../AwardDetail';

import {
    useQuery,
    useQueryClient,
    useMutation,
}
    from '@tanstack/react-query';

const columns = [
    { id: 'id', label: 'Mã ', width: 150 },
    { id: 'title', label: 'Tên đợt ', width: 170 },
    { id: 'time', label: 'Ngày đề xuất', width: 170 },
    { id: 'type', label: 'Loại thưởng', width: 170 },
    { id: 'totalValue', label: 'Tổng giá trị ', width: 170 },
    { id: 'isAccepted', label: 'Phê duyệt', width: 190 },
    { id: 'isDone', label: 'Trạng thái', width: 170 },
    { id: 'closingFormDate', label: 'Ngày kết thúc minh chứng', width: 170 },
    {
        id: 'rewardDate', label: 'Ngày phát thưởng', width: 170,
    }
];


export default function ListAwardEvent() {
    const { auth } = useAuth();

    const { data, isLoading, error } = useQuery(['rewardEvents', auth.token], () => rewardApi.getAllRewardEvent(auth.token));

    //backdrop
    const [openBackdrop, setOpenBackdrop] = useState(false);

    const [deleteId, setDeleteId] = useState(null);

    const [success, setSuccess] = useState(false);

    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient();

    const mutationDelete = useMutation((id) => rewardApi.deleteRewardEvent(auth.token, id), {
        onMutate: () => {
            setOpenBackdrop(true);
        },
        onError: () => {
            alert('Không thể xóa đợt thưởng này !')
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['rewardEvents', auth.token]);
            setSuccess(true);
        },
        onSettled: () => {
            setOpenBackdrop(false);
        }
    });

    const deleteById = (id) => {
        mutationDelete.mutate(id);
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [openDetail, setOpenDetail] = useState(false);
    const [idRewardEvent, setIdRewardEvent] = useState(null);

    const viewDetail = (id) => {
        setIdRewardEvent(id);
        setOpenDetail(true);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
    };
    //bắt đầu xóa hộ khẩu
    const handleClickOpen = (id) => {
        setDeleteId(id);
        setOpen(true);
    };
    //không xóa nữa
    const handleClose = () => {
        setDeleteId(null);
        setOpen(false);
    };
    //đồng ý xóa
    const handleAgree = () => {
        setOpen(false);
        deleteById(deleteId);
    };

    return <Paper sx={{ overflow: 'hidden' }}>
        {
            isLoading ? <TableSkeleton /> :
                <Fragment >
                    <ConfirmBox
                        open={open}
                        onClose={handleClose}
                        onAgree={handleAgree}
                        content='Bạn có chắc chắn muốn xoá đợt thưởng này không?'
                        title='Xóa đợt thưởng này'
                    />
                    <Snackbar open={success} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                            Xoá đợt thưởng thành công!
                        </Alert>
                    </Snackbar>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10 }}
                        open={openBackdrop}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    {idRewardEvent && <AwardDetail key={idRewardEvent} idAward={idRewardEvent} open={openDetail} onClose={setOpenDetail} />}
                    <TableContainer sx={{ height: 500 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column, index) => (
                                        <TableCell
                                            key={column.id + index}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, fontSize: 15 }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, i) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={i + 'row' + row.id}>
                                                {columns.map((column, index) => {
                                                    let value = row[column.id];
                                                    if (column.id === 'isAccepted') {
                                                        value = value ? 'Đã phê duyệt' : 'Chưa phê duyệt';
                                                    }
                                                    if (column.id === 'isDone') {
                                                        value = value ? 'Đã phát thưởng' : 'Chưa phát thưởng';
                                                    }
                                                    return (
                                                        <TableCell key={column.id + 'TableCell' + row.id + index} align={column.align} style={{ fontSize: 15 }}>
                                                            <span>{value}</span>
                                                        </TableCell>
                                                    );
                                                })}

                                                <TableCell align="center" sx={{ height: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 1 }} >
                                                    <Button onClick={() => { viewDetail(row.id) }} variant='contained' sx={{ height: 30, width: 100 }} >Chi tiết</Button>
                                                    <Button variant='contained'
                                                        color='error' sx={{ height: 30, width: 100 }}
                                                        onClick={() => { handleClickOpen(row.id) }}
                                                        disabled={auth.role !== 'CommitteeChairman'}
                                                    >Xóa</Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Fragment>
        }
    </Paper>
}