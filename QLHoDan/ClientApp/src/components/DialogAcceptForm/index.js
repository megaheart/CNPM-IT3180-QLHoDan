import { memo, useState, useEffect } from 'react';
import { Button } from '@mui/material';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import MultilineTextfield from '~/components/component/MultilineInput';

function AcceptForm({ open, action, actionCancel }) {

    const [notAcceptReason, setNotAcceptReason] = useState('');

    const [warningMessage, setWarningMessage] = useState('');

    useEffect(
        () => {
            setWarningMessage('');
        }, [notAcceptReason]
    )

    const handleAccept = () => {
        action({
            accept: true,
            notAcceptReason: null,
            achievementType: 1
        });
    }

    const handleNotAccept = () => {
        console.log(notAcceptReason)
        if (notAcceptReason === '') {
            setWarningMessage('Vui lòng nhập lý do từ chối');
        }
        else {
            action({
                accept: false,
                notAcceptReason: notAcceptReason,
                achievementType: null
            });
        }

    }

    return (
        <div>
            <Dialog open={open} onClose={actionCancel}>
                <DialogTitle>Bạn có muốn phê duyệt đơn này ?</DialogTitle>
                <DialogContent sx={{ margin: '0 auto' }}>
                    <DialogContentText sx={{ fontSize: 25 }}>
                        Tin nhắn gửi đến tài khoản (nếu từ chối)
                    </DialogContentText>
                    <MultilineTextfield
                        autoFocus
                        value={notAcceptReason}
                        onChange={setNotAcceptReason}
                    />
                </DialogContent>
                <h4>{warningMessage}</h4>
                <DialogActions>
                    <Button sx={{ fontSize: 20 }} onClick={actionCancel}>Duyệt sau</Button>
                    <Button sx={{ fontSize: 20 }} onClick={handleNotAccept}>Từ chối đơn</Button>
                    <Button sx={{ fontSize: 20 }} onClick={handleAccept}>Duyệt đơn</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default memo(AcceptForm);