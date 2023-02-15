import { useState, forwardRef } from 'react';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import Grid from '@mui/material/Grid';
import useAuth from '~/hooks/useAuth';
import axios from 'axios';
export default function HouseholdFormViewComponent({ id }) {
    const { auth, setAuth } = useAuth();
    const { data, isLoading, error } = useQuery(
        ['getHousehold', id],
        async () => {
            const response = await axios.get(
                "api/forms/Household/" + id,
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
                    <span style={{ fontWeight: 500 }}>Số hộ khẩu:</span><br />
                    <span>{data.householdId}</span><br />
                    <span style={{ fontWeight: 500 }}>Địa chỉ:</span><br />
                    <span>{data.address}</span><br />
                    <span style={{ fontWeight: 500 }}>Tổ:</span><br />
                    <span>{data.scope}</span><br />
                    <span style={{ fontWeight: 500 }}>Hình ảnh:</span><br />
                </>
            )}
        </>
    )
}

