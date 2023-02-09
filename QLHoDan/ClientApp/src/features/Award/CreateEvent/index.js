import Button from '@mui/material/Button';
import classNames from 'classnames/bind';
import styles from './CreateEvent.module.scss';
import { useState } from 'react';
import { TextField, FormControl, InputLabel, MenuItem, Select, InputAdornment, Input } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import ListAchievementAward from '../SetupAchivementAward';
import ListSpecialAward from '../SetupSpecialAward/';

const cx = classNames.bind(styles);

function CreateEvent() {
    const [value, setValue] = useState(null);
    const [value1, setValue1] = useState(null);
    const [typeOfEvent, setTypeOfEvent] = useState('special');
    return (
        <div className={cx('award-form')}>
            <section className={cx('award-1')}>
                <TextField sx={{ m: 1, width: 270 }} label="Tên đợt thưởng *" inputProps={{
                    style: { fontSize: 20 }
                }}
                    InputLabelProps={{
                        style: { fontSize: 20 }
                    }}
                    variant="standard" />

                <FormControl sx={{ m: 1, width: 270 }} variant="standard">
                    <InputLabel sx={{ fontSize: 22 }} >
                        Loại thưởng
                    </InputLabel>
                    <Select
                        defaultValue='special'
                        sx={{ fontSize: 20 }}
                        onChange={(e) => { setTypeOfEvent(e.target.value) }}
                    >
                        <MenuItem sx={{ fontSize: 20 }} value='special'>
                            Dịp đặc biệt
                        </MenuItem>
                        <MenuItem sx={{ fontSize: 20 }} value='achivement'>
                            Thành tích học tập
                        </MenuItem>
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={({ inputRef, inputProps, InputProps }) =>
                            <FormControl sx={{ m: 1, width: 400 }} variant="standard">
                                <InputLabel sx={{ fontSize: 20 }} htmlFor="input_login_account">
                                    Thời gian kết thúc xác nhận minh chứng
                                </InputLabel>
                                <Input
                                    inputRef={inputRef}
                                    sx={{ fontSize: 20 }}
                                    id="input_login_account"
                                    endAdornment={
                                        <InputAdornment position="start">
                                            {InputProps?.endAdornment}
                                        </InputAdornment>
                                    }
                                    {...inputProps}
                                />
                            </FormControl>
                        }
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={value1}
                        onChange={(newValue) => {
                            setValue1(newValue);
                        }}
                        renderInput={({ inputRef, inputProps, InputProps }) =>
                            <FormControl sx={{ m: 1, width: 400 }} variant="standard">
                                <InputLabel sx={{ fontSize: 20 }} htmlFor="input_login_account">
                                    Thời gian trao thưởng
                                </InputLabel>
                                <Input
                                    inputRef={inputRef}
                                    sx={{ fontSize: 20 }}
                                    id="input_login_account"
                                    endAdornment={
                                        <InputAdornment position="start">
                                            {InputProps?.endAdornment}
                                        </InputAdornment>
                                    }
                                    {...inputProps}
                                />
                            </FormControl>
                        }
                    />
                </LocalizationProvider>
                <TextField sx={{ m: 1, width: 500, padding: '0 5px' }} label="Nội dung thông báo đến người dân" inputProps={{
                    style: { fontSize: 20 }
                }}
                    InputLabelProps={{
                        style: { fontSize: 20 }
                    }}
                    variant="standard"
                    multiline
                    rows={2}
                />
                <TextField sx={{ m: 1, width: 500, padding: '0 5px' }} label="Nội dung thông báo đến các tài khoản cấp  đặc biệt" inputProps={{
                    style: { fontSize: 20 }
                }}
                    InputLabelProps={{
                        style: { fontSize: 20 }
                    }}
                    variant="standard"
                    multiline
                    rows={2}
                />
            </section>
            <section className={cx('award-2')}>
                {typeOfEvent === 'special' ?
                    <ListSpecialAward /> :
                    <ListAchievementAward />}
            </section>
        </div>
    );
}

export default CreateEvent;