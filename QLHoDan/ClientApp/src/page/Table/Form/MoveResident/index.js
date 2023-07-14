import { useState, Fragment, useCallback } from 'react';
import useAuth from '~/hooks/useAuth';

import TableSkeleton from '~/page/Skeleton';
//import ConfirmBox from '../DiaLog/ConfirmBox';
import ErrorData from '~/page/ErrorData';
import {
    Snackbar, Alert, Button, TableRow, TablePagination, TableHead,
    TableContainer, TableCell, TableBody, Table, Paper, Input, InputAdornment
    , Backdrop, CircularProgress
} from '@mui/material';
//import specialAccount from '~/services/api/specialAccount';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';

import ActionForm from '~/components/DialogAcceptForm'

import formMovement from '~/services/api/moveForm';

const columns = [
    { id: 'formType', label: 'Loại', width: 300 },
    { id: 'title', label: 'Tên đơn', width: 200 },
    { id: 'isAccepted', label: 'Trạng thái', width: 200 },
    { id: 'createdTime', label: 'Ngày gửi', width: 200 },
    { id: 'notAcceptedReason', label: 'Lý do không duyệt (nếu có) ', width: 300 },
    { id: 'account', label: 'Tài khoản', width: 300 },
];


export default function HouseholdFormManager() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Add new special account dialog
    const [open, setOpen] = useState(false);

    const [idToReject, setIdToReject] = useState(null);

    const [success, setSuccess] = useState(false);

    //loading
    const [openBackdrop, setOpenBackdrop] = useState(false);

    const [message, setMessage] = useState('');

    const queryClient = useQueryClient();
    const { auth } = useAuth();

    const { data, isLoading, error } = useQuery(
        {
            queryKey: ['moveForms'],
            queryFn: async () => await formMovement.getAllFormMovement(auth.token),
            retry: 0
        }
    );

    const mutationActionForm = useMutation({
        mutationFn: (data) => formMovement.acceptFormMovement(auth.token, data.id, data.body),
        onMutate: () => {
            setOpenBackdrop(true);
        },
        onError: (error) => {
            console.log(error);
            setOpenBackdrop(false);
        },
        onSuccess: () => {
            setTimeout(
                () => {
                    setOpenBackdrop(false);
                }, 1000
            )
            queryClient.invalidateQueries({ queryKey: ['moveForms'] });
            setSuccess(true);
        },
        onSettled: () => {
            setOpenBackdrop(false);
        }
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSuccess = () => {
        setSuccess(false);
    };

    const actionForm = useCallback(
        (data) => {
            console.log(data);
            if (idToReject) {
                mutationActionForm.mutate({
                    id: idToReject,
                    body: {
                        accept: data.accept,
                        NotAcceptedReason: data.notAcceptReason,
                    }
                });
            }
            if (data.accept) {
                setMessage('Duyệt');
            }
            else {
                setMessage('Từ chối');
            }
        }, [idToReject, mutationActionForm]
    )

    const cancelActionForm = () => {
        setOpen(false);
        setIdToReject(null);
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
                open={openBackdrop}
                onClick={() => { setOpenBackdrop(false) }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <ActionForm
                open={open}
                actionCancel={cancelActionForm}
                action={actionForm}
            />
            <Snackbar open={success} autoHideDuration={3000} onClose={handleSuccess} >
                <Alert onClose={handleSuccess} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    {message + ' '} đơn thành công !
                </Alert>
            </Snackbar>
            {error ? <ErrorData /> : isLoading ? <TableSkeleton /> : !data ? <div>No data</div> :
                <Fragment>
                    <TableContainer sx={{ height: 400 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ width: column.width, fontSize: 15 }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                    <TableCell align="left" style={{ width: 100, fontSize: 15 }}>Thao tác</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data && data
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id + 'tablerow' + index}>
                                                {columns.map((column) => {
                                                    let value = row[column.id];
                                                    if (column.id === 'createdTime') {
                                                        value = new Date(value).toLocaleDateString('vi-VN')
                                                    }
                                                    if (column.id === 'isAccepted') {
                                                        value = column.isAccepted ? 'Đã duyệt' : 'Chưa duyệt'
                                                    }
                                                    if (column.id === 'notAcceptedReason') {
                                                        value = column.notAcceptedReason ? column.notAcceptedReason : 'Chưa có'
                                                    }
                                                    return (
                                                        <TableCell key={column.id} align={column.align} style={{ fontSize: 15 }}>
                                                            <span>{value}</span>
                                                        </TableCell>
                                                    );
                                                })}
                                                <TableCell align="left">
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                                        <Button
                                                            variant='contained'
                                                            disabled={row.isAccepted ? true : false}
                                                            onClick={() => {

                                                            }}
                                                        >Chi tiết</Button>
                                                        <Button
                                                            variant='contained'
                                                            disabled={row.isAccepted ? true : false}
                                                            onClick={() => {
                                                                setOpen(true);
                                                                setIdToReject(row.id);
                                                            }}
                                                        >Duyệt</Button>
                                                    </div>
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
    );
}