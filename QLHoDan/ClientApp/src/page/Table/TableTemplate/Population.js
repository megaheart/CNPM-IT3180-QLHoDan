import { useState, useCallback } from 'react';

import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import {
    Button, Paper, TableRow, TableHead, TableContainer, Snackbar, Alert,
    TableCell, TableBody, Table, Backdrop, CircularProgress
} from '@mui/material';

import UpdateResidentDialog from '../DiaLog/ChangeResidentInfo';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



export default function Population({ editMode, data }) {

    const [updateResident, setUpdateResident] = useState(false);
    const [updateDataId, setUpdateDataId] = useState(null);
    //
    // const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState(false);

    const startUpdate = (id) => {
        setUpdateDataId(id);
        setUpdateResident(true);
    }
    const handleLoading = useCallback(() => {
        setLoading(false);
        setSuccess(true);
    }, []);

    const closeUpdate = () => {
        setUpdateResident(false);
        setUpdateDataId(null)
    }
    const handleSuccess = () => {
        setSuccess(false);
    };
    return (
        <div style={{ display: 'flex', alignItem: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Snackbar open={success} autoHideDuration={3000} onClose={handleSuccess} >
                <Alert onClose={handleSuccess} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    Cập nhật nhân khẩu thành công !
                </Alert>
            </Snackbar>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 1000 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" colSpan={9}>
                                Thông tin thành viên trong hộ khẩu
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell align="center">CCCD/CMND</StyledTableCell>
                            <StyledTableCell align="center">Họ và tên</StyledTableCell>
                            <StyledTableCell align="center">Ngày sinh</StyledTableCell>
                            <StyledTableCell align="center">Giới tính</StyledTableCell>
                            <StyledTableCell align="center">Quan hệ với chủ hộ</StyledTableCell>
                            <StyledTableCell align="center">Sổ hộ khẩu</StyledTableCell>
                            <StyledTableCell align="center">Tổ phụ trách</StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell key={index + '-1'} align="center">{row.identityCode}</StyledTableCell>
                                <StyledTableCell key={index + '-2'} align="center">{row.fullName}</StyledTableCell>
                                <StyledTableCell key={index + '-3'} align="center">{
                                    new Date(row.dateOfBirth).toLocaleDateString(
                                        'vi-VN',
                                        { day: '2-digit', month: '2-digit', year: 'numeric' }
                                    )}</StyledTableCell>
                                <StyledTableCell key={index + '-4'} align="center">{row.isMale ? 'Nam' : 'Nữ'}</StyledTableCell>
                                <StyledTableCell key={index + '-5'} align="center">{row.relationShip}</StyledTableCell>
                                <StyledTableCell key={index + '-6'} align="center">{row.householdId}</StyledTableCell>
                                <StyledTableCell key={index + '-7'} align="center">{row.scope}</StyledTableCell>
                                <StyledTableCell key={row.identityCode + index} align="center" component="th" scope="row">
                                    <Button
                                        variant='contained'
                                        onClick={() => {
                                            startUpdate(row.identityCode)
                                        }
                                        }
                                    >
                                        Chi tiết
                                    </Button>
                                    {/* <Button
                                        key={row.identityCode + 'delete'}
                                        disabled={!editMode} onClick={() => { handleDelete(row.identityCode) }}>Xóa</Button> */}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {updateDataId &&
                <UpdateResidentDialog
                    key={updateDataId}
                    open={updateResident}
                    onClose={closeUpdate}
                    dataId={updateDataId}
                    setSuccess={handleLoading}
                />}
            {/* <div>
                <Button sx={{ fontSize: 20, margin: '0 auto', display: 'block' }} color="primary" >Lưu</Button>
            </div> */}
        </div >
    );
}