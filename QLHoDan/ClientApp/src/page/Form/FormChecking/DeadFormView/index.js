import { useState, forwardRef } from 'react';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import Grid from '@mui/material/Grid';
import useAuth from '~/hooks/useAuth';
import axios from 'axios';
export default function DeadFormViewComponent({ id }) {
    const { auth, setAuth } = useAuth();
    const { data, isLoading, error } = useQuery(
        ['getDeadDetail', id],
        async () => {
            const response = await axios.get(
                "api/forms/Dead/" + id,
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
                    <span style={{ fontWeight: 500 }}>Họ và tên:</span><br />
                    <span>{data.resident.fullName}</span><br />
                    <span style={{ fontWeight: 500 }}>Mã định danh điện tử:</span><br />
                    <span>{data.resident.identityCode}</span><br />
                    <span style={{ fontWeight: 500 }}>Ngày sinh:</span><br />
                    <span>{data.resident.dateOfBirth}</span><br />
                    <span style={{ fontWeight: 500 }}>Hình ảnh:</span><br />
                </>
            )}
        </>
    )
}

