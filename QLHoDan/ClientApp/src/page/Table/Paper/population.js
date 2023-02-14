import { TextField } from '@mui/material';
import { memo } from 'react';
import styles from './population.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function PopulationField() {
    return (
        <div className={cx('population-paper')}>
            <h2 className={cx('title-population')}>Thông tin nhân khẩu</h2>
            <div className={cx('population-detail')}>
                <TextField
                    sx={{ width: '400px' }}
                    inputProps={{ style: { fontSize: 15 } }}
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    required
                    label="Số hộ khẩu"
                    defaultValue="7134223"
                    variant="standard"
                />
                <TextField
                    sx={{ width: '400px' }}
                    inputProps={{ style: { fontSize: 15 } }}
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    required
                    label="Nơi thường trú"
                    defaultValue="Hà Nội"
                    variant="standard"
                />
                <TextField
                    sx={{ width: '400px' }}
                    inputProps={{ style: { fontSize: 15 } }}
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    required
                    label="Danh sách các thành viên"
                    defaultValue="123"
                    variant="standard"
                />
                <TextField
                    sx={{ width: '400px' }}
                    inputProps={{ style: { fontSize: 15 } }}
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    required
                    label="Chủ hộ"
                    defaultValue="123"
                    variant="standard"
                />
                <TextField
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

export default memo(PopulationField);
