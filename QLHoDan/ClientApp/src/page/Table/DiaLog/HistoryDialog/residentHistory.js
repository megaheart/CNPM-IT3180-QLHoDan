import * as React from 'react';
import { forwardRef } from 'react';

//material components
import { Button, Dialog, Slide, TextField } from '@mui/material';

//style
import classNames from 'classnames/bind';
import styles from './HistoryDialog.module.scss';
//components


const cx = classNames.bind(styles);
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ResidentChangeDialog({ open, onClose, selectedValue }) {
    //handle close this dialog
    const handleClose = () => {
        onClose(!open);
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <div className={cx('header-paper-change')}>
                <Button variant="contained" color="error" sx={{ fontSize: '1.5rem', margin: '2 0', textAlign: 'right', width: 50 }} onClick={handleClose}>Đóng</Button>
            </div>
            <div className={cx('body-paper-change')}>
                <div>
                    <label className={cx('label-field')}>Ngày, giờ xảy ra</label>
                    <p className={cx('content-field')}>20/3/2022 15:30 </p>
                </div>
                <div>
                    <label className={cx('label-field')}>Dạng thay đổi</label>
                    <p className={cx('content-field')}>Chuyển đi </p>
                </div>
                <div>
                    <label className={cx('label-field')}>CMND/CCCD của đối tượng thay đổi</label>
                    <p className={cx('content-field')}>20205415455</p>
                </div>
                <div>
                    <label className={cx('label-field')}>Nội dung thay đổi</label>
                    <p className={cx('content-field')}>Chuyển từ hộ khẩu 20205415455 sang hộ khẩu 3434346415555 </p>
                </div>
            </div>
        </Dialog >
    );
}