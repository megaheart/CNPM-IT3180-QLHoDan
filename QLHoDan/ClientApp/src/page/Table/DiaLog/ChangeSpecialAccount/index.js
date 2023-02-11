import { forwardRef, useState, useRef, useEffect } from 'react';
//validate
import validation from '~/services/validate/index.js';
//material components
import {
    Button, Dialog, Slide,
    TextField, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import classNames from 'classnames/bind';
import styles from './AddHousehold.module.scss';
import ConfirmBox from '../ConfirmBox';

import useAuth from '~/hooks/useAuth';
import LinearProgress from '@mui/material/LinearProgress';

const cx = classNames.bind(styles);
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function ChangeSpecialAccount({ mutation, completeChange, open, onClose, info }) {
    const { auth } = useAuth();

    const { userName, fullName, scope, note, role } = info;

    const usernameRef = useRef();
    const fullnameRef = useRef();
    const scopeRef = useRef();
    const noteRef = useRef();
    // const roleRef = useRef();

    const [usernameError, setUsernameError] = useState('');
    const [fullnameError, setFullnameError] = useState('');
    const [scopeError, setScopeError] = useState('');

    const [loading, setLoading] = useState(false);

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
            // || roleRef.current.value !== role
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
            mutation.mutate({
                userName: usernameRef.current.value,
                fullName: fullnameRef.current.value,
                scope: scopeRef.current.value,
                note: noteRef.current.value || ''
            },
                {
                    onMutate: () => {
                        setLoading(true);
                    },
                    onError: () => {
                        setLoading(false)
                    }
                    ,
                    onSuccess: async () => {
                        completeChange('Thay đổi thông tin');
                        setLoading(false);
                        onClose(false);
                    }
                }
            );
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
                {loading && <LinearProgress />}
                <div className={cx('header-paper-population')}>
                    <Button variant="contained" color="error" onClick={handlStartClose}>Đóng</Button>
                </div>
                <div className={cx('account-paper')}>
                    <h2 className={cx('title-household')}>Sửa thông tin tài khoản đặc biệt</h2>
                    <div className={cx('account-household-detail')}>
                        <TextField
                            inputRef={usernameRef}
                            sx={{ width: '400px' }}
                            label="Tên đăng nhập*"
                            InputLabelProps={{
                                fontSize: 20
                            }}
                            disabled
                            defaultValue={userName}
                            variant="standard"
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
                        {/* <FormControl sx={{ m: 1, width: 270 }} variant="standard">
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
                        </FormControl> */}
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