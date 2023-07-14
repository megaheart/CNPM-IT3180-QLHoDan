import useAuth from '~/hooks/useAuth';
import { Fragment, useState } from 'react';
import Notification from '../NotificationPattern'
import { Alert, Stack, Backdrop, CircularProgress, Snackbar } from '@mui/material';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import axios from 'axios';
import notificationManager from '~/services/api/notificationManager';
import { NotificationSkeleton } from '~/components/Skeleton';
export default function UnReadNotification() {
    const { auth } = useAuth();
    console.log(auth)
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [success, setSuccess] = useState(false);

    const { data, isLoading, error } = useQuery(
        ['getUnReadNotification', auth.username],
        () => notificationManager.getUnreadNotification(auth.token),
        {
            retry: 0,
        }
    );

    const queryClient = useQueryClient();

    const deleteThisNotification = async (id) => {
        setOpenBackdrop(true);
        // await notificationManager.markNotification(auth.token, id)
        //     .catch((e) => {
        //         console.log('why')
        //         alert(e);
        //         setOpenBackdrop(false)
        //     }
        //     );
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${auth.token}`);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://localhost:44436/api/Notification/read?msgIds=${id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                queryClient.invalidateQueries(['getUnReadNotification', auth.username]);
                queryClient.invalidateQueries(['getReadNotification', auth.username]);
                setOpenBackdrop(false);
                setSuccess(true);
            })
            .catch(error => console.log('error', error));

    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
    };

    console.log(error)

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
            {error ? <div>No data</div> : (isLoading || !data) ? <NotificationSkeleton /> :
                <Stack sx={{ width: '60%', height: 500, fontSize: 15, margin: '0 auto', backgroundColor: '#fff' }} spacing={0}>
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
                                    markRead={deleteThisNotification}
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