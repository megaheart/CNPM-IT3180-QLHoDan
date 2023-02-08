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
import { Collapse } from '@mui/material';
const columns = [
    { id: 'code', label: 'Mã đợt phát thưởng', width: 150 }
];
function createData(code) {
    return { code };
}

const rows = [
    createData(34432432),
    createData(34432332),
    createData(34432132),
    createData(34442432),
];

export default function ListAwardEvent() {
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
        <Paper sx={{ overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
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
                            <TableCell style={{ fontSize: 15 }} >
                                Danh sách cháu nhận thưởng
                            </TableCell>
                            <TableCell style={{ fontSize: 15 }}>
                                Danh sách phần quà
                            </TableCell>
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
                                                <TableCell key={column.id} align={column.align} style={{ fontSize: 15 }}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell align="center"  >
                                            <Button variant='contained' sx={{ height: 40 }} >Chi tiết</Button>
                                        </TableCell>
                                        <TableCell align="center" sx={{ width: 200 }}>
                                            <Button variant='contained' sx={{ height: 40 }} >Chi tiết</Button>
                                        </TableCell>
                                        <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }} >
                                            <Button variant='contained' sx={{ height: 40 }} >Sửa</Button>
                                            <Button variant='contained' color='error' sx={{ height: 40 }}  >Xóa</Button>
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