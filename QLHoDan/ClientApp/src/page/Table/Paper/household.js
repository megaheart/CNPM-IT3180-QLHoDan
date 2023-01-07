import { TextField } from '@mui/material';
import { memo } from 'react';
import styles from './household.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Household({ editMode }) {
    return (
        <div className={cx('household-paper')}>
            <h2 className={cx('title-household')}>Thông tin sổ hộ khẩu</h2>
            <div className={cx('household-detail')}>
                <TextField
                    disabled={!editMode}
                    sx={{ width: '400px' }}
                    inputProps={{ style: { fontSize: 15 } }}
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    required
                    label="Số hộ khẩu"
                    defaultValue="123"
                    variant="standard"
                />
                <TextField
                    disabled={!editMode}
                    sx={{ width: '400px' }}
                    inputProps={{ style: { fontSize: 15 } }}
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    required
                    label="Nơi thường trú"
                    defaultValue="123"
                    variant="standard"
                />
                <TextField
                    disabled={!editMode}
                    sx={{ width: '400px' }}
                    inputProps={{ style: { fontSize: 15 } }}
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    required
                    label="Danh sách các thành viên"
                    defaultValue="123"
                    variant="standard"
                />
                <TextField
                    disabled={!editMode}
                    sx={{ width: '400px' }}
                    inputProps={{ style: { fontSize: 15 } }}
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    required
                    label="Chủ hộ"
                    defaultValue="123"
                    variant="standard"
                />
                <TextField
                    disabled={!editMode}
                    sx={{ width: '400px' }}
                    inputProps={{ style: { fontSize: 15 } }}
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    required
                    label="Tổ phụ trách"
                    defaultValue="123"
                    variant="standard"
                />
            </div>
        </div>
    );
}

export default memo(Household);