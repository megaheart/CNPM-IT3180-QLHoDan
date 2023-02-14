import { useState, forwardRef } from 'react';
import {
    Paper, Dialog, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Button, Slide
} from '@mui/material';
import ErrorData from '~/page/ErrorData';
import formRewardForChance from '~/services/api/formRewardForChance';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import useAuth from '~/hooks/useAuth';
const columns = [
    { id: 'id', label: 'Mã đợt phát thưởng' },
    { id: 'resident', label: 'Tổ quản lý', width: 50 },
    { id: 'rewardCeremony', label: 'Sổ hộ khẩu', width: 100 },
    { id: 'achievementName', label: 'Số định danh', width: 100 },
    { id: 'achievementType', label: 'Ngày bắt đầu', width: 100 },
    { id: 'rewardName', label: 'Ngày kết thúc', width: 100 },
    { id: 'rewardValue', label: 'Loại phát thưởng', width: 100 }
];

const rows = [
    {
        id: '1',
        resident: '1',
        rewardCeremony: '1',
        achievementName: '1',
        achievementType: '1',
        rewardName: '1',
        rewardValue: '1'
    },
]

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AwardListEstimate({ open, onClose, idAward }) {

    const { auth } = useAuth();

    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery(
        ['formRewardForChance', idAward],
        () => formRewardForChance.getFormRewardForChanceByrewardCeremonyId(auth.token, idAward),
        {
            enabled: !!idAward,
            refetchOnWindowFocus: false,
            retry: 1,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchInterval: false,
            refetchIntervalInBackground: false,
            refetchOnFocus: false,
            onSuccess: (data) => {
                console.log(data);
            },
            onError: (error) => {
                console.log(error);
            }
        }
    );

    const mutateSaveHistory = useMutation(
        (data) => formRewardForChance.sendFormRewardForChance(auth.token, data),
        {
            onSuccess: (data) => {
                console.log(data);
                queryClient.invalidateQueries(['formRewardForChance', idAward]);
            },
            onError: (error) => {
                console.log(error);
            }
        }
    );



    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClose = () => {
        onClose(!open);
    };

    return (
        <Dialog
            fullWidth={true}
            maxWidth='600'
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" color="success"
                        sx={{ fontSize: 15, margin: '2px 4px', minWidth: 130 }} >Lưu vào lịch sử trao thưởng</Button>
                    <Button variant="contained" color="error" onClick={handleClose}
                        sx={{ fontSize: 15, margin: '2px 4px', maxWidth: 300 }} >Đóng</Button>
                </div>
                <h1>Danh sách phát thưởng dự kiến</h1>
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
        </Dialog>
    );
}