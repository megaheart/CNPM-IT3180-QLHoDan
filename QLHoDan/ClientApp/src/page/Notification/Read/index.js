import useAuth from '~/hooks/useAuth';
import { Fragment } from 'react';
import Notification from '../NotificationPattern'
import { Alert, Stack } from '@mui/material';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import notificationManager from '~/services/api/notificationManager';
import { NotificationSkeleton } from '~/components/Skeleton';
export default function ReadNotification() {
    const { auth } = useAuth();
    const { data, isLoading, error } = useQuery(
        ['getReadNotification', auth.username],
        () => notificationManager.getReadNotification(auth.token)
    );
    return (
        <Fragment>
            {(isLoading || !data) ? <NotificationSkeleton /> :
                <Stack sx={{ width: '60%', height: 500, fontSize: 15, margin: '0 auto', backgroundColor: '#fff' }} spacing={0}>
                    {
                        data.length > 0 ? data.sort((a, b) => {
                            return (new Date(b.time)) - (new Date(a.time));
                        }).map((item) => {

                            return (
                                <Notification
                                    key={item.id}
                                    sender={item.sender}
                                    senderName={item.senderFullname}
                                    content={item.content}
                                    time={item.time}
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