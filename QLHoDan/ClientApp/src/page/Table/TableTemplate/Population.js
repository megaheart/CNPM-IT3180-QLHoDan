import { useState, forwardRef, useCallback, useEffect } from 'react';
import useAuth from '~/hooks/useAuth';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { Button, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, TextField, Slide, Box, Dialog } from '@mui/material';
import Skeleton from '../../Skeleton';
import UpdateResidentDialog from '../DiaLog/ChangeResidentInfo';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import residentManager from '~/services/api/residentManager';
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

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export default function Population({ editMode, data }) {
    const { auth } = useAuth();
    //những id của nhân khẩu sẽ bị xóa
    const [deleteId, setDeleteId] = useState([]);

    const [updateResident, setUpdateResident] = useState(false);
    const [updateDataId, setUpdateDataId] = useState(null);
    //
    const [open, setOpen] = useState(false);

    const startUpdate = (id) => {
        setUpdateDataId(id);
        setUpdateResident(true);
    }

    const handleDelete = (id) => {
        setDeleteId(id);
    }
    const closeUpdate = () => {
        setUpdateResident(false);
        setUpdateDataId(null)
    }

    return (
        <div style={{ display: 'flex', alignItem: 'center', justifyContent: 'center', flexDirection: 'column' }}>
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
                            <StyledTableCell align="center">Edit</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell key={index + '-1'} align="center">{row.identityCode}</StyledTableCell>
                                <StyledTableCell key={index + '-2'} align="center">{row.fullName}</StyledTableCell>
                                <StyledTableCell key={index + '-3'} align="center">{row.dateOfBirth}</StyledTableCell>
                                <StyledTableCell key={index + '-4'} align="center">{row.isMale ? 'Nam' : 'Nữ'}</StyledTableCell>
                                <StyledTableCell key={index + '-5'} align="center">{row.relationShip}</StyledTableCell>
                                <StyledTableCell key={index + '-6'} align="center">{row.householdId}</StyledTableCell>
                                <StyledTableCell key={index + '-7'} align="center">{row.scope}</StyledTableCell>
                                <StyledTableCell key={row.identityCode + index} align="center" component="th" scope="row">
                                    <Button
                                        disabled={!editMode}
                                        onClick={() => {
                                            startUpdate(row.identityCode)
                                        }
                                        }
                                    >
                                        Chi tiết
                                    </Button>
                                    <Button
                                        key={row.identityCode + 'delete'}
                                        disabled={!editMode} onClick={() => { handleDelete(row.identityCode) }}>Xóa</Button>
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
                    dataId={updateDataId} />}
            {/* <div>
                <Button sx={{ fontSize: 20, margin: '0 auto', display: 'block' }} color="primary" >Lưu</Button>
            </div> */}
        </div >
    );
}