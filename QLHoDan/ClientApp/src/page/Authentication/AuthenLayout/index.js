import { Tab, Box } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AuthenticationLayout from '~/components/Layout/AuthenticationLayout'
import classNames from 'classnames/bind';
import styles from './Authentication.module.scss';

import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Authentication({ children }) {
    const [value, setValue] = useState('1');
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (location.pathname === '/login') {
            setValue('1');
        }
        else if (location.pathname === '/register') {
            setValue('2');
        }
    });
    const handleChange = () => {
        if (value === '1') {
            navigate('/register');
        }
        else if (value === '2') {
            navigate('/login');
        }
    };
    return (
        <AuthenticationLayout>
            <div className={cx('container-authen')}>
                <Box sx={{ width: '100%', typography: 'body1', marginTop: 1 }} autoComplete="off">
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                                <Tab sx={{ fontSize: 15 }} label="Đăng nhập" value="1" />
                                <Tab sx={{ fontSize: 15 }} label="Đăng ký" value="2" />
                            </TabList>
                        </Box>
                        {/* <TabPanel value="1">
                        <Login act={setValue} />
                    </TabPanel>
                    <TabPanel value="2"><Register act={setValue} /></TabPanel> */}
                    </TabContext>
                    {children}

                </Box>
            </div>
        </AuthenticationLayout>
    )
}

export default Authentication;