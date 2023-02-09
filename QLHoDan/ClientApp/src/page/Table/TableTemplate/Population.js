import { useState, forwardRef, useCallback, useEffect } from 'react';
import useAuth from '~/hooks/useAuth';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { Button, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, TextField, Slide, Box, Dialog } from '@mui/material';
import Skeleton from '../../Skeleton';
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



export default function Population({ editMode, data, loading }) {
    const queryClient = useQueryClient();
    const { auth } = useAuth();
    //những id của nhân khẩu sẽ bị xóa
    const [deleteIds, setDeleteIds] = useState([]);
    //
    const [open, setOpen] = useState(false);
    const handleClose = useCallback(() => setOpen(false), []);
    //dữ liệu nhân khẩu đang được edit
    const [editRow, setEditRow] = useState({});
    //dữ liệu nhân khẩu các input
    const [identification, setIdentification] = useState('');
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [relationship, setRelationship] = useState('');
    const [soHoKhau, setSoHoKhau] = useState('');
    const [toPhuTrach, setToPhuTrach] = useState('');

    //dữ liệu nhân khẩu
    const [rows, setRows] = useState();


    const handleDeleteRowsData = (id) => {
        setRows(
            prev => prev.filter(item => item.id !== id)
        );
        setDeleteIds(
            prev => [...prev, id]
        );
    }

    const handleEditRowData = (id) => {
        setOpen(true);
        setEditRow(rows.find(item => item.id === id));
    }

    const handleEditField = useCallback((identification, name, birthday, gender, relationship, soHoKhau, toPhuTrach) => {
        setIdentification(identification);
        setName(name);
        setBirthday(birthday);
        setGender(gender);
        setRelationship(relationship);
        setSoHoKhau(soHoKhau);
        setToPhuTrach(toPhuTrach);
    }, []);
    //lưu dữ liệu nhân khẩu
    const handleSave = () => {
        setRows(
            prev => prev.map(item => {
                if (item.id === editRow.id) {
                    return {
                        id: item.id,
                        identification,
                        name,
                        birthday,
                        gender,
                        relationship,
                        soHoKhau,
                        toPhuTrach
                    }
                }
                return item;
            })
        );
        setOpen(false);
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
                                            handleEditRowData(row.id);
                                            handleEditField(row.idenftification, row.name, row.birthday, row.gender, row.relationship, row.soHoKhau, row.toPhuTrach);
                                        }
                                        }
                                    >
                                        Sửa
                                    </Button>
                                    <Button
                                        key={row.identification + 'delete'}
                                        disabled={!editMode} onClick={() => { handleDeleteRowsData(row.id) }}>Xóa</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div >
                        <TextField
                            sx={{ width: '600px' }}
                            inputProps={{ style: { fontSize: 15 } }}
                            InputLabelProps={{ style: { fontSize: 20 } }}
                            required
                            label="Họ và tên"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant="standard"
                        />
                        <TextField
                            sx={{ width: '600px' }}
                            inputProps={{ style: { fontSize: 15 } }}
                            InputLabelProps={{ style: { fontSize: 20 } }}
                            required
                            label="Ngày sinh"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            variant="standard"
                        />
                    </div>
                    <div>
                        <TextField
                            sx={{ width: '400px' }}
                            inputProps={{ style: { fontSize: 15 } }}
                            InputLabelProps={{ style: { fontSize: 20 } }}
                            required
                            label="Giới tính"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            variant="standard"
                        />
                        <TextField
                            sx={{ width: '400px' }}
                            inputProps={{ style: { fontSize: 15 } }}
                            InputLabelProps={{ style: { fontSize: 20 } }}
                            required
                            label="Quan hệ với chủ hộ"
                            value={relationship}
                            onChange={(e) => setRelationship(e.target.value)}
                            variant="standard"
                        />
                    </div>
                    <div>
                        <TextField
                            sx={{ width: '400px' }}
                            inputProps={{ style: { fontSize: 15 } }}
                            InputLabelProps={{ style: { fontSize: 20 } }}
                            required
                            label="Tổ phụ trách"
                            value={toPhuTrach}
                            onChange={(e) => setToPhuTrach(e.target.value)}
                            variant="standard"
                        />
                    </div>
                    <div>
                        <Button sx={{ fontSize: 20, margin: '0 auto', display: 'block' }} color="primary" onClick={handleSave}>Lưu</Button>
                    </div>
                </Box>
            </Dialog>
            {/* <div>
                <Button sx={{ fontSize: 20, margin: '0 auto', display: 'block' }} color="primary" >Lưu</Button>
            </div> */}
        </div >
    );
}