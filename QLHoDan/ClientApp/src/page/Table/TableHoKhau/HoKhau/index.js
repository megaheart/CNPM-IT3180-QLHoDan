import { useState, useMemo, Fragment } from 'react';

//mui
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import {
    Snackbar, Alert, Button, TableRow, TablePagination, TableHead,
    TableContainer, TableCell, TableBody, Table, Backdrop, CircularProgress,
} from '@mui/material';
//page
import FullScreenDialog from '../../DiaLog/fullScreen';
import AddHouseholDialog from '../../DiaLog/AddHouseHold';
import TableSkeleton from '../../../Skeleton/index';
import ErrorData from '~/page/ErrorData';

//call api
import householdManager from '~/services/api/householdManager';
import residentManager from '~/services/api/residentManager';
import useAuth from '~/hooks/useAuth';
import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
//column field
const columns = [
    { id: 'householdId', label: 'Số hộ khẩu', width: 200, align: 'left', headerAlign: 'left' },
    { id: 'ownerFullName', label: 'Tên chủ hộ', align: 'left', headerAlign: 'left', width: 250 },
    { id: 'ownerIDCode', label: 'CMND/CCCD của chủ hộ', align: 'left', headerAlign: 'left', width: 300 },
    { id: 'scope', label: 'Tổ phụ trách', type: 'number', width: 150, align: 'left', headerAlign: 'left' },
];


export default function TableHoKhau({ action, typeTable }) {
    //các dữ liệu từng dòng được khởi tạo trong bảng, sẽ gọi bằng api

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [successAdd, setSuccessAdd] = useState(false);


    //dialog
    const [isCreateMode, setIsCreateMode] = useState(false);

    //các trường dữ liệu trong bảng
    const columsInit = useMemo(
        () => columns, []
    );

    //trường dữ liệu từng cột
    //...
    //còn tiếp

    //confirm box xóa 1 hộ khẩu, xuất hiện khi nhấn nút xóa
    const [openAlert, setOpenAlert] = useState(false);

    //const backdrop 
    const [openBackdrop, setOpenBackdrop] = useState(false);

    //id của hộ khẩu cần xóa
    const [deleteId, setDeleteId] = useState();
    const [infoId, setInfoId] = useState();

    //1 dialog hiển thị chi tiết hộ khẩu khi nhấn vào nút 'chi tiết'
    const [dialogInfo, setDialogInfo] = useState(false);

    //trạng thái thành công khi xóa 1 hộ khẩu
    const [success, setSuccess] = useState(false);



    const handleSuccessAdd = () => {
        setSuccessAdd(false);
    };

    const queryClient = useQueryClient();

    const { auth } = useAuth();
    const { data, isLoading, error } = useQuery(
        ['households', typeTable], async () => action(auth.token),
    );

    const allResidents = useQuery(
        ['residents', typeTable],
        async () => residentManager.getAllResident(auth.token),
        {
            retry: 0
        }
    );

    const queryDeleteHousehold = useMutation({
        mutationFn: async (id) => householdManager.deleteHousehold(auth.token, id),
        onMutate: async () => {
            setSuccess(false);
            setOpenBackdrop(true);
            setOpenAlert(false);
        },
        onError: () => {
            setOpenBackdrop(false);
            alert('Bạn không thể xóa hộ khẩu này');
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(['households', typeTable]);
            await queryClient.invalidateQueries(['residents', typeTable]);
            setSuccess(true);
            setOpenBackdrop(false);
            setDeleteId(null);
        }
    }
    )

    console.log(data)

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
    };

    //chuyển trang
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //bắt đầu xóa hộ khẩu
    const handleDelete = (id) => {
        setDeleteId(id);
        setOpenAlert(true);
    };
    //không xóa nữa
    const handleClose = () => {
        setDeleteId(null);
        setOpenAlert(false);
    };
    //đồng ý xóa
    const handleAgree = () => {
        queryDeleteHousehold.mutate(deleteId);
    };
    // dialog hiển thị chi tiết hộ khẩu
    const handleViewHousehold = (id) => {
        setInfoId(id);
        setDialogInfo(true);
    }
    // change resident info
    // dialog tạo 1 hộ khẩu
    const closeCreateMode = () => {
        setIsCreateMode(false);
    }
    return (
        <div style={{ height: '90%', width: '100%', margin: '10' }}>
            {isCreateMode && <AddHouseholDialog open={isCreateMode} onClose={closeCreateMode} onSucess={() => { setSuccessAdd(true) }}
                normal={typeTable === 'move' ? true : false}
            />}
            <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    {deleteId ? 'Xoá' : 'Cập nhật'} hộ khẩu thành công!
                </Alert>
            </Snackbar>
            <Snackbar open={successAdd} autoHideDuration={4000} onClose={handleSuccessAdd} >
                <Alert onClose={handleSuccessAdd} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    Thên hộ khẩu mới thành công !
                </Alert>
            </Snackbar>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {
                infoId &&
                <FullScreenDialog
                    resetIfoId={() => setInfoId(null)}
                    open={dialogInfo}
                    onClose={setDialogInfo}
                    idHousehold={infoId}
                    allResidents={allResidents.data}
                    typeTable={typeTable}
                />
            }

            {error ? <ErrorData /> : (isLoading || allResidents.isLoading) ? <TableSkeleton />
                : !data ? <div>No data</div> :
                    <Fragment>
                        <TableContainer sx={{ height: 395, backgroundColor: '#fff' }}>

                            <Table stickyHeader aria-label="sticky table">
                                <TableHead >
                                    <TableRow>
                                        {columsInit.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ width: column.width, fontSize: 15 }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                        <TableCell align='right'>
                                            <Button sx={{ fontSize: 15 }} color='success' variant='contained' onClick={() => setIsCreateMode(true)}>Thêm hộ khẩu</Button>
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
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={`${value}-${i}-tablecell`} align={column.align} style={{ fontSize: 15 }}>
                                                                {column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                    <TableCell key={`${index}-button`} align="right">
                                                        <Button sx={{ marginRight: 1 }} variant='contained' onClick={() => handleViewHousehold(row.householdId)} >Chi tiết</Button>
                                                        <Button variant='contained' color='error' onClick={() => handleDelete(row.householdId)} >Xóa</Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 20]}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Fragment>
            }

            <Dialog
                open={openAlert}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{ fontSize: 20 }} id="alert-dialog-title">
                    {"Xóa hộ khẩu ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontSize: 15 }} id="alert-dialog-description">
                        Thao tác này sẽ xóa hộ khẩu này
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ fontSize: 15 }} onClick={handleClose}>Suy nghĩ lại</Button>
                    <Button sx={{ fontSize: 15 }} onClick={handleAgree} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}