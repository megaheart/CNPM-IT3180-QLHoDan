import { useState, forwardRef } from 'react';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import Grid from '@mui/material/Grid';
import useAuth from '~/hooks/useAuth';
import axios from 'axios';
export default function ChangingHouseholdInfoFormViewComponent({ id }) {
    const { auth, setAuth } = useAuth();
    const { data, isLoading, error } = useQuery(
        ['getChangingHouseholdInfoDetail', id],
        async () => {
            const response = await axios.get(
                "api/forms/ChangingHouseholdInfo/" + id,
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
                    <span style={{ fontWeight: 500 }}>Họ và tên chủ hộ:</span><br />
                    <span>{data.owner.fullName}</span><br />
                    <span style={{ fontWeight: 500 }}>Mã định danh điện tử chủ hộ:</span><br />
                    <span>{data.owner.identityCode}</span><br />
                    <span style={{ fontWeight: 500 }}>Tổ:</span><br />
                    <span>{data.scope}</span><br />
                    <span style={{ fontWeight: 500 }}>Lí do:</span><br />
                    <span>{data.reason}</span><br />
                </>
            )}
        </>
    )
}

