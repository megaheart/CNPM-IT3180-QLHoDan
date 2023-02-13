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
import ConfirmBox from '~/components/component/Dialog/ConfirmBox';
import ErrorData from '~/page/ErrorData';

import formEnvidenceAward from '~/services/api/formEnvidenceAward';

import {
    useQuery,
    useQueryClient,
    useMutation,
}
    from '@tanstack/react-query';

const columns = [
    { id: 'id', label: 'ID ', width: 150 },
    { id: 'formType', label: 'Loại', width: 170 },
    { id: 'title', label: 'Tiêu đề', width: 170 },
    { id: 'createdTime', label: 'Ngày gửi', width: 170 },
    { id: 'isAccepted', label: 'Đã duyệt', width: 170 },
    { id: 'notAcceptedReason', label: 'Lý do từ chối', width: 190 },
    { id: 'account', label: 'Tài khoản gửi', width: 170 }
];
const data = [
    {
        id: 1,
        formType: 'Đề cử',
        title: 'Đề cử cho nhân viên A',
        createdTime: '2021-10-10',
        isAccepted: true,
        notAcceptedReason: 'Không có lý do',
        account: 'admin'
    },
    {
        id: 2,
        formType: 'Đề cử',
        title: 'Đề cử cho nhân viên A',
        createdTime: '2021-10-10',
        isAccepted: true,
        notAcceptedReason: 'Không có lý do',
        account: 'admin'
    },
]

export default function ListFormAward({ type }) {
    const { auth } = useAuth();

    //const { data, isLoading, error } = useQuery(['formsEnvidenceAward', auth.username], () => formEnvidenceAward.getAllFormEnvidenceAward(auth.token));

    //backdrop
    const [openBackdrop, setOpenBackdrop] = useState(false);

    const [deleteId, setDeleteId] = useState(null);

    const [success, setSuccess] = useState(false);

    const [open, setOpen] = useState(false);

    //const queryClient = useQueryClient();

    // const mutationDelete = useMutation((id) => rewardApi.deleteRewardEvent(auth.token, id), {
    //     onMutate: () => {
    //         setOpenBackdrop(true);
    //     },
    //     onError: () => {
    //         alert('Không thể xóa đợt thưởng này !')
    //     },
    //     onSuccess: () => {
    //         queryClient.invalidateQueries(['formsEnvidenceAward', auth.username]);
    //         setSuccess(true);
    //     },
    //     onSettled: () => {
    //         setOpenBackdrop(false);
    //     }
    // });

    const deleteById = (id) => {

    };

    const [isLoading, setIsLoading] = useState(true);

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
                                                    return (
                                                        <TableCell key={column.id + 'TableCell' + row.id + index} align={column.align} style={{ fontSize: 15 }}>
                                                            <span>{value}</span>
                                                        </TableCell>
                                                    );
                                                })}

                                                <TableCell align="center" sx={{ height: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 1 }} >
                                                    <Button onClick={() => { viewDetail(row.id) }} variant='contained' sx={{ height: 30, width: 100 }} >Chi tiết</Button>
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