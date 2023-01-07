import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Notification() {
    return (
        <Stack sx={{ width: '100%', fontSize: 15 }} spacing={2}>
            <Alert sx={{ width: '100%', fontSize: 15 }} severity="success">Bạn đã gửi thành công đơn đăng ký nhân khẩu</Alert>
            <Alert sx={{ width: '100%', fontSize: 15 }} severity="warning">Tài khoản của bạn đã bị đăng nhập ở nơi khác</Alert>
            <Alert sx={{ width: '100%', fontSize: 15 }} severity="error">Yêu cầu đăng ký nhân khẩu đã bị từ chối</Alert>
            <Alert sx={{ width: '100%', fontSize: 15 }} severity="success">Đăng ký nhân khẩu thành công</Alert>
        </Stack>
    );
}

export default Notification;