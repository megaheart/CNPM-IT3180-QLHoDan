import { useState, Fragment, useCallback } from 'react';
import useAuth from '~/hooks/useAuth';

import TableSkeleton from '~/page/Skeleton';
import ConfirmBox from '../DiaLog/ConfirmBox';
import ErrorData from '~/page/ErrorData';
import {
    Snackbar, Alert, Button, TableRow, TablePagination, TableHead,
    TableContainer, TableCell, TableBody, Table, Paper, Input, InputAdornment
    , Backdrop, CircularProgress
} from '@mui/material';
import specialAccount from '~/services/api/specialAccount';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import AddSpecialAcccount from '../DiaLog/AddSpecialAccount';
import ChangeSpecialAccount from '../DiaLog/ChangeSpecialAccount';
const columns = [
    { id: 'userName', label: 'Tên đăng nhập', width: 200 },
    { id: 'fullName', label: 'Họ và tên', width: 200 },
    { id: 'scope', label: 'Tổ phụ trách ', width: 200 },
    { id: 'role', label: 'Quyền hạn ', width: 200 },
    { id: 'note', label: 'Ghi chú ', width: 150 }
];


export default function ManagerSpecialAccount() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Add new special account dialog
    const [open, setOpen] = useState(false);
    const [accountInfo, setAccountInfo] = useState(null);

    const [success, setSuccess] = useState(false);

    //loading
    const [openBackdrop, setOpenBackdrop] = useState(false);

    const [message, setMessage] = useState('');

    const queryClient = useQueryClient();
    const { auth } = useAuth();

    const { data, isLoading, error } = useQuery(
        {
            queryKey: ['specialAccount'],
            queryFn: async () => await specialAccount.getAllSpecialAccount(auth.token),
            retry: 0
        }
    );

    const mutationAddAccount = useMutation({
        mutationFn: (account) => specialAccount.addSpecialAccount(auth.token, account),
        onMutate: () => {
            setOpenBackdrop(true);
        },
        onError: () => {
            setOpenBackdrop(false);
        },
        onSuccess: () => {
            setTimeout(
                () => {
                    setOpenBackdrop(false);
                }, 1000
            )
            queryClient.invalidateQueries({ queryKey: ['specialAccount'] });
        },
        onSettled: () => {
            setOpenBackdrop(false);
        }
    });

    const mutationChangeAccount = useMutation({
        mutationFn: (account) => specialAccount.changeSpecialAccountInfo(auth.token, account),
        onMutate: () => {
            setOpenBackdrop(true);
        },
        onError: () => {
            setOpenBackdrop(false);
        },
        onSuccess: () => {
            setTimeout(
                () => {
                    setOpenBackdrop(false);
                }, 1000
            )
            queryClient.invalidateQueries({ queryKey: ['specialAccount'] });
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

    const setChangeData = (data) => {
        setAccountInfo(data);
        setIsChange(true);
    }
    const handleCompleteChange = (mes) => {
        setAccountInfo(null);
        setMessage(mes);
        setSuccess(true);
    };
    const handleSuccess = () => {
        setSuccess(false);
    };

    //change account special
    const [isChange, setIsChange] = useState(false);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <AddSpecialAcccount mutation={mutationAddAccount} completeChange={handleCompleteChange} open={open} onClose={setOpen} />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
                open={openBackdrop}
                onClick={() => { setOpenBackdrop(false) }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {accountInfo &&
                <ChangeSpecialAccount
                    key={accountInfo}
                    completeChange={handleCompleteChange}
                    open={isChange} onClose={setIsChange}
                    info={accountInfo}
                    mutation={mutationChangeAccount}
                />}
            <Snackbar open={success} autoHideDuration={3000} onClose={handleSuccess} >
                <Alert onClose={handleSuccess} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    {message + ' '} tài khoản thành công !
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
                                    <TableCell aign='right'>
                                        <Button variant='contained' color='success' onClick={() => setOpen(true)} >Tạo tài khoản mới</Button>
                                    </TableCell>
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
                                                    if (column.id === 'role') {
                                                        value = (value === 1) ? 'Chủ tịch xã' : (value === 2) ? 'Kế toán' : 'Tổ trưởng';
                                                    }
                                                    return (
                                                        <TableCell key={column.id} align={column.align} style={{ fontSize: 15 }}>
                                                            <span>{value}</span>
                                                        </TableCell>
                                                    );
                                                })}
                                                <TableCell align="left">
                                                    <Button
                                                        variant='contained'
                                                        onClick={() => setChangeData(row)}
                                                    >Sửa</Button>
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