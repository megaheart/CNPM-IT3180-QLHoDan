import { forwardRef, useState, useRef, useEffect, useCallback, Fragment } from 'react';
import useAuth from '~/hooks/useAuth';
//material components
import { Button, Dialog, CircularProgress, Box, Fab, Slide, Snackbar, Alert, TextField } from '@mui/material';
import { green } from '@mui/material/colors';
//icons material
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
//style
import classNames from 'classnames/bind';
import styles from './FullScreenDialog.module.scss';
//components
import Population from '../TableTemplate/Population';
import Household from '../Paper/household';
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '../../Skeleton';
import ConfirmBox from './ConfirmBox';
//api
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import householdManager from '~/services/api/householdManager';

const cx = classNames.bind(styles);
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, onClose, idHousehold }) {
    //handle save button
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const timer = useRef();

    const { auth } = useAuth();

    const { data, isLoading, error } = useQuery(['householdDetail'], () => householdManager.getHousehold(auth.token, idHousehold));
    console.log(data);
    //edit mode
    const [editMode, setEditMode] = useState(false);

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
                setEditMode(false);
            }, 2000);
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
    //handle edit mode
    const handleEdit = useCallback(() => {
        setEditMode(true);
        setSuccess(false);
    }, [])
    //handle close this dialog
    const handleClose = () => {
        setEditMode(false);
        onClose(!open);
        setIsClose(false);
    };

    const handlStartClose = () => {
        if (editMode) {
            setIsClose(true);
        }
        else {
            onClose(!open);
        }
    };
    return (
        <div>
            <Snackbar open={success} autoHideDuration={6000} onClose={handleSuccess} >
                <Alert onClose={handleSuccess} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    Thay đổi thông tin thành công!
                </Alert>
            </Snackbar>
            <Dialog
                fullWidth={true}
                maxWidth='1000'
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                {loading && <LinearProgress />}
                {isLoading ? <Skeleton /> :
                    <Fragment>
                        <div className={cx('header-paper-population')}>
                            <div className={cx('change-and-save')}>
                                <Button variant="contained" disabled={editMode} color="primary" sx={{ fontSize: '1rem' }} onClick={handleEdit}>Chỉnh sửa</Button>
                                <Button variant="outlined" disabled={!editMode} color='success'
                                    sx={{ fontSize: '1rem' }} onClick={handleSave}>Lưu</Button>
                            </div>

                            <Button variant="contained" color="error" sx={{ fontSize: '1rem' }} onClick={handlStartClose}>Đóng</Button>
                        </div>
                        <div className={cx('household-paper')}>
                            <h2 className={cx('title-household')}>Thông tin sổ hộ khẩu</h2>
                            <div className={cx('household-detail')}>
                                <TextField
                                    disabled={true}
                                    sx={{ width: 200 }}
                                    inputProps={{ style: { fontSize: 15 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    label="Số hộ khẩu"
                                    defaultValue={idHousehold}
                                    variant="standard"
                                />
                                <TextField
                                    disabled={true}
                                    sx={{ width: 200 }}
                                    inputProps={{ style: { fontSize: 15 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    label="Ngày tạo"
                                    defaultValue={data.createdTime}
                                    variant="standard"
                                />
                                <TextField
                                    disabled={!editMode}
                                    sx={{ width: 400 }}
                                    inputProps={{ style: { fontSize: 15 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    label="Nơi thường trú"
                                    defaultValue={data.address}
                                    variant="standard"
                                />
                                <TextField
                                    disabled={!editMode}
                                    sx={{ width: 200 }}
                                    inputProps={{ style: { fontSize: 15 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    label="Ngày chuyển "
                                    defaultValue={data.moveOutDate || 'Không có'}
                                    variant="standard"
                                />
                                <TextField
                                    disabled={!editMode}
                                    sx={{ width: 200 }}
                                    inputProps={{ style: { fontSize: 15 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    label="Nơi chuyển "
                                    defaultValue={data.moveOutPlace || 'Không có'}
                                    variant="standard"
                                />
                                <TextField
                                    disabled={!editMode}
                                    sx={{ width: 200 }}
                                    inputProps={{ style: { fontSize: 15 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    label="Lý do chuyển "
                                    defaultValue={data.moveOutReason || 'Không có'}
                                    variant="standard"
                                />
                                <TextField
                                    disabled={!editMode}
                                    sx={{ width: 200 }}
                                    inputProps={{ style: { fontSize: 15 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    label="Tổ phụ trách"
                                    defaultValue={data.scope}
                                    variant="standard"
                                />
                            </div>
                        </div>
                        <Population editMode={editMode} />
                    </Fragment>
                }
            </Dialog>
            <ConfirmBox open={isClose} onClose={handleCloseConfirmBox} onAgree={handleClose} />
        </div >
    );
}