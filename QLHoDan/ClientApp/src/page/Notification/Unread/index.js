import useAuth from '~/hooks/useAuth';

import { Alert, Stack } from '@mui/material';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import notificationManager from '~/services/api/notificationManager';
import { NotificationSkeleton } from '~/components/Skeleton';
export default function UnReadNotification() {
    // const { auth } = useAuth();
    // const { data, isLoading, error } = useQuery(
    //     ['getReadNotification', auth.token],
    //     () => notificationManager.getReadNotification(auth.token)
    // );

    return (
        // <Stack sx={{ width: '100%', fontSize: 15 }} spacing={2}>
        //     <Alert sx={{ width: '100%', fontSize: 15 }} severity="success">Bạn đã gửi thành công đơn đăng ký nhân khẩu</Alert>
        //     <Alert sx={{ width: '100%', fontSize: 15 }} severity="warning">Tài khoản của bạn đã bị đăng nhập ở nơi khác</Alert>
        //     <Alert sx={{ width: '100%', fontSize: 15 }} severity="error">Yêu cầu đăng ký nhân khẩu đã bị từ chối</Alert>
        //     <Alert sx={{ width: '100%', fontSize: 15 }} severity="success">Đăng ký nhân khẩu thành công</Alert>
        // </Stack>
        <NotificationSkeleton />
    )
}