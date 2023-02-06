import { forwardRef, useState, useRef, useEffect } from 'react';
//validate
import validation from '~/services/validate/index.js';
//material components
import {
    Button, Dialog, Slide, Snackbar, Alert,
    TextField, Backdrop, CircularProgress
} from '@mui/material';
// import ListItemText from '@mui/material/ListItemText';
// import ListItem from '@mui/material/ListItem';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import CloseIcon from '@mui/icons-material/Close';
import classNames from 'classnames/bind';
import styles from './AddHousehold.module.scss';
import ConfirmBox from '../ConfirmBox';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import householdAccountManager from '~/services/api/householdApi';
const cx = classNames.bind(styles);
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function AddHouseholAcccount({ mutation, open, onClose }) {
    //handle save button
    const [success, setSuccess] = useState(false);

    const usernameRef = useRef();
    const passwordRef = useRef();
    const fullnameRef = useRef();
    const scopeRef = useRef();
    const noteRef = useRef();

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [fullnameError, setFullnameError] = useState('');
    const [scopeError, setScopeError] = useState('');

    const [openBackdrop, setOpenBackdrop] = useState(false);

    console.log(mutation)

    //handle when clode this dislog
    const [isClose, setIsClose] = useState(false);
    const handleCloseConfirmBox = () => {
        setIsClose(false);
    };
    const handleSuccess = () => {
        setSuccess(false);
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
            noteRef.current.value !== ''
        ) {
            setIsClose(true);
        }
        else {
            onClose(false);
        }
    };
    // handle submit form
    const handleSubmit = async () => {
        setOpenBackdrop(true);
        const usernameTest = validation.checkUsername(usernameRef.current.value);
        const passwordTest = validation.checkPassword(passwordRef.current.value);
        const fullnameTest = validation.checkName(fullnameRef.current.value);
        const scopeTest = validation.checkScope(scopeRef.current.value);
        console.log(usernameTest, passwordTest, fullnameTest, scopeTest)
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
            setOpenBackdrop(false);
        }
        else {
            setFullnameError('');
            setUsernameError('');
            setPasswordError('');
            setScopeError('');
            await mutation.mutate({
                userName: usernameRef.current.value,
                password: passwordRef.current.value,
                fullName: fullnameRef.current.value,
                scope: scopeRef.current.value,
                note: noteRef.current.value || ''
            });
            setSuccess(true);
            setOpenBackdrop(false);
            onClose(false);
            // usernameRef.current.value = '';
            // passwordRef.current.value = '';
            // fullnameRef.current.value = '';
            // scopeRef.current.value = '';
            // noteRef.current.value = '';
        }
    }
    return (
        <div>
            <Snackbar open={success} autoHideDuration={3000} onClose={handleSuccess} >
                <Alert onClose={handleSuccess} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    Thên tài khoản thành công !
                </Alert>
            </Snackbar>
            <Dialog
                maxWidth='500'
                open={open}
                onClose={handlStartClose}
                TransitionComponent={Transition}
            >
                <div className={cx('header-paper-population')}>
                    <Button variant="contained" color="error" onClick={handlStartClose}>Đóng</Button>
                </div>
                <div className={cx('account-paper')}>
                    <h2 className={cx('title-household')}>Thêm tài khoản hộ dân</h2>
                    <div className={cx('account-household-detail')}>
                        <TextField
                            inputRef={usernameRef}
                            sx={{ width: '400px' }}
                            label="Tên đăng nhập*"
                            InputLabelProps={{
                                fontSize: 20
                            }}
                            variant="standard"
                            error={usernameError.length > 0}
                            helperText={usernameError}
                        />
                        <TextField
                            inputRef={passwordRef}
                            sx={{ width: '400px' }}
                            label="Mật khẩu*"
                            variant="standard"
                            error={passwordError.length > 0}
                            helperText={passwordError}
                        />
                        <TextField
                            inputRef={fullnameRef}
                            sx={{ width: '400px' }}
                            label="Họ và tên*"
                            variant="standard"
                            error={fullnameError.length > 0}
                            helperText={fullnameError}
                        />
                        <TextField
                            inputRef={scopeRef}
                            sx={{ width: '400px' }}
                            label="Tổ phụ trách*"
                            variant="standard"
                            error={scopeError.length > 0}
                            helperText={scopeError}
                        />
                        <TextField
                            inputRef={noteRef}
                            sx={{ width: '400px' }}
                            label="Ghi chú"
                            variant="standard"
                        />
                    </div>
                    <Button onClick={handleSubmit} sx={{ margin: '0 auto' }} variant='contained'>Tạo</Button>
                </div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10 }}
                    open={openBackdrop}
                    onClick={() => { setOpenBackdrop(false) }}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Dialog>
            <ConfirmBox sx={{ marginLeft: 10 }} open={isClose} onClose={handleCloseConfirmBox} onAgree={handleClose} />

        </div >
    );
}