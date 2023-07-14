//hooks
import { useState } from 'react';
//pages
import householdAccountManager from '~/services/api/householdApi';
import AddHouseholAcccount from '../DiaLog/AddHouseholdAccount';
import ChangeHouseholdAccount from '../DiaLog/ChangeHouseholdAccount';
//import ConfirmBox from '../DiaLog/ConfirmBox';
import ErrorData from '~/page/ErrorData';
import TableSkeleton from '~/page/Skeleton';
import SearchIcon from '@mui/icons-material/Search';
//css
//import styles from './ManagerAccountResident.module.scss';
//import classNames from 'classnames';

import {
    Snackbar, Alert, Button, TableRow, TablePagination, TableHead,
    TableContainer, TableCell, TableBody, Table, Paper, Input, InputAdornment
    , Backdrop, CircularProgress
} from '@mui/material';
import useAuth from '~/hooks/useAuth';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';

// const cx = classNames.bind(styles);

const columns = [
    { id: 'userName', label: 'Tên đăng nhập', width: 170 },
    { id: 'fullName', label: 'Họ và tên', width: 250 },
    { id: 'scope', label: 'Tổ phụ trách', width: 200 },
    { id: 'note', label: 'Lưu ý', width: 200 },
];


export default function ManagerAccountResident() {
    const { auth } = useAuth();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    //handle save button
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    // Add new household account dialog
    const [open, setOpen] = useState(false);
    const [accountInfo, setAccountInfo] = useState({});

    //loading
    const [openBackdrop, setOpenBackdrop] = useState(false);

    //change account resident
    const [isChange, setIsChange] = useState(false);
    // Access the client
    const queryClient = useQueryClient()

    // Queries
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['householdAccounts'],
        queryFn: async () => householdAccountManager.getAllAccounts(auth.token),
        retry: 0
    });
    // Mutations
    const mutation = useMutation({
        mutationFn: (account) => householdAccountManager.addAccount(auth.token, account),
        onMutate: async (newInfo) => {
            setOpenBackdrop(true);
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            queryClient.cancelQueries({ queryKey: ['householdAccounts'] });
            // Snapshot the previous value
            const previousInfo = queryClient.getQueryData(['householdAccounts']);
            queryClient.setQueryData(['householdAccounts'], (old) => [...old, newInfo]);
            // Return a context object with the snapshotted value
            return { previousInfo };
        },
        onError: (err, newTodo, context) => {
            queryClient.setQueryData(['householdAccounts'], context.previousTodos);
        },
        onSettled: () => {
            setOpenBackdrop(false);
            setMessage('Tạo mới');
            setSuccess(true);
            // Invalidate and refetch
            // queryClient.invalidateQueries({ queryKey: ['householdAccounts'] })
        },
    });
    console.log(data)
    const handleSuccess = () => {
        setSuccess(false);
    };
    const mutationChange = useMutation({
        mutationFn: (info) => householdAccountManager.changeAccountInfo(auth.token, info),
        onMutate: async (newInfoChanged) => {
            setOpenBackdrop(true);
            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['householdAccounts', newInfoChanged.userName] })

            // Snapshot the previous value
            const previousInfo = queryClient.getQueryData(['householdAccounts', newInfoChanged.userName])

            // Optimistically update to the new value
            queryClient.setQueryData(['householdAccounts', newInfoChanged.id], newInfoChanged)

            // Return a context with the previous and new todo
            return { previousInfo, newInfoChanged }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['householdAccounts'] });
            setOpenBackdrop(false);
            setMessage('Cập nhật thông tin');
            setSuccess(true);
        },
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangeAccount = (row) => {
        setIsChange(true);
        setAccountInfo(row);
    };

    // const handleDeleteAccount = () => {

    // };

    return (
        <Paper sx={{ width: '100%' }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10 }}
                open={openBackdrop}
                onClick={() => { setOpenBackdrop(false) }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={success} autoHideDuration={3000} onClose={handleSuccess} >
                <Alert onClose={handleSuccess} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    {message + ' '} tài khoản thành công !
                </Alert>
            </Snackbar>
            {error ? <ErrorData /> : isLoading ? <TableSkeleton /> : !data ? <div>No data</div> : <TableContainer sx={{ height: 400 }}>
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
                            <TableCell align='center'>
                                <Button variant='contained' color='success' onClick={() => setOpen(true)} >Tạo tài khoản mới</Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow key={index} hover role="checkbox" tabIndex={-1} >
                                        {columns.map((column, i) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={`${index}-${i}`} align={column.align} style={{ fontSize: 15 }}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell align="center">
                                            <Button variant='contained' onClick={() => handleChangeAccount(row)} >Sửa</Button>
                                            {/* <Button variant='contained' color='error' onClick={startConfirmBox} >Xóa</Button> */}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            }
            {!isLoading && data && <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />}
            <AddHouseholAcccount mutation={mutation || null} open={open} onClose={setOpen} />
            <ChangeHouseholdAccount open={isChange} onClose={setIsChange} info={accountInfo} mutation={mutationChange} />
        </Paper>
    );
}