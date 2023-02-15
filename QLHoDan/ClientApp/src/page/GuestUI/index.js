import { HKForm, NKForm } from '../Form';
import useAuth from '~/hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Guest() {
    const { auth } = useAuth();
    console.log(auth);
    const navigate = useNavigate();
    useEffect(
        () => {
            if (auth.role) {
                navigate('/profile');
            }
        }, [auth.role, navigate]
    )
    return (
        <div>
            <h1>Giao diện website cho khách</h1>
            <ul>
                Các chức năng:
                <li>Gửi đơn xin đăng ký hộ khẩu</li>
            </ul>
        </div>
    );
}
function Guest_Add_Household() {
    return (
        <HKForm />
    )
}

function Guest_Add_Resident() {
    return (
        <NKForm />
    )
}

export default Guest;
export { Guest_Add_Household, Guest_Add_Resident };