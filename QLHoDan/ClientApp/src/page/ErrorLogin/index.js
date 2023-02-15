import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material";
import useAuth from "~/hooks/useAuth";

export default function ErrorLogin() {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const direction = auth ? 'trang đăng nhập' : 'Trang chủ';
    const handleLeave = () => {
        if (!auth.role) {
            navigate('/login');
        }
        else if (auth.role === 'Household') {
            navigate('/dashboard_residentOrGuest');
        }
        else {
            navigate('/dashboard')
        }
    }
    return (
        <div>
            <h1>404 - Not found!</h1>
            <h1>Bạn không có quyền truy cập</h1>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button variant="contained"
                    color="primary" onClick={handleLeave}>Click vào đây </Button> {`để quay trở lại ${direction}`}
            </div>

        </div>
    )
}