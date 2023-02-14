import { useState } from 'react';
// import useAuth from '~/hooks/useAuth';
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

// import householdAccountManager from '~/services/api';
// import {
//     useQuery,
//     useMutation,
//     useQueryClient
// } from '@tanstack/react-query';

const cx = classNames.bind(styles);

export default function Profile() {
    const [value, setValue] = useState('2');
    // const { auth } = useAuth();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // const { isLoading, isError, data, error } = useQuery({ queryKey: ['profile'], queryFn: async () => householdAccountManager.getAllAccounts(auth.token) });


    return (
        <div className={cx('account-wrapper')}>
            <Header />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '70%' }}>
                <TabContext centered value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', margin: '0 auto' }}>
                        <TabList centered onChange={handleChange} aria-label="lab API tabs example" >
                            <Tab sx={{ fontSize: 15 }} label="Đổi mật khẩu" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel sx={{ width: '100%' }} value="2">
                        <User />
                    </TabPanel>
                </TabContext>
            </div>

        </div>
    )
}