import { forwardRef, useState, useRef, useEffect } from 'react';
import useAuth from '~/hooks/useAuth';
//validate
import validation from '~/services/validate/index.js';
//material components
import {
    Button, Dialog, Slide, Snackbar, Alert,
    TextField, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper,
    FormControl,
    InputLabel,
    Input,
    InputAdornment, LinearProgress
} from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
//style
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import classNames from 'classnames/bind';
import styles from './AddHousehold.module.scss';
import ConfirmBox from '../ConfirmBox';
import AddResidentDialog from './addResident';
import householdManager from '~/services/api/householdManager';

import {
    useQuery,
    useMutation,
    useQueryClient,
    useQueries
} from '@tanstack/react-query';

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
export default function AddHouseholDialog({ open, onClose }) {
    const { auth } = useAuth();
    const queryClient = useQueryClient();

    // dữ liệu bảng để hiển thị danh sách các nhân khẩu sẽ thêm
    const [people, setPeople] = useState([]);

    const [moveOutDate, setMoveOutDate] = useState(null);

    //handle save button
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const timer = useRef();

    const [deleteId, setDeleteId] = useState(null);

    const [addResidentDialog, setAddResidentDialog] = useState(false);

    const [isDelete, setIsDelete] = useState(false);

    const householdIdRef = useRef();
    const [householdIdError, setHouseholdIdError] = useState('');
    const addressRef = useRef();
    const [addressError, setAddressError] = useState('');
    const scopeRef = useRef();
    const [scopeError, setScopeError] = useState('');
    const moveOutPlaceRef = useRef();
    const moveOutReasonRef = useRef();

    const queryAdd = useMutation({
        mutationFn: async (household) => householdManager.addHousehold(auth.token, household),
        onMutate: () => {
            setLoading(true);
        },
        onError: (error) => {
            setLoading(false);
            console.log(error);
            alert('Thêm hộ khẩu thất bại');
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries('households');
            await queryClient.invalidateQueries('residents');
            setSuccess(true);
            setLoading(false);
            onClose(!open);
        }
    })

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    //handle when clode this dislog
    const [isClose, setIsClose] = useState(false);
    const handleCloseConfirmBox = () => {
        setIsClose(false);
    }

    const handleSuccess = () => {
        setSuccess(false);
    };
    //handle close this dialog
    const handleClose = () => {
        onClose(!open);
        setIsClose(false);
    };

    const handlStartClose = () => {
        if (
            householdIdRef.current.value !== '' ||
            addressRef.current.value !== '' ||
            scopeRef.current.value !== '' ||
            moveOutPlaceRef.current.value !== '' ||
            moveOutReasonRef.current.value !== '' ||
            people.length !== 0 ||
            moveOutDate !== null
        ) {
            setIsClose(true);
        }
        else {
            onClose(false)
        }
    };


    const handleDelete = (id) => {
        setDeleteId(id);
        setIsDelete(true);
    }

    const handleCloseDeleteById = () => {
        setDeleteId(null);
        setIsDelete(false);
    }
    const handleDeleteById = () => {
        setPeople(prev => {
            return prev.filter(item => item.identityCode !== deleteId)
        })
        setIsDelete(false);
        setDeleteId(null);
    }

    const addResident = (resident) => {
        if (
            people.every(
                item => item.identityCode !== resident.identityCode
            )
        ) {
            setPeople(prev => {
                return [...prev, resident]
            });
            return true;
        }
        else {
            return false;
        }
    }
    const handleStartAddResident = () => {
        setAddResidentDialog(true);
    }

    const handleAddHousehold = async () => {
        setLoading(true);
        const householdId = householdIdRef.current.value;
        const address = addressRef.current.value;
        const scope = +scopeRef.current.value;
        const moveOutPlace = moveOutPlaceRef.current.value;
        const moveOutReason = moveOutReasonRef.current.value;
        console.log(scope)
        let canAdd = true;
        if (householdId === '') {
            setHouseholdIdError('Vui lòng nhập số hộ khẩu');
            canAdd = false;
        }
        if (address === '') {
            setAddressError('Vui lòng nhập địa chỉ');
            canAdd = false;
        }
        if (!validation.checkScope(scope)) {
            setScopeError('Vui lòng nhập đúng định dạng');
            canAdd = false;
        }
        if (canAdd) {
            const data = {
                householdId: householdId,
                address: address,
                scope: scope,
                moveOutDate: moveOutDate,
                moveOutPlace: moveOutPlace,
                moveOutReason: moveOutReason,
                nonExistMembers: people
            }
            console.log(data)
            queryAdd.mutate(data)
        }
    }

    return (
        <div>
            <Snackbar open={success} autoHideDuration={4000} onClose={handleSuccess} >
                <Alert onClose={handleSuccess} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    Thên hộ khẩu mới thành công !
                </Alert>
            </Snackbar>
            {addResidentDialog && <AddResidentDialog open={addResidentDialog} onClose={setAddResidentDialog} action={addResident} />}
            <Dialog
                fullWidth={true}
                maxWidth='1000'
                open={open}
                onClose={handlStartClose}
                TransitionComponent={Transition}
            >
                <div className={cx('header-paper-population')}>
                    <Button variant="contained" color="error" onClick={handlStartClose}>Đóng</Button>
                </div>
                {loading && <LinearProgress />}
                <div className={cx('household-paper')}>
                    <h2 className={cx('title-household')}>Thêm hộ khẩu mới</h2>
                    <div className={cx('household-detail')}>
                        <TextField
                            sx={{ width: '400px' }}
                            required
                            label="Số hộ khẩu"
                            variant="standard"
                            defaultValue=''
                            inputRef={householdIdRef}
                            error={householdIdError !== ''}
                            helperText={householdIdError}
                        />
                        <TextField
                            sx={{ width: '400px' }}
                            label="Nơi thường trú"
                            defaultValue=''
                            variant="standard"
                            inputRef={addressRef}
                            error={addressError !== ''}
                            helperText={addressError}
                        />
                        <TextField
                            sx={{ width: '400px' }}
                            required
                            label="Tổ phụ trách"
                            defaultValue=''
                            variant="standard"
                            inputRef={scopeRef}
                            error={scopeError !== ''}
                            helperText={scopeError}
                        />
                    </div>
                    <div className={cx('household-detail')}>
                        <TextField
                            defaultValue=''
                            sx={{ width: '400px' }}
                            inputRef={moveOutPlaceRef}
                            label="Địa điểm chuyển đi"
                            variant="standard"
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DatePicker
                                value={moveOutDate}
                                onChange={(newValue) => {
                                    setMoveOutDate(newValue);
                                }}
                                renderInput={({ inputRef, inputProps, InputProps }) =>
                                    <FormControl sx={{ width: 400 }} variant="standard">
                                        <InputLabel htmlFor="input_login_account">
                                            Ngày chuyển đi
                                        </InputLabel>
                                        <Input
                                            inputRef={inputRef}
                                            id="input_login_account"
                                            endAdornment={
                                                <InputAdornment position="start">
                                                    {InputProps?.endAdornment}
                                                </InputAdornment>
                                            }
                                            {...inputProps}
                                        />
                                    </FormControl>
                                }
                            />
                        </LocalizationProvider>
                        <TextField
                            sx={{ width: '400px' }}
                            label="Lý do chuyển đi"
                            inputRef={moveOutReasonRef}
                            defaultValue=""
                            variant="standard"
                        />
                    </div>
                    <div>
                        <Button variant="contained"
                            sx={{ margin: '5px 20px' }}
                            color="primary" onClick={handleStartAddResident}>Thêm thành viên</Button>
                    </div>
                    <h3>Thông tin thành viên trong hộ khẩu</h3>
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
                            {people.length !== 0 ?
                                <TableBody>
                                    {people.map((row, index) => (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell align="center">{row.identityCode}</StyledTableCell>
                                            <StyledTableCell align="center">{row.fullName}</StyledTableCell>
                                            <StyledTableCell align="center">{row.dateOfBirth ? row.dateOfBirth.$d.getDate() : null}</StyledTableCell>
                                            <StyledTableCell align="center">{row.isMale ? 'Nam' : 'Nữ'}</StyledTableCell>
                                            <StyledTableCell align="center">{row.relationShip}</StyledTableCell>
                                            <StyledTableCell align="center" component="th" scope="row">
                                                <Button>
                                                    Chi tiết
                                                </Button>
                                                <Button
                                                    onClick={() => { handleDelete(row.identityCode) }}
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
                    <div width='100%'>
                        <Button onClick={handleAddHousehold} sx={{ display: 'block', margin: '0 auto' }} variant='contained' color='secondary'>Thêm</Button>
                    </div>
                </div>
            </Dialog>
            <ConfirmBox key='close' open={isClose} onClose={handleCloseConfirmBox} onAgree={handleClose} />
            <ConfirmBox key='delete' open={isDelete} onClose={handleCloseDeleteById} onAgree={handleDeleteById} title='Bạn có chắc muốn xóa' />
        </div >
    );
}