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
                <Stack sx={{ width: '60%', fontSize: 15, margin: '0 auto', backgroundColor: '#fff' }} spacing={0}>
                    {
                        data.map((item) => {

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
                    }
                </Stack>
            }
        </Fragment>
    )
}