import useAuth from '~/hooks/useAuth';
import { Fragment, useState } from 'react';
import Notification from '../NotificationPattern'
import { Alert, Stack, Backdrop, CircularProgress, Snackbar } from '@mui/material';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import notificationManager from '~/services/api/notificationManager';
import { NotificationSkeleton } from '~/components/Skeleton';
export default function UnReadNotification() {
    const { auth } = useAuth();

    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [success, setSuccess] = useState(false);

    const { data, isLoading, error } = useQuery(
        ['getUnReadNotification', auth.username],
        () => notificationManager.getUnreadNotification(auth.token)
    );

    const queryClient = useQueryClient();

    const mutateMarkNotification = useMutation(
        (ids) => notificationManager.markNotification(auth.token, ids),
        {
            onMutate: async (ids) => {
                setOpenBackdrop(true);
                // await queryClient.cancelQueries(['getUnReadNotification', auth.username]);
                // await queryClient.cancelQueries(['getReadNotification', auth.username]);
                // const previousData = queryClient.getQueryData(['getUnReadNotification', auth.username]);
                // queryClient.setQueryData(['getUnReadNotification', auth.username], (old) => {
                //     return old.filter((item) => !ids.includes(item.id));
                // });
                // return { previousData };
            },
            onError: (err, variables, context) => {
                // queryClient.setQueryData(['getUnReadNotification', auth.username], context.previousData);
                alert(err)
            },
            onSuccess: () => {
                queryClient.invalidateQueries(['getUnReadNotification', auth.username]);
                queryClient.invalidateQueries(['getReadNotification', auth.username]);
                setSuccess(true);
            },
            onSettled: () => {
                setOpenBackdrop(false);
            }
        }
    );

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
    };


    return (
        <Fragment>
            <Snackbar open={success} autoHideDuration={4000} onClose={handleCloseSnackbar} >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', fontSize: 15 }}>
                    Đánh dấu thông báo đẫ đọc thành công !
                </Alert>
            </Snackbar>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {(isLoading || !data) ? <NotificationSkeleton /> :
                <Stack sx={{ width: '60%', fontSize: 15, margin: '0 auto', backgroundColor: '#fff' }} spacing={0}>
                    {
                        data.length > 0 ? data.sort((a, b) => {
                            return new Date(b.time) - new Date(a.time);
                        }).map((item) => {

                            return (
                                <Notification
                                    key={item.id}
                                    iden={item.id}
                                    sender={item.sender}
                                    senderName={item.senderFullname}
                                    content={item.content}
                                    time={item.time}
                                    markRead={mutateMarkNotification.mutate}
                                />
                            )
                        }
                        )
                            :
                            <div style={{ height: 500, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h2>Không có thông báo nào</h2>
                            </div>
                    }
                </Stack>
            }
        </Fragment>
    )
}