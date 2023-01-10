import { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Alert, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import ResidentChangeDialog from '../DiaLog/HistoryDialog/residentHistory';

import TableSkeleton from '../../Skeleton/index'
// import styles from './Table1.module.scss';
// import classNames from 'classnames/bind';

// const cx = classNames.bind(styles);
const typeChange = {
    move: 'Chuyển đi',
    changeMan: 'Đổi chủ hộ',
    changeResident: 'Đổi hộ khẩu',
    absent: 'Tạm vắng',
    live: 'Tạm trú'
}
//column field
const columns = [
    { field: 'id', headerName: 'ID', width: 40, align: 'center', headerAlign: 'center' },
    { field: 'identification', headerName: 'CMND/CCCD', align: 'center', headerAlign: 'center', width: 210 },
    { field: 'from', headerName: 'Ngày bắt đầu', align: 'center', headerAlign: 'center', width: 140 },
    { field: 'to', headerName: 'Ngày kết thúc', align: 'center', headerAlign: 'center', width: 300 },
    { field: 'type', headerName: 'Kiểu', align: 'center', headerAlign: 'center', width: 150 }
]
//data in each row
const rowInit = [
    { id: 1, identification: '234323232131', from: '21/1/2000', to: '20/10/2011', type: typeChange.move },
    { id: 2, identification: '123423231323', from: '21/1/2000', to: '20/10/2011', type: typeChange.changeMan },
    { id: 3, identification: '123432323143', from: '21/1/2000', to: '20/10/2011', type: typeChange.changeResident },
    { id: 4, identification: '123432543524', from: '21/1/2000', to: '20/10/2011', type: typeChange.changeMan },
    { id: 5, identification: '123432542345', from: '21/1/2000', to: '20/10/2011', type: typeChange.changeMan },
    { id: 6, identification: '123443543432', from: '21/1/2000', to: '20/10/2011', type: typeChange.absent },
    { id: 7, identification: '123445345532', from: '21/1/2000', to: '20/10/2011', type: typeChange.changeMan },
    { id: 8, identification: '124343434342', from: '21/1/2000', to: '20/10/2011', type: typeChange.move }
]

export default function ResidentHistory() {
    //các dữ liệu từng dòng được khởi tạo trong bảng, sẽ gọi bằng api
    const [rows, setRows] = useState(rowInit);
    //
    const [loadData, setLoadData] = useState(false);

    //các trường dữ liệu trong bảng
    const [columnsTable, setColumsTable] = useState(columns);

    //trường dữ liệu từng cột
    //...
    //còn tiếp
    const [selectedRow, setSelectedRow] = useState();

    //confirm box xóa 1 hộ khẩu, xuất hiện khi nhấn nút xóa
    const [openAlert, setOpenAlert] = useState(false);

    //id của hộ khẩu cần xóa
    const [deleteId, setDeleteId] = useState();

    //1 dialog hiển thị chi tiết hộ khẩu khi nhấn vào nút 'chi tiết'
    const [openDialog, setOpenDialog] = useState(false);

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
    //thêm trạng thái các nút cho từng dòng: sưa, xóa, chi tiết
    useEffect(() => {
        setLoadData(true);
        const a = setTimeout(() => {
            setColumsTable([
                ...columns,
                {
                    field: 'action',
                    headerName: '',
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
                            setSelectedRow(thisRow);
                            setOpenDialog(true);
                        };
                        const onClickRemove = (e) => {
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
                        return (< div style={{ display: 'flex', gap: 5, alignItems: 'stretch', flexDirection: 'row', padding: '2px 0', margin: '0px 2px' }}>
                            <Button variant="contained" color="primary" onClick={onClick}>
                                Chi tiết
                            </Button>
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
            <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    Xoá lịch sử thành công!
                </Alert>
            </Snackbar>
            <ResidentChangeDialog
                open={openDialog}
                onClose={setOpenDialog}
                selectedValue={selectedRow}
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

            {loadData ? <TableSkeleton /> : <DataGrid
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
            />}
            <Dialog
                open={openAlert}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{ fontSize: 20 }} id="alert-dialog-title">
                    {"Xóa lịch sử nhân khẩu ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontSize: 15 }} id="alert-dialog-description">
                        Thao tác này sẽ xóa lịch sử này
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