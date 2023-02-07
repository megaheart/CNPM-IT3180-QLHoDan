import { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, DialogContentText, DialogContent, DialogTitle, Dialog, Alert, DialogActions, Snackbar } from '@mui/material';
import TableSkeleton from '../../Skeleton/index'
import AddResidentDialog from '../DiaLog/AddResident';
// import styles from './Table1.module.scss';
// import classNames from 'classnames/bind';

// const cx = classNames.bind(styles);

//column field
const columns = [
    { field: 'idenftification', headerName: 'CMND/CCCD', width: 140 },
    { field: 'name', headerName: 'Họ và tên', width: 160 },
    { field: 'birthday', headerName: 'Ngày sinh', type: 'date', width: 100 },
    { field: 'gender', headerName: 'Giới tính', width: 70 },
    { field: 'relationship', headerName: 'Quan hệ với chủ hộ', width: 150 },
    { field: 'soHoKhau', headerName: 'Sổ hộ khẩu', type: 'number', width: 150 },
    { field: 'toPhuTrach', headerName: 'Tổ phụ trách', type: 'number', width: 130 },
]
//data in each row
const rowsInit = [
    { id: 1, idenftification: '123456755389', name: 'Nguyễn Văn A', birthday: '01/01/2002', gender: 'Nam', relationship: 'Chủ hộ', soHoKhau: '125623456789', toPhuTrach: '123456789' },
    { id: 2, idenftification: '125623456789', name: 'Nguyễn Văn B', birthday: '01/01/2002', gender: 'Nam', relationship: 'Chủ hộ', soHoKhau: '178323456789', toPhuTrach: '123456789' },
    { id: 3, idenftification: '123456453789', name: 'Nguyễn Văn C', birthday: '01/01/2002', gender: 'Nam', relationship: 'Chủ hộ', soHoKhau: '123456755389', toPhuTrach: '123456789' },
    { id: 4, idenftification: '178323456789', name: 'Nguyễn Văn D', birthday: '01/01/2002', gender: 'Nam', relationship: 'Chủ hộ', soHoKhau: '123456453789', toPhuTrach: '123456789' },
]

export default function TableNhanKhau() {
    const [rows, setRows] = useState(rowsInit);
    const [loadData, setLoadData] = useState(false);
    const [selectedRow, setSelectedRow] = useState();
    const [columnsTable, setColumsTable] = useState(columns);
    // dialog tạo 1 hộ khẩu
    const [isCreateMode, setIsCreateMode] = useState(false);
    const closeCreateMode = () => {
        setIsCreateMode(false);
    }
    //trạng thái thành công khi xóa 1 nhân khẩu
    const [success, setSuccess] = useState(false);
    //confirm box xóa 1 nhân khẩu, xuất hiện khi nhấn nút xóa
    const [openDialog, setOpenDialog] = useState(false);
    //id của nhân khẩu cần xóa
    const [deleteId, setDeleteId] = useState(null);
    //không xóa nữa
    const handleClose = () => {
        setDeleteId(null);
        setOpenDialog(false);
    };
    //đồng ý xóa
    const handleAgree = () => {
        //call api

        //
        setRows(prev => {
            return prev.filter(row => row.idenftification !== deleteId)
        });
        setSuccess(true);
        setDeleteId(null);
        setOpenDialog(false);
    };


    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
    };
    useEffect(() => {
        //call api

        //
        setLoadData(true);
        const actionFirst = setTimeout(() => {
            setColumsTable([
                ...columns,
                {
                    field: 'action',
                    headerName: '  ',
                    width: 220,
                    renderCell: (params) => {
                        const onClick = (e) => {
                            e.stopPropagation();
                            const api = params.api;
                            const thisRow = {};
                            api.getAllColumns()
                                .filter((c) => c.field !== '__check__' && !!c)
                                .forEach(
                                    (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
                                );
                            console.log(thisRow);
                            setSelectedRow(thisRow);
                        };
                        const onClickDelete = (e) => {
                            e.stopPropagation();
                            const api = params.api;
                            const thisRow = {};
                            api.getAllColumns()
                                .filter((c) => c.field !== '__check__' && !!c)
                                .forEach(
                                    (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
                                );
                            setDeleteId(thisRow.idenftification);
                            setOpenDialog(true);
                        };
                        return (< div style={{ display: 'flex', gap: 5, alignItems: 'stretch', flexDirection: 'row', padding: '2px 0', margin: '0px 2px' }}>
                            <Button variant="contained" color="primary" onClick={onClick}>
                                Sửa
                            </Button>
                            <Button variant="contained" color="error" onClick={onClickDelete}>
                                Xóa
                            </Button>
                        </ div >)
                    }
                }
            ]);
            setLoadData(false);
        }, 1000)

        return () => {
            clearTimeout(actionFirst)
        }
    }, []);


    return (
        <div style={{ height: '90%', width: '100%', margin: '10' }}>
            <AddResidentDialog open={isCreateMode} onClose={closeCreateMode} />
            {/* <div>
                <Button sx={{ margin: '0 5px 1px 0' }} variant="contained" color="primary" onClick={() => setVisible(!visible)}>
                    Edit
                </Button>
                <Button sx={{ margin: '0 5px 1px 0' }} variant="contained" color="primary" onClick={() => setVisible(!visible)}>
                    Save
                </Button>
            </div> */}

            <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    Xoá lịch sử thành công!
                </Alert>
            </Snackbar>
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
            {loadData ? <TableSkeleton /> : <DataGrid
                sx={{ fontSize: 15 }}
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
            />}
            <Button variant='contained' sx={{ fontSize: 16 }} onClick={() => setIsCreateMode(true)}>Thêm nhân khẩu</Button>
        </div >
    );
}