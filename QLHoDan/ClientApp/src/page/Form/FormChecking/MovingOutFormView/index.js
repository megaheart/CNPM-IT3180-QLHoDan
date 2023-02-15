import { useState, forwardRef } from 'react';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import Grid from '@mui/material/Grid';
import useAuth from '~/hooks/useAuth';
import axios from 'axios';
export default function MovingOutFormViewComponent({ id }) {
    const { auth, setAuth } = useAuth();
    const { data, isLoading, error } = useQuery(
        ['getMovingOutDetail', id],
        async () => {
            const response = await axios.get(
                "api/forms/MovingOut/" + id,
                {
                    headers: {
                        'Authorization': `Bearer ${auth.token}`
                    }
                }
            );
            if (response && response.data) {
                return response.data;
            }
            else {
                return null;
            }
        }
    );
    return (
        <>
            {(!error && !isLoading && data) && (
                <>
                    <span style={{ fontWeight: 500 }}>Nơi chuyển đi:</span><br />
                    <span>{data.moveOutPlace}</span><br />
                    <span style={{ fontWeight: 500 }}>Ngày chuyển đi:</span><br />
                    <span>{data.moveOutDate}</span><br />
                    <span style={{ fontWeight: 500 }}>Lí do chuyển đi:</span><br />
                    <span>{data.moveOutReason}</span><br />
                    <span style={{ fontWeight: 500 }}>Họ tên:</span><br />
                    <span>{data.resident.fullName}</span><br />
                    <span style={{ fontWeight: 500 }}>CCCD:</span><br />
                    <span>{data.resident.identityCode}</span><br />
                    <span style={{ fontWeight: 500 }}>Ngày sinh:</span><br />
                    <span>{data.resident.dateOfBirth}</span><br />
                </>
            )}
        </>
    )
}

