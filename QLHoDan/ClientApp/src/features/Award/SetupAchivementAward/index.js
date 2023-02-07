import { TextField } from '@mui/material';
import { useState, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import styles from './SetupAA.module.scss';
import classNames from 'classnames/bind';
import Fab from '@mui/material/Fab';
import { Add } from '@mui/icons-material';
const cx = classNames.bind(styles);
const columns = [
    { id: 'type', label: 'Loại thành tích', minWidth: 50 },
    { id: 'des', label: 'Miêu tả', minWidth: 100 },
    { id: 'name', label: 'Tên phần thưởng', minWidth: 100 },
    { id: 'value', label: 'Giá trị phần thưởng', minWidth: 100 }

];

function ListSpecialAward() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const refTypeAward = useRef(null);
    const refDescription = useRef(null);
    const refNameAward = useRef(null);
    const refValueAward = useRef(null);
    const [typesAward, setTypesAward] = useState([]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleAddTypeAward = () => {
        const typeAward = {
            type: refTypeAward.current.value,
            des: refDescription.current.value,
            name: refNameAward.current.value,
            value: refValueAward.current.value
        }
        setTypesAward([...typesAward, typeAward]);
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <div className={cx('add-type-award')}>
                <div className={cx('input-type-award')}>
                    <TextField inputRef={refTypeAward} sx={{ m: 1, width: 200 }} label="Loại thành tích" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                    <TextField inputRef={refDescription} sx={{ m: 1, width: 200 }} label="Miêu tả" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                    <TextField inputRef={refNameAward} sx={{ m: 1, width: 200 }} label="Tên phần thưởng" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                    <TextField inputRef={refValueAward} sx={{ m: 1, width: 200 }} label="Giá trị phần thưởng " inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        variant="standard" />
                </div>
                <Fab
                    color="secondary"
                    size="small"
                    component="span"
                    aria-label="add"
                    variant="extended"
                    onClick={handleAddTypeAward}
                >
                    <Add /> Thêm loại phần thưởng
                </Fab>
            </div>
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
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {typesAward
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
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
                                        <TableCell align="right">
                                            <Button variant='contained' >Xóa</Button>
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
                count={typesAward.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default ListSpecialAward;