import { useState, useEffect, useCallback } from 'react';
import { Fab, Box, TextField, Button, Backdrop, CircularProgress, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, } from '@mui/material';
import { Add } from '@mui/icons-material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

//scss
import styles from './SeparateHousehold.module.scss'
import classNames from 'classnames/bind';
//validate
import validation from '~/services/validate/index.js';



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

const rowData =
    { idenftification: '123466769234', name: 'Nguyễn Văn D', birthday: '01/01/1990', gender: 'Nam', relationship: 'Chủ hộ', soHoKhau: '123456789', toPhuTrach: '1' };

const cx = classNames.bind(styles);

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function makeRandomIdentification() {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 12; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export default function SeparateHousehold() {

    const [valueIdentity, setValueIdentity] = useState([]);

    const [valueInput, setValueInput] = useState('');
    const [valueMainInput, setMainValueInput] = useState('');


    const resetInputIdentification = useCallback(
        () => {
            setValueInput('');
            setMainValueInput('');
        }, []
    );

    const [errorMessage, setErrorMessage] = useState('');
    const [checkErrorStatus, setCheckErrorStatus] = useState(false);
    const [errorMessageMain, setErrorMessageMain] = useState('');
    const [checkErrorMainStatus, setCheckErrorMainStatus] = useState(false);

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const addIdentification = () => {
        const check = validation.checkIdentifi(valueInput);
        if (check.isValid) {
            setValueIdentity(
                prev => {
                    return [...prev, {
                        ...rowData,
                        idenftification: makeRandomIdentification()
                    }]
                }
            );
            resetInputIdentification();
        }
        else {
            setCheckErrorStatus(true);
            setErrorMessage(check.message);
        }
    };
    const addMainIdentification = () => {
        const check = validation.checkIdentifi(valueInput);
        if (check.isValid) {
            setValueIdentity(
                prev => {
                    return [...prev, {
                        ...rowData,
                        idenftification: makeRandomIdentification()
                    }]
                }
            );
            resetInputIdentification();
        }
        else {
            setCheckErrorMainStatus(true);
            setErrorMessageMain(check.message);
        }
    };

    const handleInput = useCallback(
        (e) => {
            setValueInput(e.target.value);
            if (checkErrorStatus) {
                setCheckErrorStatus(false)
            }
        }, []);

    const [listIdentification, setListIdentification] = useState([]);
    const handleDelete = () => {
        setValueIdentity(
            prev => {
                return prev.filter((item, index) => index !== 0)
            }
        )
    }

    return (
        <div className={cx('container')}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    marginBottom: '5px'
                }}
                noValidate
                autoComplete="off"
            >
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <h1>Đơn xin tách hộ khẩu</h1>
                <div>
                    <TextField label="Nơi thường trú" variant="outlined" />
                    <TextField label="Tổ phụ trách" variant="outlined" />
                </div>
                <div className={cx('identification-container')}>
                    <TextField
                        label="CMND/CCCD chủ hộ"
                        value={valueMainInput}
                        onChange={(e) => setMainValueInput(e.target.value)}
                        variant="outlined" />
                    <Fab
                        color="secondary"
                        size="small"
                        component="span"
                        aria-label="add"
                        variant="extended"
                        sx={{ margin: '0 5px' }}
                        onClick={addMainIdentification}
                    >
                        <Add />
                    </Fab>
                    {checkErrorMainStatus && <span className={cx('err-mes')}>{errorMessage}</span>}
                </div>
                <div className={cx('line-form')}>
                    <div >
                        <h3>CCCD/CMND các thành viên</h3>
                        <div className={cx('identification-container')}>
                            <TextField
                                required label=""
                                value={valueInput}
                                onChange={handleInput}
                                variant="outlined"
                            />
                            <Fab
                                color="secondary"
                                size="small"
                                component="span"
                                aria-label="add"
                                variant="extended"
                                sx={{ margin: '0 5px' }}
                                onClick={addIdentification}
                            >
                                <Add />
                            </Fab>
                            {checkErrorStatus && <span className={cx('err-mes')}>{errorMessage}</span>}
                        </div>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 1000 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontSize: 20 }} align="left" colSpan={9}>
                                        Thông tin thành viên trong hộ khẩu
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <StyledTableCell sx={{ fontSize: 10 }} align="center">CCCD/CMND</StyledTableCell>
                                    <StyledTableCell sx={{ fontSize: 10 }} align="center">Họ và tên</StyledTableCell>
                                    <StyledTableCell sx={{ fontSize: 10 }} align="center">Ngày sinh</StyledTableCell>
                                    <StyledTableCell sx={{ fontSize: 10 }} align="center">Giới tính</StyledTableCell>
                                    <StyledTableCell sx={{ fontSize: 10 }} align="center">Quan hệ với chủ hộ</StyledTableCell>
                                    <StyledTableCell sx={{ fontSize: 10 }} align="center">Sổ hộ khẩu</StyledTableCell>
                                    <StyledTableCell sx={{ fontSize: 10 }} align="center">Tổ phụ trách</StyledTableCell>
                                    <StyledTableCell sx={{ fontSize: 10 }} align="center">Edit</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {valueIdentity.map((row, index) => (
                                    <StyledTableRow key={index}>
                                        {Object.keys(row).map((key, index1) => {
                                            if (key !== 'id') {
                                                return (
                                                    <StyledTableCell key={index + ' ' + index1} align="center" component="th" scope="row">
                                                        {row[key]}
                                                    </StyledTableCell>
                                                )
                                            }
                                            return null;
                                        })}
                                        <StyledTableCell align="center" component="th" scope="row">
                                            <Button>
                                                Sửa
                                            </Button>
                                            <Button onClick={handleDelete} >Xóa</Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Box>
            <Button onClick={handleToggle} style={{ margin: '0 auto', display: 'block' }} variant="contained">Gửi</Button>
        </div>
    );
}