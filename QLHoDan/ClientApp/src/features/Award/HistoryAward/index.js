import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
const columns = [
    { id: 'code', label: 'Mã đợt phát thưởng' },
    { id: 'team', label: 'Tổ quản lý', width: 50 },
    { id: 'household', label: 'Sổ hộ khẩu', width: 100 },
    { id: 'identification', label: 'Số định danh', width: 100 },
    { id: 'from', label: 'Ngày bắt đầu', width: 100 },
    { id: 'to', label: 'Ngày kết thúc', width: 100 },
    { id: 'type', label: 'Loại phát thưởng', width: 100 },
    { id: 'achivement', label: 'Thành tích(nếu có)', width: 150 },
];

function createData(code, team, household, identification, from, to, type, achivement) {
    return { code, team, household, identification, from, to, type, achivement };
}

const rows = [
    createData(23434, 4, 123232, 4434334, '11/2/2021', '11/1/2023', 'Trung thu', ''),
    createData(23444, 4, 123532, 4463344, '11/2/2021', '11/1/2023', 'Trung thu', ''),
    createData(23834, 4, 123272, 4303434, '11/9/2021', '11/1/2023', 'Trao thưởng HSG', 'Giải nhì HSG quốc gia'),
    createData(21434, 4, 120232, 4344314, '19/9/2021', '11/1/2023', 'Trao thưởng HSG', 'Giải ba HSG quốc gia'),
    createData(23404, 4, 123132, 4232234, '19/29/2021', '11/1/2023', 'Trao thưởng HSG', 'Giải nhất HSG quốc gia'),
    createData(23404, 4, 123132, 4232234, '19/29/2021', '11/1/2023', 'Trao thưởng HSG', 'Giải nhất HSG quốc gia'),
    createData(23404, 4, 123132, 4232234, '19/29/2021', '11/1/2023', 'Trao thưởng HSG', 'Giải nhất HSG quốc gia'),
    createData(23404, 4, 123132, 4232234, '19/29/2021', '11/1/2023', 'Trao thưởng HSG', 'Giải nhất HSG quốc gia'),
    createData(23404, 4, 123132, 4232234, '19/29/2021', '11/1/2023', 'Trao thưởng HSG', 'Giải nhất HSG quốc gia'),
    createData(23404, 4, 123132, 4232234, '19/29/2021', '11/1/2023', 'Trao thưởng HSG', 'Giải nhất HSG quốc gia'),
    createData(23404, 4, 123132, 4232234, '19/29/2021', '11/1/2023', 'Trao thưởng HSG', 'Giải nhất HSG quốc gia'),
    createData(23404, 4, 123132, 4232234, '19/29/2021', '11/1/2023', 'Trao thưởng HSG', 'Giải nhất HSG quốc gia'),
];

export default function HistoryAward() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align} >
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell align="center" sx={{ height: 90, display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'stretch', gap: 1 }} >
                                            <Button variant='contained'  >Sửa</Button>
                                            <Button variant='contained' color='error'   >Xóa</Button>
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
        </Paper>
    );
}