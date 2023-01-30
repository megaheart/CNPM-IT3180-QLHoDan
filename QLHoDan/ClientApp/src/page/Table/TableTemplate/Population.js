import { useState, forwardRef, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { Button, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, TextField, Slide, Box, Dialog } from '@mui/material';

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

function createData(idenftification, name, birthday, gender, relationship, soHoKhau, toPhuTrach) {
    return { idenftification, name, birthday, gender, relationship, soHoKhau, toPhuTrach };
}
const rowData = [
    { idenftification: '123466769', name: 'Nguyễn Văn D', birthday: '01/01/1990', gender: 'Nam', relationship: 'Chủ hộ', soHoKhau: '123456789', toPhuTrach: '1' },
    { idenftification: '123454785', name: 'Nguyễn Văn C', birthday: '01/01/1990', gender: 'Nam', relationship: 'Vợ', soHoKhau: '123456789', toPhuTrach: '1' },
    { idenftification: '123456789', name: 'Nguyễn Văn A', birthday: '01/01/2002', gender: 'Nam', relationship: 'Con trai', soHoKhau: '123456789', toPhuTrach: '1' },
    { idenftification: '123456767', name: 'Nguyễn Văn B', birthday: '01/01/2002', gender: 'Nam', relationship: 'Con gái', soHoKhau: '123456789', toPhuTrach: '1' },
]
const Rows = [
    ...rowData.map((item, index) => {
        return {
            ...createData(...Object.values(item)),
            id: index
        }
    }
    )
];

export default function Population({ editMode }) {
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
    const [rows, setRows] = useState(Rows);

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
                            <TableCell sx={{ fontSize: 20 }} align="left" colSpan={9}>
                                Thông tin thành viên trong hộ khẩu
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell sx={{ fontSize: 20 }} align="center">CCCD/CMND</StyledTableCell>
                            <StyledTableCell sx={{ fontSize: 20 }} align="center">Họ và tên</StyledTableCell>
                            <StyledTableCell sx={{ fontSize: 20 }} align="center">Ngày sinh</StyledTableCell>
                            <StyledTableCell sx={{ fontSize: 20 }} align="center">Giới tính</StyledTableCell>
                            <StyledTableCell sx={{ fontSize: 20 }} align="center">Quan hệ với chủ hộ</StyledTableCell>
                            <StyledTableCell sx={{ fontSize: 20 }} align="center">Sổ hộ khẩu</StyledTableCell>
                            <StyledTableCell sx={{ fontSize: 20 }} align="center">Tổ phụ trách</StyledTableCell>
                            <StyledTableCell sx={{ fontSize: 20 }} align="center">Edit</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <StyledTableRow key={row.idenftification}>
                                {Object.keys(row).map((key) => {
                                    if (key !== 'id') {
                                        return (
                                            <StyledTableCell key={key} align="center" component="th" scope="row">
                                                {row[key]}
                                            </StyledTableCell>
                                        )
                                    }
                                    return null;
                                })}
                                <StyledTableCell key={row.idenftification + index} align="center" component="th" scope="row">
                                    <Button key={row.identification + 'fix'}
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
                            label="CCCD/CMND"
                            value={identification}
                            onChange={(e) => setIdentification(e.target.value)}
                            variant="standard"
                        />
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
                    </div>
                    <div>
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
                    </div>
                    <div>
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
                        <TextField
                            sx={{ width: '400px' }}
                            inputProps={{ style: { fontSize: 15 } }}
                            InputLabelProps={{ style: { fontSize: 20 } }}
                            required
                            label="Sổ hộ khẩu"
                            value={soHoKhau}
                            onChange={(e) => setSoHoKhau(e.target.value)}
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