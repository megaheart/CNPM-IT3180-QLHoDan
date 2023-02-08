import { forwardRef, useState, useRef, useEffect } from 'react';
//validate
import validation from '~/services/validate/index.js';
//material components
import {
    Button, Dialog, Slide,
    TextField
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
export default function ChangeHouseholdAccount({ mutation, open, onClose, info }) {


    const { userName, fullName, scope, note } = info;

    const usernameRef = useRef();
    const fullnameRef = useRef();
    const scopeRef = useRef();
    const noteRef = useRef();

    const [usernameError, setUsernameError] = useState('');
    const [fullnameError, setFullnameError] = useState('');
    const [scopeError, setScopeError] = useState('');

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
            usernameRef.current.value !== userName ||
            fullnameRef.current.value !== fullName ||
            scopeRef.current.value != scope ||
            noteRef.current.value !== note
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
        const fullnameTest = validation.checkName(fullnameRef.current.value);
        const scopeTest = validation.checkScope(scopeRef.current.value);
        if (
            usernameTest.isValid !== true ||
            fullnameTest.isValid !== true ||
            scopeTest.isValid !== true
        ) {
            setUsernameError(usernameTest.message);
            setFullnameError(fullnameTest.message);
            setScopeError(scopeTest.message);

        }
        else {
            setFullnameError('');
            setUsernameError('');
            setScopeError('');
            await mutation.mutate({
                userName: usernameRef.current.value,
                fullName: fullnameRef.current.value,
                scope: scopeRef.current.value,
                note: noteRef.current.value || ''
            });

            onClose(false);
        }
    }
    return (
        <div>
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
                    <h2 className={cx('title-household')}>Sửa thông tin tài khoản hộ dân</h2>
                    <div className={cx('account-household-detail')}>
                        <TextField
                            inputRef={usernameRef}
                            sx={{ width: '400px' }}
                            label="Tên đăng nhập*"
                            InputLabelProps={{
                                fontSize: 20
                            }}
                            defaultValue={userName}
                            variant="standard"
                            error={usernameError.length > 0}
                            helperText={usernameError}
                        />
                        <TextField
                            inputRef={fullnameRef}
                            sx={{ width: '400px' }}
                            label="Họ và tên*"
                            variant="standard"
                            defaultValue={fullName}
                            error={fullnameError.length > 0}
                            helperText={fullnameError}
                        />
                        <TextField
                            inputRef={scopeRef}
                            sx={{ width: '400px' }}
                            label="Tổ phụ trách*"
                            variant="standard"
                            defaultValue={scope}
                            error={scopeError.length > 0}
                            helperText={scopeError}
                        />
                        <TextField
                            inputRef={noteRef}
                            sx={{ width: '400px' }}
                            label="Ghi chú"
                            defaultValue={note || ''}
                            variant="standard"
                        />
                    </div>
                    <Button onClick={handleSubmit} sx={{ margin: '0 auto' }} variant='contained'>Thay đổi</Button>
                </div>

            </Dialog>
            <ConfirmBox sx={{ marginLeft: 10 }} open={isClose} onClose={handleCloseConfirmBox} onAgree={handleClose} />

        </div >
    );
}