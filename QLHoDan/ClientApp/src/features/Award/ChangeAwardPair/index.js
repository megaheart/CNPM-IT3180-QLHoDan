import { forwardRef, useState, useRef, useEffect } from 'react';
//material components
import {
    Button, Dialog, Slide,
    TextField
} from '@mui/material';
import classNames from 'classnames/bind';
import styles from './AddHousehold.module.scss';
import ConfirmBox from '~/components/component/Dialog/ConfirmBox';

const cx = classNames.bind(styles);
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function ChangeAwardPair({ open, onClose, info, add, change }) {


    const { achievementType, achievementName, rewardName, rewardValue } = info ? info : {
        achievementType: '',
        achievementName: '',
        rewardName: '',
        rewardValue: 0
    };

    const achievementTypeRef = useRef();
    const achievementNameRef = useRef();
    const rewardNameRef = useRef();
    const rewardValueRef = useRef();
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
            achievementNameRef.current.value !== achievementName ||
            rewardNameRef.current.value !== rewardName ||
            +rewardValueRef.current.value !== rewardValue
        ) {
            setIsClose(true);
        }
        else {
            onClose();
        }
    };
    // handle submit form
    const handleSubmit = async () => {
        const achievementName = achievementNameRef.current.value;
        const rewardName = rewardNameRef.current.value;
        const rewardValue = +rewardValueRef.current.value;
        if (achievementName === '' || rewardName === '' || rewardValue === '') {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }
        if (isNaN(rewardValue)) {
            alert('Giá trị phần quà phải là số');
            return;
        }
        const data = {
            achievementType,
            achievementName,
            rewardName,
            rewardValue,
        }
        if (info) {
            change(data);
        }
        else {
            add({
                achievementName,
                rewardName,
                rewardValue,
            }
            );
        }
        onClose();
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
                    <h2 className={cx('title-household')}>{info ? 'Thêm loại phần thưởng mới' : 'Sửa thông tin phần quà'}</h2>
                    <div className={cx('account-household-detail')}>
                        {info && <TextField
                            disabled
                            inputRef={achievementTypeRef}
                            sx={{ width: '400px' }}
                            label="Loại thành tích*"
                            InputLabelProps={{
                                fontSize: 20
                            }}
                            defaultValue={achievementType}
                            variant="standard"
                        />
                        }
                        <TextField
                            inputRef={achievementNameRef}
                            sx={{ width: '400px' }}
                            label="Miêu tả loại thành tích"
                            variant="standard"
                            defaultValue={achievementName}
                        />
                        <TextField
                            inputRef={rewardNameRef}
                            sx={{ width: '400px' }}
                            label="Miêu tả Phần thưởng "
                            variant="standard"
                            defaultValue={rewardName}
                        />
                        <TextField
                            inputRef={rewardValueRef}
                            sx={{ width: '400px' }}
                            label="Giá trị phần thưởng (VNĐ)"
                            defaultValue={rewardValue}
                            variant="standard"
                        />
                    </div>
                    <Button onClick={handleSubmit} sx={{ margin: '0 auto' }} variant='contained'>{!info ? 'Thêm' : 'Thay đổi'}</Button>
                </div>
            </Dialog>
            <ConfirmBox title='Đóng cửa sổ ?' open={isClose} onClose={handleCloseConfirmBox} onAgree={handleClose} />

        </div >
    );
}