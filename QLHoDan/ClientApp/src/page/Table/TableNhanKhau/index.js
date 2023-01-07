import { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Collapse, Button, TextField } from '@mui/material';
import TableSkeleton from '../../Skeleton/index'

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
const rows = [
    { id: 1, idenftification: '123456789', name: 'Nguyễn Văn A', birthday: '01/01/2002', gender: 'Nam', relationship: 'Chủ hộ', soHoKhau: '123456789', toPhuTrach: '123456789' },
    { id: 2, idenftification: '123456787', name: 'Nguyễn Văn B', birthday: '01/01/2002', gender: 'Nam', relationship: 'Chủ hộ', soHoKhau: '123456789', toPhuTrach: '123456789' },
    { id: 3, idenftification: '123454789', name: 'Nguyễn Văn C', birthday: '01/01/2002', gender: 'Nam', relationship: 'Chủ hộ', soHoKhau: '123456789', toPhuTrach: '123456789' },
    { id: 4, idenftification: '123456769', name: 'Nguyễn Văn D', birthday: '01/01/2002', gender: 'Nam', relationship: 'Chủ hộ', soHoKhau: '123456789', toPhuTrach: '123456789' },
]

export default function TableNhanKhau() {
    const [loadData, setLoadData] = useState(false);
    const [selectedRows, setSelectedRows] = useState(rows[0]);
    const [visible, setVisible] = useState(false);
    const [columnsTable, setColumsTable] = useState(columns);
    const [idField, setIdField] = useState(rows[0].id);
    const [deskField, setDeskField] = useState(rows[0].desk);
    useEffect(() => {
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
                            setVisible(true);
                            setSelectedRows(thisRow);
                            setIdField(thisRow.id);
                            setDeskField(thisRow.desk);
                        };
                        return (< div style={{ display: 'flex', alignItems: 'stretch', flexDirection: 'row', padding: '2px 0', margin: '0px 2px' }}>
                            <Button variant="contained" color="primary" onClick={onClick}>
                                Edit
                            </Button>
                            <Button variant="contained" color="error" onClick={onClick}>
                                Delete
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
    }, [])
    return (
        <div style={{ height: '90%', width: '100%', margin: '10' }}>
            {/* <div>
                <Button sx={{ margin: '0 5px 1px 0' }} variant="contained" color="primary" onClick={() => setVisible(!visible)}>
                    Edit
                </Button>
                <Button sx={{ margin: '0 5px 1px 0' }} variant="contained" color="primary" onClick={() => setVisible(!visible)}>
                    Save
                </Button>
            </div> */}

            <Collapse sx={{ margin: '5px 0' }} in={visible} timeout="auto" >
                <div>
                    <TextField sx={{ margin: '0 5px 0 0' }} label={columns[0].headerName}
                        variant='filled' value={idField} disabled />
                    <TextField sx={{ margin: '0 5px 0 0' }} label={columns[1].headerName}
                        variant='filled' value={deskField} onChange={(e) => setDeskField(e.target.value)} />
                </div>
            </Collapse>

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
        </div>
    );
}