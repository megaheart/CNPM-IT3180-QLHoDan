import {
    Button, Dialog, Slide,
    TextField, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper,
    FormControl, Box, Fab, MenuItem, Backdrop, CircularProgress
} from '@mui/material';
import { useState, useCallback, useRef, useEffect, forwardRef } from 'react';
import { Add, CloseOutlined, DoneSharp } from '@mui/icons-material';
import styles from './HK.module.scss'
import classNames from 'classnames/bind';
import { DataGrid } from '@mui/x-data-grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import ConfirmBox from '~/page/Table/DiaLog/ConfirmBox';
import { tableCellClasses } from '@mui/material/TableCell';
import useAuth from '~/hooks/useAuth';
import formHouseholdRegister from '~/services/api/registerHousehold';
const cx = classNames.bind(styles);
const genders = [
    { value: 'male', label: 'Nam' },
    { value: 'female', label: 'Nữ' }
]

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

export default function FormHKComponent() {
    const [rows, setRows] = useState([]);

    const { auth } = useAuth();

    const [visible, setVisible] = useState(false);
    const [visibleDes, setVisibleDes] = useState(false);
    // const [NK, setNK] = useState([]);
    const [open, setOpen] = useState(false);

    const [idViewing, setIdViewing] = useState(null);

    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    };

    const [openConfirm, setOpenConfirm] = useState(false);

    const householdIdRef = useRef(null);
    const addressRef = useRef(null);
    const scopeRef = useRef(null);

    const [birthday, setBirthday] = useState(null);
    const [moveInDate, setMoveInDate] = useState(null);


    const fullNameRef = useRef(null);
    const aliasRef = useRef(null);
    const dateOfBirthRef = useRef(null);
    const isMaleRef = useRef(null);
    const birthPlaceRef = useRef(null);
    const nativeLandRef = useRef(null);
    const ethnicRef = useRef(null);
    const nationRef = useRef(null);
    const jobRef = useRef(null);
    const workplaceRef = useRef(null);
    const identityCodeRef = useRef(null);
    const relationShipRef = useRef(null);
    const academicLevelRef = useRef(null);
    const criminalRecordRef = useRef(null);
    const moveInDateRef = useRef(null);
    const moveInReasonRef = useRef(null);


    const handleNKFrom = useCallback(() => {
        setVisible(true);
        if (visibleDes === false) {
            setVisibleDes(true)
        }
    }, [visibleDes])


    const resetInput = () => {
        fullNameRef.current.value = '';
        aliasRef.current.value = '';
        isMaleRef.current.value = 'male';
        birthPlaceRef.current.value = '';
        nativeLandRef.current.value = '';
        ethnicRef.current.value = '';
        nationRef.current.value = '';
        jobRef.current.value = '';
        workplaceRef.current.value = '';
        identityCodeRef.current.value = '';
        relationShipRef.current.value = '';
        academicLevelRef.current.value = '';
        criminalRecordRef.current.value = '';
        moveInReasonRef.current.value = '';
        setMoveInDate(null);
        setBirthday(null);
    }

    const handleBtnDes = () => {
        if (visible === true) {
            setVisible(false);
            resetInput();
            setVisibleDes(false);
            setIdViewing(null);
        }
    };

    const handleAddButton = () => {

    }


    const handleAddNK = () => {
        const currentData = {
            fullName: fullNameRef.current.value || '',
            alias: aliasRef.current.value || '',
            dateOfBirth: birthday,
            isMale: isMaleRef.current.value === 'male' ? true : false,
            birthPlace: birthPlaceRef.current.value || '',
            nativeLand: nativeLandRef.current.value || '',
            ethnic: ethnicRef.current.value || '',
            nation: nationRef.current.value || '',
            job: jobRef.current.value || '',
            workplace: workplaceRef.current.value || '',
            identityCode: identityCodeRef.current.value || '',
            relationShip: relationShipRef.current.value || '',
            academicLevel: academicLevelRef.current.value || '',
            criminalRecord: criminalRecordRef.current.value || '',
            moveInDate: moveInDate,
            moveInReason: moveInReasonRef.current.value || ''
        }
        if (
            currentData.dateOfBirth === null ||
            (currentData.identityCode.length !== 9 &&
                currentData.identityCode.length !== 12) ||
            currentData.moveInDate === null
        ) {
            alert('Vui lòng nhập đầy đủ thông tin')
        }
        else {
            setRows(prev => [...prev, currentData]);
            resetInput();
            setVisible(false);
            setVisibleDes(false)
        }

    };

    const [deletedId, setDeletedId] = useState(null);
    const startDelete = (id) => {
        setDeletedId(id);
        setOpenConfirm(true);
    }

    const handleCloseConfirmBox = () => {
        setOpenConfirm(false);
        setDeletedId(null);
    }

    const handleDeleteRow = () => {
        setRows(prev => prev.filter((_, i) => i !== deletedId));
        setVisible(false);
    }

    const handleChangeDetailResident = (index) => {
        setIdViewing(index);
        const viewData = rows[index];
        fullNameRef.current.value = viewData.fullName;
        aliasRef.current.value = viewData.alias;
        setBirthday(viewData.dateOfBirth);
        isMaleRef.current.value = viewData.isMale;
        birthPlaceRef.current.value = viewData.birthPlace
        nativeLandRef.current.value = viewData.nativeLand
        ethnicRef.current.value = viewData.ethnic
        nationRef.current.value = viewData.nation
        jobRef.current.value = viewData.job
        workplaceRef.current.value = viewData.workplace
        identityCodeRef.current.value = viewData.identityCode
        relationShipRef.current.value = viewData.relationShip
        academicLevelRef.current.value = viewData.academicLevel
        criminalRecordRef.current.value = viewData.criminalRecord
        setMoveInDate(viewData.moveInDate)
        moveInReasonRef.current.value = viewData.moveInReason
        setVisible(true);
    }

    const handleChangeDetail = () => {
        const currentData = {
            fullName: fullNameRef.current.value || '',
            alias: aliasRef.current.value || '',
            dateOfBirth: birthday,
            isMale: isMaleRef.current.value === 'male' ? true : false,
            birthPlace: birthPlaceRef.current.value || '',
            nativeLand: nativeLandRef.current.value || '',
            ethnic: ethnicRef.current.value || '',
            nation: nationRef.current.value || '',
            job: jobRef.current.value || '',
            workplace: workplaceRef.current.value || '',
            identityCode: identityCodeRef.current.value || '',
            relationShip: relationShipRef.current.value || '',
            academicLevel: academicLevelRef.current.value || '',
            criminalRecord: criminalRecordRef.current.value || '',
            moveInDate: moveInDate,
            moveInReason: moveInReasonRef.current.value || ''
        }
        console.log(currentData);
        if (
            currentData.dateOfBirth === null ||
            (currentData.identityCode.length !== 9 &&
                currentData.identityCode.length !== 12) ||
            currentData.moveInDate === null
        ) {
            console.log('Vui lòng nhập đúng và đầy đủ thông tin')
        }
        else {
            setRows(prev =>
                prev.map((item, index) => {
                    if (index === idViewing) {
                        return currentData;
                    }
                    return item;
                }));
            resetInput();
            setVisible(false);
            setIdViewing(null);
        }
    }

    const handleSendForm = async () => {

        const formData = new FormData();
        formData.append('HouseholdId', householdIdRef.current.value);
        formData.append('Address', addressRef.current.value);
        formData.append('Scope', scopeRef.current.value);
        // for (let i = 0; i < rows.length; i++) {
        //     formData.append('Members', rows[i]);
        // }
        formData.append('Members', JSON.stringify(rows));
        setOpen(true);
        await formHouseholdRegister.sendFormHouseholdRegister(
            auth.token,
            formData
        ).catch(err => {
            console.log(err);
        }).finally(() => {
            setOpen(false);
        });

    }

    return (
        <div className={cx('container')}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <ConfirmBox key='delete' open={openConfirm} onClose={handleCloseConfirmBox} onAgree={handleDeleteRow} title='Bạn có chắc muốn xóa' />
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #ccc',
                    borderRadius: 5,
                    padding: 2,
                    marginBottom: 1, backgroundColor: '#fff',
                }}
                noValidate
                autoComplete="off"
            >
                <h1 className={cx('title')}>Đơn đăng ký hộ khẩu</h1>
                <div className={cx('input-text-area')}>
                    <TextField helperText='' required label="Số hộ khẩu" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        inputRef={householdIdRef}
                        variant="standard" />
                    <TextField helperText='' label="Nơi thường trú" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        inputRef={addressRef}
                        variant="standard" />
                    <TextField helperText='' label="Tổ phụ trách" inputProps={{
                        style: { fontSize: 20 }
                    }}
                        InputLabelProps={{
                            style: { fontSize: 20 }
                        }}
                        inputRef={scopeRef}
                        variant="standard" />
                </div>

                <div className={cx('add-nk-area')}>
                    <Fab
                        color="primary"
                        size="small"
                        component="span"
                        aria-label="add"
                        variant="extended"
                        onClick={handleNKFrom}
                    >
                        <Add /> Thêm nhân khẩu
                    </Fab>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={visible}
                    >
                        <div className={cx('backdrop-add')}>
                            <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
                                <TextField helperText='' required inputRef={fullNameRef} label="Họ và tên" defaultValue=''
                                    variant="standard" />
                                <TextField helperText='' required inputRef={aliasRef} label="Bí danh" defaultValue=''
                                    variant="standard" />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        required
                                        label="Ngày sinh"
                                        value={birthday}
                                        inputRef={dateOfBirthRef}
                                        onChange={(newValue) => {
                                            setBirthday(newValue);
                                        }}
                                        defaultValue={null}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                <TextField helperText='' required inputRef={birthPlaceRef} label="Nơi sinh" defaultValue=''
                                    variant="standard" />
                                <TextField helperText='' required inputRef={nativeLandRef} label="Nguyên quán" defaultValue=''
                                    variant="standard" />
                                <TextField helperText='' required inputRef={ethnicRef} label="Dân tộc" defaultValue=''
                                    variant="standard" />
                                <TextField helperText='' required inputRef={nationRef} label="Quốc tịch" defaultValue=''
                                    variant="standard" />
                                <TextField helperText='' required inputRef={jobRef} label="Nghề nghiệp" defaultValue=''
                                    variant="standard" />
                                <TextField helperText='' required inputRef={workplaceRef} label="Nơi làm việc" defaultValue=''
                                    variant="standard" />
                                <TextField helperText='' required inputRef={identityCodeRef} label="CMND/CCCD" defaultValue=''
                                    variant="standard" />
                                <TextField helperText='' required inputRef={relationShipRef} label="Quan hệ với chủ hộ" defaultValue=''
                                    variant="standard" />
                                <TextField helperText='' required inputRef={academicLevelRef} label="Trình độ học vấn" defaultValue=''
                                    variant="standard" />
                                <TextField helperText='' required inputRef={criminalRecordRef} label="Tiền án" defaultValue=''
                                    variant="standard" />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        required
                                        label="Ngày chuyển đến"
                                        value={moveInDate}
                                        inputRef={moveInDateRef}
                                        onChange={(newValue) => {
                                            setMoveInDate(newValue);
                                        }}
                                        defaultValue={null}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                <TextField helperText='' required inputRef={moveInReasonRef} label="Lý do chuyển đến" defaultValue=''
                                    variant="standard" />
                                <TextField helperText='' required
                                    id="standard-select-gender"
                                    select
                                    label="Giới tính"
                                    variant="standard"
                                    inputRef={isMaleRef}
                                    defaultValue="male"
                                >
                                    {genders.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>

                            <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
                                {idViewing ?
                                    <Fab
                                        sx={{ marginLeft: 1, maxWidth: 300 }}
                                        color="success"
                                        size="small"
                                        component="span"
                                        aria-label="add"
                                        variant="extended"
                                        onClick={handleChangeDetail}
                                    >
                                        <DoneSharp /> Lưu thay đổi
                                    </Fab> :
                                    <Fab
                                        sx={{ marginLeft: 1, maxWidth: 120 }}
                                        color="success"
                                        size="small"
                                        component="span"
                                        aria-label="add"
                                        variant="extended"
                                        onClick={handleAddNK}
                                    >
                                        <DoneSharp /> Đồng ý
                                    </Fab>
                                }
                                <Fab
                                    sx={{ marginLeft: 1, width: 100 }}
                                    color="error"
                                    size="small"
                                    component="span"
                                    aria-label="add"
                                    variant="extended"
                                    onClick={handleBtnDes}
                                >
                                    <CloseOutlined /> Đóng
                                </Fab>
                            </div>

                        </div>
                    </Backdrop>

                    <div style={{ width: '100%' }}>
                        <h3>Danh sách nhân khẩu</h3>
                        {/* <DataGrid
                            sx={{ fontSize: 13, margin: '10 0' }}
                            rows={rowstable}
                            columns={columns}
                            autoPageSize={true}
                            autoHeight={true}
                            pageSize={3}
                            rowsPerPageOptions={[5]}
                            aria-label="Nhân khẩu"
                            disableSelectionOnClick
                        /> */}
                        <TableContainer sx={{ padding: '0 0px', height: 240 }} component={Paper}>
                            <Table stickyHeader sx={{ minWidth: 1000 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">CCCD/CMND</StyledTableCell>
                                        <StyledTableCell align="center">Họ và tên</StyledTableCell>
                                        <StyledTableCell align="center">Ngày sinh</StyledTableCell>
                                        <StyledTableCell align="center">Giới tính</StyledTableCell>
                                        <StyledTableCell align="center">Quan hệ với chủ hộ</StyledTableCell>
                                        <StyledTableCell align="center">Edit</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                {rows.length !== 0 ?
                                    <TableBody>
                                        {rows.map((row, index) => (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell align="center">{row.identityCode}</StyledTableCell>
                                                <StyledTableCell align="center">{row.fullName}</StyledTableCell>
                                                <StyledTableCell align="center">{row.dateOfBirth ? new Date(row.dateOfBirth).toLocaleDateString(
                                                    'vi-VN',
                                                    { day: '2-digit', month: '2-digit', year: 'numeric' }
                                                ) : null}</StyledTableCell>
                                                <StyledTableCell align="center">{row.isMale ? 'Nam' : 'Nữ'}</StyledTableCell>
                                                <StyledTableCell align="center">{row.relationShip}</StyledTableCell>
                                                <StyledTableCell align="center" component="th" scope="row">
                                                    <Button onClick={
                                                        () => {
                                                            handleChangeDetailResident(index)
                                                        }
                                                    }
                                                    >
                                                        Chi tiết
                                                    </Button>
                                                    <Button
                                                        onClick={() => startDelete(index)}
                                                    >Xóa</Button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                    :
                                    (
                                        <TableBody>
                                            <TableRow>
                                                <StyledTableCell align="center"></StyledTableCell>
                                                <StyledTableCell align="center"></StyledTableCell>
                                                <StyledTableCell align="center">Chưa có thành viên</StyledTableCell>
                                                <StyledTableCell align="center"></StyledTableCell>
                                                <StyledTableCell align="center"></StyledTableCell>
                                                <StyledTableCell align="center"></StyledTableCell>
                                            </TableRow>
                                        </TableBody>
                                    )
                                }
                            </Table>
                        </TableContainer>
                    </div>
                </div>
                <Button onClick={handleSendForm} color="primary" variant="contained">Gửi</Button>
            </Box>

        </div>
    );
}