import Login from './Login';
import Register from './Register';

import { Tab, Box } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import classNames from 'classnames/bind';
import styles from './Authentication.module.scss';

import { useState } from 'react';

const cx = classNames.bind(styles);

function Authentication() {
    const [value, setValue] = useState('1');


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={cx('container-authen')}>
            <Box sx={{ width: '100%', typography: 'body1', marginTop: 1 }} autoComplete="off">
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                            <Tab sx={{ fontSize: 15 }} label="Đăng nhập" value="1" />
                            <Tab sx={{ fontSize: 15 }} label="Đăng ký" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Login act={setValue} />
                    </TabPanel>
                    <TabPanel value="2"><Register act={setValue} /></TabPanel>
                </TabContext>
                <div className={cx('footer-login')}>
                    <span className={cx('btn-text')}>Chính sách</span>
                    <span className={cx('btn-text')} >Bảo mật</span>
                    <span className={cx('btn-text')}>Quyền</span>
                    <span className={cx('btn-text')}>Liên lạc</span>
                </div>
            </Box>

        </div>
    )
}

export default Authentication;