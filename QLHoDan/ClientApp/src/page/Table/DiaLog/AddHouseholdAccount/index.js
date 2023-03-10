import { forwardRef, useState, useRef } from 'react';
//validate
import validation from '~/services/validate/index.js';
//material components
import {
    Button, Dialog, Slide,
    TextField
} from '@mui/material';
import classNames from 'classnames/bind';
import styles from './AddHousehold.module.scss';
import ConfirmBox from '../ConfirmBox';

const cx = classNames.bind(styles);
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function AddHouseholAcccount({ mutation, open, onClose }) {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const fullnameRef = useRef();
    const scopeRef = useRef();
    const noteRef = useRef();

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
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
            await mutation.mutate({
                userName: usernameRef.current.value,
                password: passwordRef.current.value,
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
                    <Button variant="contained" color="error" onClick={handlStartClose}>????ng</Button>
                </div>
                <div className={cx('account-paper')}>
                    <h2 className={cx('title-household')}>Th??m t??i kho???n h??? d??n</h2>
                    <div className={cx('account-household-detail')}>
                        <TextField
                            inputRef={usernameRef}
                            sx={{ width: '400px' }}
                            label="T??n ????ng nh???p*"
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
                            label="M???t kh???u*"
                            variant="standard"
                            error={passwordError.length > 0}
                            helperText={passwordError}
                        />
                        <TextField
                            inputRef={fullnameRef}
                            sx={{ width: '400px' }}
                            label="H??? v?? t??n*"
                            variant="standard"
                            error={fullnameError.length > 0}
                            helperText={fullnameError}
                        />
                        <TextField
                            inputRef={scopeRef}
                            sx={{ width: '400px' }}
                            label="T??? ph??? tr??ch*"
                            variant="standard"
                            error={scopeError.length > 0}
                            helperText={scopeError}
                        />
                        <TextField
                            inputRef={noteRef}
                            sx={{ width: '400px' }}
                            label="Ghi ch??"
                            variant="standard"
                        />
                    </div>
                    <Button onClick={handleSubmit} sx={{ margin: '0 auto' }} variant='contained'>T???o</Button>
                </div>
            </Dialog>
            <ConfirmBox sx={{ marginLeft: 10 }} open={isClose} onClose={handleCloseConfirmBox} onAgree={handleClose} />

        </div >
    );
}