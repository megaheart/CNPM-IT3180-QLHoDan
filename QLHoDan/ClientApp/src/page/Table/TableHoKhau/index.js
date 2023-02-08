import { useState, useMemo } from 'react';

//mui
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import {
    Snackbar, Alert, Button, TableRow, TablePagination, TableHead,
    TableContainer, TableCell, TableBody, Table
} from '@mui/material';
//page
import FullScreenDialog from '../DiaLog/fullScreen';
import AddHouseholDialog from '../DiaLog/AddHouseHold';
import TableSkeleton from '../../Skeleton/index';
import CustomToolbarExport from '../ComponentExport';

//call api
import householdManager from '~/services/api/householdManager';
import useAuth from '~/hooks/useAuth';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
//column field
const columns = [
    { id: 'householdId', label: 'Số hộ khẩu', width: 40, align: 'center', headerAlign: 'center' },
    { id: 'ownerFullName', label: 'Chủ hộ', align: 'center', headerAlign: 'center', width: 200 },
    { id: 'ownerIDCode', label: 'CMND/CCCD của chủ hộ', align: 'center', headerAlign: 'center', width: 200 },
    { id: 'scope', label: 'Tổ phụ trách', type: 'number', width: 150, align: 'center', headerAlign: 'center' },
];


//data in each row
// const rowInit = [
//     { id: 1, noiThuongTru: 'Hà Nội', chuHo: 'Nguyễn Văn Thanh', iden: '123456789012', toPhuTrach: 1 },
//     { id: 2, noiThuongTru: 'Hà Nội', chuHo: 'Trần Ngọc Cường', iden: '123456789012', toPhuTrach: 6 },
//     { id: 3, noiThuongTru: 'Hà Nội', chuHo: 'Nguyễn Đức Minh', iden: '123456789012', toPhuTrach: 1 },
//     { id: 4, noiThuongTru: 'Hà Nội', chuHo: 'Nguyễn Văn Minh', iden: '123456789012', toPhuTrach: 2 },
//     { id: 5, noiThuongTru: 'Hà Nội', chuHo: 'Nguyễn Văn Nam', iden: '123456789012', toPhuTrach: 4 },
//     { id: 6, noiThuongTru: 'Hà Nội', chuHo: 'Nguyễn Văn Khánh', iden: '123456789012', toPhuTrach: 1 },
//     { id: 7, noiThuongTru: 'Hà Nội', chuHo: 'Nguyễn Quốc Duy', iden: '123456789012', toPhuTrach: 1 },
//     { id: 8, noiThuongTru: 'Hà Nội', chuHo: 'Phạm Đình Quân', iden: '123456789012', toPhuTrach: 6 }
// ]

export default function TableHoKhau() {
    //các dữ liệu từng dòng được khởi tạo trong bảng, sẽ gọi bằng api

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    //dialog
    const [isCreateMode, setIsCreateMode] = useState(false);

    //các trường dữ liệu trong bảng
    const columsInit = useMemo(
        () => columns, []
    );
    const { auth } = useAuth();
    const { data, isLoading, error } = useQuery(['households'], () => householdManager.getHouseholdList(auth.token));

    //trường dữ liệu từng cột
    //...
    //còn tiếp

    //confirm box xóa 1 hộ khẩu, xuất hiện khi nhấn nút xóa
    const [openAlert, setOpenAlert] = useState(false);

    //id của hộ khẩu cần xóa
    const [deleteId, setDeleteId] = useState();
    const [infoId, setInfoId] = useState();

    //1 dialog hiển thị chi tiết hộ khẩu khi nhấn vào nút 'chi tiết'
    const [dialogInfo, setDialogInfo] = useState(false);

    //trạng thái thành công khi xóa 1 hộ khẩu
    const [success, setSuccess] = useState(false);

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
    const handleClickOpen = () => {
        setOpenAlert(true);
    };
    //không xóa nữa
    const handleClose = () => {
        setDeleteId(null);
        setOpenAlert(false);
    };
    //đồng ý xóa
    const handleAgree = () => {
        setSuccess(true);
        setDeleteId(null);
        setOpenAlert(false);
    };
    // dialog hiển thị chi tiết hộ khẩu
    const handleViewHousehold = (id) => {
        console.log(id);
        setInfoId(id);
        setDialogInfo(true);
    }
    // dialog tạo 1 hộ khẩu
    const closeCreateMode = () => {
        setIsCreateMode(false);
    }
    return (
        <div style={{ height: '90%', width: '100%', margin: '10' }}>
            <AddHouseholDialog open={isCreateMode} onClose={closeCreateMode} />
            <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    Xoá hộ khẩu thành công!
                </Alert>
            </Snackbar>
            {
                infoId &&
                <FullScreenDialog
                    open={dialogInfo}
                    onClose={setDialogInfo}
                    idHousehold={infoId}
                />
            }

            {!isLoading && <div>
                <Button sx={{ fontSize: 16 }} variant='contained' onClick={() => setIsCreateMode(true)}>Thêm hộ khẩu</Button>
            </div>}
            {isLoading ? <TableSkeleton /> : <TableContainer sx={{ maxHeight: 500, backgroundColor: '#fff' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow>
                            {columsInit.map((column) => (
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
                                            <Button variant='contained' color='error' onClick={handleClickOpen} >Xóa</Button>
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
        </div>
    );
}