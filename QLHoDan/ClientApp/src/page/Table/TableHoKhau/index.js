import { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Alert, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FullScreenDialog from '../DiaLog/fullScreen';
import AddHouseholDialog from '../DiaLog/AddHouseHold';
import TableSkeleton from '../../Skeleton/index'
// import styles from './Table1.module.scss';
// import classNames from 'classnames/bind';

// const cx = classNames.bind(styles);

//column field
const columns = [
    { field: 'id', headerName: 'ID', width: 40, align: 'center', headerAlign: 'center' },
    { field: 'soHoKhau', headerName: 'Số hộ khẩu', align: 'center', headerAlign: 'center', width: 200 },
    { field: 'noiThuongTru', headerName: 'Nơi thường trú', align: 'center', headerAlign: 'center', width: 200 },
    { field: 'thanhVien', headerName: 'Danh sách các thành viên', align: 'center', headerAlign: 'center', width: 300 },
    { field: 'chuHo', headerName: 'Chủ hộ', align: 'center', headerAlign: 'center', width: 200 },
    { field: 'toPhuTrach', headerName: 'Tổ phụ trách', type: 'number', width: 150, align: 'center', headerAlign: 'center' },
]
//data in each row
const rowInit = [
    { id: 1, soHoKhau: '123432', noiThuongTru: 'Hà Nội', thanhVien: 'Nguyễn Văn A, Nguyễn Văn B', chuHo: 'Nguyễn Văn C', toPhuTrach: 1 },
    { id: 2, soHoKhau: '123432', noiThuongTru: 'Hà Nội', thanhVien: 'Nguyễn Văn A, Nguyễn Văn B', chuHo: 'Nguyễn Văn C', toPhuTrach: 1 },
    { id: 3, soHoKhau: '123432', noiThuongTru: 'Hà Nội', thanhVien: 'Nguyễn Văn A, Nguyễn Văn B', chuHo: 'Nguyễn Văn C', toPhuTrach: 1 },
    { id: 4, soHoKhau: '123432', noiThuongTru: 'Hà Nội', thanhVien: 'Nguyễn Văn A, Nguyễn Văn B', chuHo: 'Nguyễn Văn C', toPhuTrach: 1 },
    { id: 5, soHoKhau: '123432', noiThuongTru: 'Hà Nội', thanhVien: 'Nguyễn Văn A, Nguyễn Văn B', chuHo: 'Nguyễn Văn C', toPhuTrach: 1 },
    { id: 6, soHoKhau: '123432', noiThuongTru: 'Hà Nội', thanhVien: 'Nguyễn Văn A, Nguyễn Văn B', chuHo: 'Nguyễn Văn C', toPhuTrach: 1 },
    { id: 7, soHoKhau: '123432', noiThuongTru: 'Hà Nội', thanhVien: 'Nguyễn Văn A, Nguyễn Văn B', chuHo: 'Nguyễn Văn C', toPhuTrach: 1 },
    { id: 8, soHoKhau: '123432', noiThuongTru: 'Hà Nội', thanhVien: 'Nguyễn Văn A, Nguyễn Văn B', chuHo: 'Nguyễn Văn C', toPhuTrach: 1 }
]

export default function TableHoKhau() {
    //các dữ liệu từng dòng được khởi tạo trong bảng, sẽ gọi bằng api
    const [rows, setRows] = useState(rowInit);
    //
    const [loadData, setLoadData] = useState(false);

    //các trường dữ liệu trong bảng
    const [columnsTable, setColumsTable] = useState(columns);

    //trường dữ liệu từng cột
    //...
    //còn tiếp

    //confirm box xóa 1 hộ khẩu, xuất hiện khi nhấn nút xóa
    const [openAlert, setOpenAlert] = useState(false);

    //id của hộ khẩu cần xóa
    const [deleteId, setDeleteId] = useState();

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
    //bắt đầu sửa hộ khẩu
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
        setRows(prev => {
            return prev.filter(row => row.id !== deleteId)
        });
        setSuccess(true);
        setDeleteId(null);
        setOpenAlert(false);
    };
    // dialog tạo 1 hộ khẩu
    const [isCreateMode, setIsCreateMode] = useState(false);
    const closeCreateMode = () => {
        setIsCreateMode(false);
    }
    //thêm trạng thái các nút cho từng dòng: sưa, xóa, chi tiết
    useEffect(() => {
        setLoadData(true);
        const a = setTimeout(() => {
            setColumsTable([
                ...columns.filter((c) => c.field !== 'thanhVien'),
                {
                    field: 'thanhVien',
                    headerName: 'Danh sách các thành viên',
                    width: 220,
                    headerAlign: 'center',
                    align: 'center',
                    renderCell: (params) => {
                        const onClick = (e) => {
                            e.stopPropagation();
                            // const api = params.api;
                            // const thisRow = {};

                            // api.getAllColumns()
                            //     .filter((c) => c.field !== '__check__' && !!c)
                            //     .forEach(
                            //         (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
                            //     );
                            setDialogInfo(true);
                        };
                        return (

                            <Button variant="contained" color="primary" onClick={onClick}>
                                Chi tiết <ErrorOutlineIcon sx={{ marginLeft: 1 }} />
                            </Button>

                        )
                    }
                },
                {
                    field: 'action',
                    headerName: '',
                    width: 220,
                    renderCell: (params) => {
                        // const onClick = (e) => {
                        //     e.stopPropagation();

                        //     const api = params.api;
                        //     const thisRow = {};

                        //     api.getAllColumns()
                        //         .filter((c) => c.field !== '__check__' && !!c)
                        //         .forEach(
                        //             (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
                        //         );
                        //     setVisible(true);
                        //     setIdField(thisRow.id);
                        //     setDeskField(thisRow.desk);
                        // };
                        const onClickRemove = (e) => {

                            console.log('...')
                            e.stopPropagation();
                            const api = params.api;
                            const thisRow = {};
                            api.getAllColumns()
                                .filter((c) => c.field !== '__check__' && !!c)
                                .forEach(
                                    (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
                                );
                            setDeleteId(thisRow.id);
                            handleClickOpen();
                        }
                        return (< div style={{ display: 'flex', alignItems: 'stretch', flexDirection: 'row', padding: '2px 0', margin: '0px 2px' }}>
                            {/* <Button variant="contained" color="primary" onClick={onClick}>
                                Sửa
                            </Button> */}
                            <Button variant="contained" color="error" onClick={onClickRemove}>
                                Xóa
                            </Button>
                        </ div >)
                    }
                }
            ]);
            setLoadData(false);
        }, 1000);
        return () => clearTimeout(a);
    }, [])
    return (
        <div style={{ height: '90%', width: '100%', margin: '10' }}>
            <AddHouseholDialog open={isCreateMode} onClose={closeCreateMode} />
            <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    Xoá hộ khẩu thành công!
                </Alert>
            </Snackbar>
            <FullScreenDialog
                open={dialogInfo}
                onClose={setDialogInfo}
            />
            {/* <div>
                <Button sx={{ margin: '0 5px 1px 0' }} variant="contained" color="primary" onClick={() => setVisible(!visible)}>
                    Edit
                </Button>
                <Button sx={{ margin: '0 5px 1px 0' }} variant="contained" color="primary" onClick={() => setVisible(!visible)}>
                    Save
                </Button>
            </div> */}

            {/* <Collapse sx={{ margin: '5px 0' }} in={visible} timeout="auto" >
                <div>
                    <TextField sx={{ margin: '0 5px 0 0' }} id="outlined-basic" label={columns[0].headerName}
                        variant='filled' value={idField} disabled />
                    <TextField sx={{ margin: '0 5px 0 0' }} id="outlined-basic" label={columns[1].headerName}
                        variant='filled' value={deskField} onChange={(e) => setDeskField(e.target.value)} />
                </div>
            </Collapse> */}

            {
                loadData ? <TableSkeleton /> : <DataGrid
                    sx={{ fontSize: 15 }}
                    editMode="row"
                    rows={rows}
                    columns={columnsTable}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    componentsProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                        },
                    }}
                    disableSelectionOnClick
                />
            }
            <Button sx={{ fontSize: 16 }} variant='contained' onClick={() => setIsCreateMode(true)}>Thêm hộ khẩu</Button>
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