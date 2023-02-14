import { forwardRef, useState, useRef } from 'react';
//validate
import validation from '~/services/validate/index.js';
//material components
import {
    Button, Dialog, Slide,
    TextField, Select, MenuItem, FormControl, InputLabel, Alert, Snackbar
} from '@mui/material';
import classNames from 'classnames/bind';
import styles from './AddHousehold.module.scss';
import ConfirmBox from '../ConfirmBox';
import useAuth from '~/hooks/useAuth';
import LinearProgress from '@mui/material/LinearProgress';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import specialAccount from '~/services/api/specialAccount';
const cx = classNames.bind(styles);
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function AddSpecialAcccount({ mutation, completeChange, open, onClose }) {
    const { auth } = useAuth();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const fullnameRef = useRef();
    const scopeRef = useRef();
    const roleRef = useRef();
    const noteRef = useRef();

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [fullnameError, setFullnameError] = useState('');
    const [scopeError, setScopeError] = useState('');

    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState(false);

    const handleErrorClose = () => {
        setErrorMessage(false);
    };

    //handle when clode this dislog
    const [isClose, setIsClose] = useState(false);
    const handleCloseConfirmBox = () => {
        setIsClose(false);
    };
    //handle close this dialog
    const handleClose = () => {
        onClose(false);
        setIsClose(false);
    };
    const handlStartClose = () => {
        if (
            usernameRef.current.value !== '' ||
            passwordRef.current.value !== '' ||
            fullnameRef.current.value !== '' ||
            scopeRef.current.value !== '' ||
            noteRef.current.value !== '' ||
            roleRef.current.value !== '3'
        ) {
            setIsClose(true);
        }
        else {
            onClose(false);
        }
    };
    // handle submit form
    const handleSubmit = async () => {
        const usernameTest = validation.checkUsername(usernameRef.current.value);
        const passwordTest = validation.checkPassword(passwordRef.current.value);
        const fullnameTest = validation.checkName(fullnameRef.current.value);
        const scopeTest = validation.checkScope(scopeRef.current.value);
        if (
            usernameTest.isValid !== true ||
            passwordTest.isValid !== true ||
            fullnameTest.isValid !== true ||
            scopeTest.isValid !== true
        ) {
            setUsernameError(usernameTest.message);
            setPasswordError(passwordTest.message);
            setFullnameError(fullnameTest.message);
            setScopeError(scopeTest.message);
        }
        else {
            setFullnameError('');
            setUsernameError('');
            setPasswordError('');
            setScopeError('');
            mutation.mutate({
                userName: usernameRef.current.value,
                password: passwordRef.current.value,
                fullName: fullnameRef.current.value,
                scope: +scopeRef.current.value,
                role: +roleRef.current.value,
                note: noteRef.current.value
            }, {
                onMutate: () => {
                    setLoading(true);
                },
                onError: () => {
                    setLoading(false);
                    setErrorMessage(true);
                }
                ,
                onSuccess: () => {
                    setLoading(false);
                    completeChange('Tạo')
                    onClose(false);
                }
            });
        }
    }
    return (
        <div>
            <Snackbar open={errorMessage} autoHideDuration={3000} onClose={handleErrorClose} >
                <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%', fontSize: 15 }}>
                    Tạo tài khoản thất bại
                </Alert>
            </Snackbar>
            <Dialog
                maxWidth='500'
                open={open}
                onClose={handlStartClose}
                TransitionComponent={Transition}
            >
                {loading && <LinearProgress />}
                <div className={cx('header-paper-population')}>
                    <Button variant="contained" color="error" onClick={handlStartClose}>Đóng</Button>
                </div>
                <div className={cx('account-paper')}>
                    <h2 className={cx('title-household')}>Thêm tài khoản đặc biệt</h2>
                    <div className={cx('account-household-detail')}>
                        <TextField
                            inputRef={usernameRef}
                            sx={{ width: '400px' }}
                            label="Tên đăng nhập*"
                            InputLabelProps={{
                                fontSize: 20
                            }}
                            defaultValue=''
                            variant="standard"
                            error={usernameError.length > 0}
                            helperText={usernameError}
                        />
                        <TextField
                            inputRef={passwordRef}
                            sx={{ width: '400px' }}
                            label="Mật khẩu*"
                            variant="standard"
                            defaultValue=''
                            error={passwordError.length > 0}
                            helperText={passwordError}
                        />
                        <TextField
                            inputRef={fullnameRef}
                            sx={{ width: '400px' }}
                            label="Họ và tên*"
                            defaultValue=''
                            variant="standard"
                            error={fullnameError.length > 0}
                            helperText={fullnameError}
                        />
                        <FormControl sx={{ width: 400 }} variant="standard">
                            <InputLabel htmlFor="input_login_account">
                                Quyền hạn
                            </InputLabel>
                            <Select
                                inputRef={roleRef}
                                defaultValue='3'
                                id="input_login_account"
                            >
                                <MenuItem value='3'>
                                    Tổ trưởng
                                </MenuItem>
                                <MenuItem value='2'>
                                    Kế toán
                                </MenuItem>
                                <MenuItem value='1'>
                                    Chủ tịch xã
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            inputRef={scopeRef}
                            sx={{ width: '400px' }}
                            label="Tổ phụ trách*"
                            defaultValue=''
                            variant="standard"
                            error={scopeError.length > 0}
                            helperText={scopeError}
                        />
                        <TextField
                            inputRef={noteRef}
                            sx={{ width: '400px' }}
                            label="Ghi chú"
                            defaultValue=''
                            variant="standard"
                        />
                    </div>
                    <Button onClick={handleSubmit} sx={{ margin: '0 auto' }} variant='contained'>Tạo</Button>
                </div>
            </Dialog>
            <ConfirmBox title="Đóng cửa sổ ?" sx={{ marginLeft: 10 }} open={isClose} onClose={handleCloseConfirmBox} onAgree={handleClose} />

        </div >
    );
}