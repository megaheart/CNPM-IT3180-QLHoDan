import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import householdAccountManager from '~/services/api/householdApi';
import useAuth from '~/hooks/useAuth';
import TableSkeleton from '~/page/Skeleton';
import AddHouseholAcccount from '../DiaLog/AddHouseholdAccount';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import styles from './ManagerAccountResident.module.scss';
import classNames from 'classnames';
import ConfirmBox from '../DiaLog/ConfirmBox';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';

const cx = classNames.bind(styles);

const columns = [
    { id: 'userName', label: 'Tên đăng nhập', width: 150 },
    { id: 'fullName', label: 'Họ và tên', width: 150 },
    { id: 'scope', label: 'Tổ phụ trách', width: 100 },
    { id: 'note', label: 'Lưu ý', width: 100 },
];


export default function ManagerAccountResident() {
    const { auth } = useAuth();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Comfirm box dialog
    const [isClose, setIsClose] = useState(false);

    // Add new household account dialog
    const [open, setOpen] = useState(false);
    // Access the client
    const queryClient = useQueryClient()

    // Queries
    const { isLoading, isError, data, error } = useQuery({ queryKey: ['householdAccounts', auth.token], queryFn: async () => householdAccountManager.getAllAccounts(auth.token) });

    // Mutations
    const mutation = useMutation({
        mutationFn: (account) => householdAccountManager.addAccount(auth.token, account),
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['householdAccounts'] })
        },
    })

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const startConfirmBox = () => {
        setIsClose(true);
    };

    const handleCloseConfirmBox = () => {
        setIsClose(false);
    }

    const handleAgree = () => {
        setIsClose(false);
    }

    const handleChangeAccount = () => {

    };

    const handleDeleteAccount = () => {

    };

    return (
        <Paper sx={{ width: '100%' }}>
            <ConfirmBox sx={{ marginLeft: 10 }} open={isClose} onClose={handleCloseConfirmBox} onAgree={handleAgree} />
            <div className={cx('tool-bar')}>
                <div className={cx('item-tool')}>
                    <Button variant='contained' onClick={() => setOpen(true)} >Tạo tài khoản mới</Button>
                </div>
                <div className={cx('item-tool')}>
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                </div>
            </div>
            {isLoading ? <TableSkeleton /> : <TableContainer sx={{ maxHeight: 500 }}>
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
                            <TableCell></TableCell>
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
                                        <TableCell align="right">
                                            <Button variant='contained' onClick={handleChangeAccount} >Sửa</Button>
                                            <Button variant='contained' color='error' onClick={startConfirmBox} >Xóa</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            }
            {!isLoading && <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />}
            <AddHouseholAcccount mutation={mutation || null} open={open} onClose={setOpen} />
        </Paper>
    );
}