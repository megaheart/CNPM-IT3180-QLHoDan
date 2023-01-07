import { useState } from 'react';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';

import styles from './Account.module.scss'
import classNames from 'classnames/bind';

import AccountSetting from './AccountSetting';
import Header from './Header';
import User from './ProfileUser';

const cx = classNames.bind(styles);

export default function Profile() {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={cx('account-wrapper')}>
            <Header />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '70%' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" >
                            <Tab sx={{ fontSize: 15 }} label="Thông tin người dùng" value="1" />
                            <Tab sx={{ fontSize: 15 }} label="Đổi mật khẩu" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel sx={{ width: '100%' }} value="1">
                        <AccountSetting />
                    </TabPanel>
                    <TabPanel sx={{ width: '100%' }} value="2">
                        <User />
                    </TabPanel>
                </TabContext>
            </div>

        </div>
    )
}