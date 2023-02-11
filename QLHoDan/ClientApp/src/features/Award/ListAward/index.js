import { useState, Fragment } from 'react';
import useAuth from '~/hooks/useAuth';

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

    const { data, isLoading, error } = useQuery(['rewardEvents'], () => rewardApi.getAllRewardEvent(auth.token));

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

    return <Paper sx={{ overflow: 'hidden' }}>
        {
            isLoading ? <TableSkeleton /> :
                <Fragment >
                    {idRewardEvent && <AwardDetail key={idRewardEvent} idAward={idRewardEvent} open={openDetail} onClose={setOpenDetail} />}
                    <TableContainer sx={{ height: 490 }}>
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

                                                <TableCell align="center" sx={{ height: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 1 }} >
                                                    <Button onClick={() => { viewDetail(row.id) }} variant='contained' sx={{ height: 30, width: 100 }} >Chi tiết</Button>
                                                    <Button variant='contained' color='error' sx={{ height: 30, width: 100 }}  >Xóa</Button>
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