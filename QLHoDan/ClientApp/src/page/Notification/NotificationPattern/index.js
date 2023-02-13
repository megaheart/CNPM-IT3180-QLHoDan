import {
    Button, Dialog, DialogActions, Avatar,
    DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import styles from './Noti.module.scss';
import classNames from 'classnames/bind';

import { useState } from 'react';

const cx = classNames.bind(styles);

function getLastName(string) {
    if (typeof string === 'string') {
        const arr = string.split(' ');
        return arr[arr.length - 1];
    }
    return '';
};

// function timeSince(date) {
//     var seconds = Math.floor((new Date() - date) / 1000);
//     var interval = Math.floor(seconds / 31536000);

//     if (interval >= 1) {
//         return interval + " năm trước";
//     }
//     interval = Math.floor(seconds / 2592000);
//     if (interval >= 1) {
//         return interval + " tháng trước";
//     }
//     interval = Math.floor(seconds / 86400);
//     if (interval >= 1) {
//         return interval + " ngày trước";
//     }
//     interval = Math.floor(seconds / 3600);
//     if (interval >= 1) {
//         return interval + " giờ trước";
//     }
//     interval = Math.floor(seconds / 60);
//     if (interval >= 1) {
//         return interval + " phút trước";
//     }
//     return Math.floor(seconds) + " giây trước";
// }

function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " năm trước";
    }
    seconds = seconds - interval * 31536000;
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " tháng trước";
    }
    seconds = seconds - interval * 2592000;
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " ngày trước";
    }
    seconds = seconds - interval * 86400;
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " giờ trước";
    }
    seconds = seconds - interval * 3600;
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " phút trước";
    }
    seconds = seconds - interval * 60;
    return Math.floor(seconds) + " giây trước";
}


function Notification({ markRead, content, sender, senderName, time, iden }) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log(iden)

    const markThisNoti = () => {
        markRead([iden]);
    }

    const timeAgo = timeSince(new Date(time));

    return (
        <div className={cx('noti-container')} onMouseDown={handleClickOpen} >
            <div className={cx('noti')}>
                <Avatar sx={{ fontSize: 5, cursor: 'pointer', border: '2px solid transparent', }}>
                    <span>{getLastName(senderName)}</span>
                </Avatar>
                <div className={cx('noti-content')}>
                    <p>Thông báo đến từ <b>{' ' + senderName + ' '}</b></p>
                    <p>{timeAgo}</p>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle sx={{ fontSize: 25, width: '100%' }} >
                    <strong>Chi tiết thông báo</strong>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontSize: 15 }} >
                        <strong>Người gửi:</strong> {senderName}
                    </DialogContentText>
                    <DialogContentText sx={{ fontSize: 15 }} >
                        <strong>Tài khoản gửi:</strong> {sender}
                    </DialogContentText>
                    <DialogContentText sx={{ fontSize: 15 }} >
                        <strong>Thời gian gửi:</strong> {new Date(time).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
                    </DialogContentText>
                    <DialogContentText sx={{ fontSize: 15 }} >
                        <strong>Nội dung:</strong> {' ' + content}
                    </DialogContentText>
                </DialogContent>
                {markRead && <DialogActions>
                    <Button sx={{ fontSize: 15 }} onClick={markThisNoti}>Đánh dấu thông báo đã đọc !</Button>
                </DialogActions>}
            </Dialog>
        </div>
    );

}

export default Notification;