import { useState, useMemo } from 'react';
import useAuth from '~/hooks/useAuth';

import {
    Button, DialogContentText, DialogContent,
    DialogTitle, Dialog, Alert, DialogActions,
    Snackbar, TableRow, TablePagination, TableHead,
    TableContainer, TableCell, TableBody, Table,
    Backdrop, CircularProgress
} from '@mui/material';
import TableSkeleton from '../../../Skeleton/index'
import AddResidentDialog from '../../DiaLog/AddResident';

//api
import residentManager from '~/services/api/residentManager';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';

//column field
const columns = [
    { id: 'identityCode', label: 'CMND/CCCD', width: 100, align: 'left', headerAlign: 'center' },
    { id: 'fullName', label: 'Họ và tên', width: 200, align: 'left', headerAlign: 'left' },
    { id: 'dateOfBirth', label: 'Ngày sinh', type: 'date', width: 150, align: 'left', headerAlign: 'left' },
    { id: 'isMale', label: 'Giới tính', width: 100, align: 'left', headerAlign: 'left' },
    { id: 'householdId', label: 'Sổ hộ khẩu', width: 120, align: 'left', headerAlign: 'left' },
    { id: 'relationShip', label: 'Quan hệ với chủ hộ', width: 170, align: 'left', headerAlign: 'left' },
    { id: 'scope', label: 'Tổ phụ trách', width: 120, align: 'left', headerAlign: 'left' },
]



export default function TableNhanKhau({ action, typeTable }) {



    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const columsInit = useMemo(
        () => columns, []
    );
    // dialog tạo 1 hộ khẩu
    const [isCreateMode, setIsCreateMode] = useState(false);
    const closeCreateMode = () => {
        setIsCreateMode(false);
    }
    // state global
    const { auth } = useAuth();
    //trạng thái thành công khi xóa 1 nhân khẩu
    const [success, setSuccess] = useState(false);
    //confirm box xóa 1 nhân khẩu, xuất hiện khi nhấn nút xóa
    const [openDialog, setOpenDialog] = useState(false);

    //backdrop
    const [openBackdrop, setOpenBackdrop] = useState(false);

    //id của nhân khẩu cần xóa
    const [deleteId, setDeleteId] = useState(null);

    const [type, setType] = useState();

    //datas from database
    const { data, isLoading, error } = useQuery(['residents', typeTable], () => action(auth.token));

    const queryClient = useQueryClient();

    const mutationAdd = useMutation({
        mutationFn: async (resident) => residentManager.createResident(auth.token, resident),
        onSuccess: async () => {
            queryClient.invalidateQueries(['residents']);
        }
    });

    const mutationUpdate = useMutation(
        {
            mutationFn: async (resident) => residentManager.updateResident(auth.token, resident),
            onSuccess: async () => {
                queryClient.invalidateQueries(['residents']);
            }
        }
    )

    const mutationDelete = useMutation(
        {
            mutationFn: async (id) => residentManager.deleteResident(auth.token, id),
            onSuccess: async () => {
                queryClient.invalidateQueries(['residents']);
            }
        }
    )


    const viewResidentDetail = async (identification) => {
        setOpenBackdrop(true);
        const data = await residentManager.getResident(auth.token, identification);
        setType(
            {
                type: 'VIEW_AND_UPDATE',
                mutation: mutationUpdate,
                data: data
            }
        );
        setOpenBackdrop(false);
        setIsCreateMode(true);
    }

    const deleteResindent = async (id) => {
        setSuccess(false);
        setOpenBackdrop(true);
        await mutationDelete.mutateAsync(id);
        setSuccess(true);
        setOpenBackdrop(false);
    }

    //chuyển trang
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //start to create a resident
    const handleCreateResident = () => {
        setType(
            {
                type: 'ADD',
                mutation: mutationAdd
            }
        )
        setIsCreateMode(true);
    }

    //bắt đầu xóa hộ khẩu
    const handleClickOpen = (id) => {
        setDeleteId(id);
        setOpenDialog(true);
    };
    //không xóa nữa
    const handleClose = () => {
        setDeleteId(null);
        setOpenDialog(false);
    };
    //đồng ý xóa
    const handleAgree = async () => {
        setOpenDialog(false);
        await deleteResindent(deleteId);
        setDeleteId(null);
    };


    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
    };

    return (
        <div style={{ height: '90%', width: '100%', margin: '10' }}>
            {(type && type.mutation) && <AddResidentDialog open={isCreateMode} onClose={closeCreateMode} type={type} />}
            <Snackbar open={success} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    Xoá nhân khẩu thành công!
                </Alert>
            </Snackbar>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10 }}
                open={openBackdrop}
                onClick={() => { setOpenBackdrop(false) }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{ fontSize: 20 }} id="alert-dialog-title">
                    {"Xóa hộ khẩu ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontSize: 15 }} id="alert-dialog-description">
                        Thao tác này sẽ xóa những nhân khẩu này ? Bạn có chắc chắn muốn xóa
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ fontSize: 15 }} onClick={handleClose}>Suy nghĩ lại</Button>
                    <Button sx={{ fontSize: 15 }} onClick={handleAgree} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>

            {isLoading ? <TableSkeleton /> : <TableContainer sx={{ maxHeight: 500, backgroundColor: '#fff' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow>
                            {columsInit.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ width: column.width, fontSize: 15 }}
                                >
                                    <span>
                                        {column.label}
                                    </span>
                                </TableCell>
                            ))}
                            <TableCell align='right'>
                                <Button variant='contained' sx={{ fontSize: 16 }} onClick={handleCreateResident}>Thêm nhân khẩu</Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow key={index + 'tablerow'} hover role="checkbox" tabIndex={-1} >
                                        {columsInit.map((column, i) => {
                                            let value = row[column.id];
                                            if (column.id === 'isMale') {
                                                value = value ? 'Nam' : 'Nữ';
                                            }
                                            return (
                                                <TableCell key={`${value}-${i}-tablecell`} align={column.align} style={{ fontSize: 15 }}>
                                                    <span>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </span>
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell key={`${index}-button`} align="right">
                                            <Button sx={{ marginRight: 1 }} variant='contained' onClick={() => {
                                                viewResidentDetail(row.identityCode);
                                            }} >Chi tiết</Button>
                                            <Button variant='contained' color='error' onClick={() => handleClickOpen(row.identityCode)} >Xóa</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            }
            {!isLoading && <TablePagination
                sx={{ backgroundColor: '#fff' }}
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />}

        </div >
    );
}