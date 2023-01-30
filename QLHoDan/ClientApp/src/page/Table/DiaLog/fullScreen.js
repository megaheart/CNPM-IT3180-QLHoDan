import * as React from 'react';
import { forwardRef, useState, useRef, useEffect, useCallback } from 'react';

//material components
import { Button, Dialog, CircularProgress, Box, Fab, Slide, Snackbar, Alert, TextField, Collapse } from '@mui/material';
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
import classNames from 'classnames/bind';
import styles from './FullScreenDialog.module.scss';
//components
import Population from '../TableTemplate/Population';
import Household from '../Paper/household';
import ConfirmBox from './ConfirmBox';

const cx = classNames.bind(styles);
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, onClose }) {
    //handle save button
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const timer = useRef();
    //edit mode
    const [editMode, setEditMode] = useState(false);

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
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <div className={cx('header-paper-population')}>
                    <Button variant="contained" disabled={editMode} color="primary" sx={{ fontSize: '1.5rem', margin: '2 0', textAlign: 'right', width: 150 }} onClick={handleEdit}>Chỉnh sửa</Button>
                    <Button variant="contained" color="error" sx={{ fontSize: '1.5rem', margin: '2 0', textAlign: 'right', width: 50 }} onClick={handlStartClose}>Đóng</Button>
                </div>
                <Household editMode={editMode} />
                <Population editMode={editMode} />
                <div>
                    <Box sx={{ m: 1, position: 'relative' }}>
                        <Fab
                            aria-label="save"
                            color="primary"
                            sx={buttonSx}
                            onClick={handleSave}
                            disabled={!editMode}
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