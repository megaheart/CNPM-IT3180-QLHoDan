import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthContext } from '~/components/AuthenProvider';
import { useContext } from 'react';
import logo from './logo.svg';

import styles from './StatePage.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Start() {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [state, setstate] = useState(3)
    useEffect(() => {
        const a = setTimeout(() => {
            setstate(prev => prev - 1);
        }, 1000)
        if (state === 0) {
            if (auth.hasOwnProperty('password') && auth.hasOwnProperty('username')) {
                const b = setTimeout(() => {
                    navigate('/profile');
                    clearTimeout(b);
                }, 1000);

            }
            else {
                const b = setTimeout(() => {
                    navigate('/authenticate');
                    clearTimeout(b);
                }, 1000);

            }
        }
        return () => {
            clearTimeout(a);
        }
    }, [state, navigate])
    return (
        <div>
            <img src={logo} className={cx("App-logo")} alt="logo" />
            {/* <h1>Xin vui lòng chờ {state} giây</h1> */}
        </div>
    );
}

export default Start;