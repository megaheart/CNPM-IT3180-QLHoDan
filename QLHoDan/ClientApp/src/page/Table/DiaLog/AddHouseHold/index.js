import * as React from 'react';
import { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
//validate
import validation from '~/services/validate/index.js';
//material components
import {
    Button, Dialog, CircularProgress, Box, Fab, Slide, Snackbar, Alert,
    TextField, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper
} from '@mui/material';
import { Add } from '@mui/icons-material';
// import ListItemText from '@mui/material/ListItemText';
// import ListItem from '@mui/material/ListItem';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import CloseIcon from '@mui/icons-material/Close';
import { green } from '@mui/material/colors';
//icons material
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
//style
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import classNames from 'classnames/bind';
import styles from './AddHousehold.module.scss';
import ConfirmBox from '../ConfirmBox';

const cx = classNames.bind(styles);
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
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
export default function AddHouseholDialog({ open, onClose }) {
    // dữ liệu bảng để hiển thị danh sách các nhân khẩu sẽ thêm
    const [people, setPeople] = useState([]);
    // CCCD của thành viên để add vào
    const [identificatiinInput, setIdentificationInput] = useState('');
    // CCCD của chủ hộ để add vào
    const [identificatiinInputMain, setIdentificationInputMain] = useState('');
    //handle save button
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const timer = useRef();
    const [errorMessage, setErrorMessage] = useState('');
    const [checkErrorStatus, setCheckErrorStatus] = useState(false);
    const [errorMessageMain, setErrorMessageMain] = useState('');
    const [checkErrorMainStatus, setCheckErrorMainStatus] = useState(false);
    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);
    const handleSave = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 2000);
        }
    };
    const resetInputIdentification = useCallback(
        () => {
            setIdentificationInput('');
            setIdentificationInputMain('');
        }, []
    );
    //them thanh vien vao ho khau bang CMND/CCCD, chỉnh sửa sau
    const addIdentification = () => {
        const check = validation.checkIdentifi(identificatiinInput);
        if (check.isValid) {
            setPeople(
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
    //them chu ho vao ho khau bang CMND/CCCD, chỉnh sửa sau
    const addMainIdentification = () => {
        const check = validation.checkIdentifi(identificatiinInputMain);
        if (check.isValid) {
            setPeople(
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
    //handle when clode this dislog
    const [isClose, setIsClose] = useState(false);
    const handleCloseConfirmBox = useCallback(() => {
        setIsClose(false);
    }, []);

    // const [open, setOpen] = React.useState(false);
    const handleSuccess = () => {
        setSuccess(false);
    };
    //handle close this dialog
    const handleClose = () => {
        onClose(!open);
        setIsClose(false);
    };
    const handleInput = useCallback(
        (e) => {
            setIdentificationInput(e.target.value);
            if (checkErrorStatus) {
                setCheckErrorStatus(false)
            }
        }, []);

    const handlStartClose = () => {
        onClose(!open);
    };
    const handleDelete = () => {
        setIdentificationInput(
            prev => {
                return prev.filter((item, index) => index !== 0)
            }
        )
    }
    return (
        <div>
            <Snackbar open={success} autoHideDuration={6000} onClose={handleSuccess} >
                <Alert onClose={handleSuccess} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    Thên hộ khẩu mới thành công !
                </Alert>
            </Snackbar>
            <Dialog
                fullWidth={true}
                maxWidth='1000'
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <div className={cx('header-paper-population')}>
                    <Button variant="contained" color="error" onClick={handlStartClose}>Đóng</Button>
                </div>
                <div className={cx('household-paper')}>
                    <h2 className={cx('title-household')}>Thêm hộ khẩu mới</h2>
                    <div className={cx('household-detail')}>
                        <TextField
                            sx={{ width: '400px' }}
                            required
                            label="Số hộ khẩu"
                            defaultValue="123"
                            variant="standard"
                        />
                        <TextField
                            sx={{ width: '400px' }}
                            required
                            label="Nơi thường trú"
                            defaultValue="123"
                            variant="standard"
                        />
                        <TextField
                            sx={{ width: '400px' }}
                            required
                            label="Tổ phụ trách"
                            defaultValue="123"
                            variant="standard"
                        />
                    </div>
                </div>
                <div className={cx('line-form')}>
                    <h3>CCCD/CMND chủ hộ ( Sau khi nhập ấn dấu + để tự động thêm vào bảng)</h3>
                    <div className={cx('identification-container')}>
                        <TextField
                            label=""
                            value={identificatiinInputMain}
                            onChange={(e) => setIdentificationInputMain(e.target.value)}
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
                </div>
                <div className={cx('line-form')}>
                    <h3>CCCD/CMND thành viên ( Sau khi nhập ấn dấu + để tự động thêm vào bảng)</h3>
                    <div className={cx('identification-container')}>
                        <TextField
                            required label=""
                            value={identificatiinInput}
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
                <TableContainer sx={{ padding: '0 20px' }} component={Paper}>
                    <Table stickyHeader sx={{ minWidth: 1000 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: 20 }} align="left" colSpan={9}>
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
                            {people.length > 0 && people.map((row, index) => (
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
                            {
                                people.length === 0 &&
                                (
                                    <div>
                                        <StyledTableRow>
                                            <StyledTableCell align="center" component="th" scope="row" >
                                            </StyledTableCell>
                                        </StyledTableRow>
                                        <StyledTableRow>
                                            <StyledTableCell align="center" component="th" scope="row">
                                                Chưa có thành viên nào
                                            </StyledTableCell>
                                        </StyledTableRow>
                                        <StyledTableRow>
                                            <StyledTableCell align="center" component="th" scope="row" >
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    </div>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <div>
                    <Box sx={{ m: 1, position: 'relative' }}>
                        <Fab
                            aria-label="save"
                            color="primary"
                            sx={buttonSx}
                            onClick={handleSave}
                        >
                            {success ? <CheckIcon /> : <SaveIcon />}
                        </Fab>
                        {loading && (
                            <CircularProgress
                                size={68}
                                sx={{
                                    color: green[500],
                                    position: 'absolute',
                                    top: -6,
                                    left: -6,
                                    zIndex: 1,
                                }}
                            />
                        )}
                    </Box>

                </div>
            </Dialog>
            <ConfirmBox open={isClose} onClose={handleCloseConfirmBox} onAgree={handleClose} />
        </div >
    );
}