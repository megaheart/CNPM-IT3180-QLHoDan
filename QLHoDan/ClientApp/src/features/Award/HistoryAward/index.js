import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import formManageAwardHistory from '~/services/api/awardHistory';
import useAuth from '~/hooks/useAuth';
import { useQuery } from '@tanstack/react-query'
import ErrorData from '~/page/ErrorData';
import TableSkeleton from '~/page/Skeleton';
const columns = [
    { id: 'identityCode', label: 'Số định danh', width: 50 },
    { id: 'fullName', label: 'Họ và tên', width: 150 },
    { id: 'dateOfBirth', label: 'Sổ hộ khẩu', width: 100 },
    { id: 'achievementName', label: 'Loại quà', width: 100 },
    { id: 'rewardName', label: 'Tên phần quà', width: 100 },
    { id: 'title', label: 'Tên đợt thưởng', width: 100 },
];

export default function HistoryAward() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const { auth } = useAuth();
    const { data, error, isLoading, isError } = useQuery(
        ['HistoryAll', auth.username],
        async () => {
            return await formManageAwardHistory.getAllAwardHistory(auth.token)
        }
    )
    console.log(data)
    console.log(error)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            {
                isLoading ? <TableSkeleton />
                    :
                    <React.Fragment>
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
                                                    <TableCell align='left' >
                                                        {row.resident.identityCode}
                                                    </TableCell>
                                                    <TableCell align='left' >
                                                        {row.resident.fullName}
                                                    </TableCell>
                                                    <TableCell align='left' >
                                                        {row.resident.householdId}
                                                    </TableCell>
                                                    <TableCell align='left' >
                                                        {new Date(row.resident.dateOfBirth).toLocaleDateString('vi-VN')}
                                                    </TableCell>
                                                    <TableCell align='left' >
                                                        {row.achievementName}
                                                    </TableCell>
                                                    <TableCell align='left' >
                                                        {row.rewardCeremony.title}
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
                    </React.Fragment>
            }
        </Paper>
    );
}