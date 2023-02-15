import { memo, useState, useEffect } from 'react';
import { Button } from '@mui/material';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import MultilineTextfield from '~/components/component/MultilineInput';

function AcceptCeremory({ open, actionAgree, actionCancel }) {

    const [messageToSpecialAccountValue, setMessageToSpecialAccountValue] = useState('');
    const [messageToHouseholdAccountValue, setMessageToHouseholdAccountValue] = useState('');

    const [warningMessage, setWarningMessage] = useState('');

    useEffect(
        () => {
            setWarningMessage('');
        }, [messageToSpecialAccountValue, messageToHouseholdAccountValue]
    )

    const handleAccept = () => {
        if (messageToSpecialAccountValue === '' || messageToHouseholdAccountValue === '') {
            setWarningMessage('Vui lòng nhập đầy đủ tin nhắn');
        }
        else {
            actionAgree({
                MessageToSpecialAccount: messageToSpecialAccountValue,
                MessageToHousehold: messageToHouseholdAccountValue
            });
        }

    }

    return (
        <div>
            <Dialog open={open} onClose={actionCancel}>
                <DialogTitle>Bạn có muốn phê duyệt đợt thưởng này ?</DialogTitle>
                <DialogContent sx={{ margin: '0 auto' }}>
                    <DialogContentText sx={{ fontSize: 25 }}>
                        Tin nhắn gửi đến các tài khoản ( nếu phê duyệt)
                    </DialogContentText>
                    <label style={{ margin: 2 }}>
                        Tin nhắn gửi đến tài khoản cán bộ, kế toán
                    </label>
                    <MultilineTextfield
                        autoFocus
                        value={messageToSpecialAccountValue}
                        onChange={setMessageToSpecialAccountValue}
                    />
                    <label style={{ margin: 2 }}>
                        Tin nhắn gửi đến tài khoản hộ dân
                    </label>
                    <MultilineTextfield
                        autoFocus
                        value={messageToHouseholdAccountValue}
                        onChange={setMessageToHouseholdAccountValue}
                    />
                </DialogContent>
                <h4>{warningMessage}</h4>
                <DialogActions>
                    <Button sx={{ fontSize: 20 }} onClick={actionCancel}>Suy nghĩ lại</Button>
                    <Button sx={{ fontSize: 20 }} onClick={handleAccept}>Đồng ý</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default memo(AcceptCeremory);