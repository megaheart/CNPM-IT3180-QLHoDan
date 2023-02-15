import { useState, forwardRef } from 'react';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import Grid from '@mui/material/Grid';
import useAuth from '~/hooks/useAuth';
import axios from 'axios';
export default function ChangingResidentInfoFormViewComponent({ id }) {
    const { auth, setAuth } = useAuth();
    const { data, isLoading, error } = useQuery(
        ['getChangingResidentInfoDetail', id],
        async () => {
            const response = await axios.get(
                "api/forms/ChangingResidentInfo/" + id,
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

    const gioitinh = data.isMale == true ? "Nam" : "Nữ";
    return (
        <>
            {(!error && !isLoading && data) && (
                <>
                    <span style={{ fontWeight: 500 }}>Họ và tên:</span><br />
                    <span>{data.fullName}</span><br />
                    <span style={{ fontWeight: 500 }}>Bí danh:</span><br />
                    <span>{data.alias}</span><br />
                    <span style={{ fontWeight: 500 }}>Ngày sinh:</span><br />
                    <span>{data.dateOfBirth}</span><br />
                    <span style={{ fontWeight: 500 }}>Giới tính:</span><br />
                    <span>{gioitinh}</span><br />
                    <span style={{ fontWeight: 500 }}>Nơi sinh:</span><br />
                    <span>{data.birthPlace}</span><br />
                    <span style={{ fontWeight: 500 }}>Quê quán:</span><br />
                    <span>{data.nativeLand}</span><br />
                    <span style={{ fontWeight: 500 }}>Dân tộc:</span><br />
                    <span>{data.ethnic}</span><br />
                    <span style={{ fontWeight: 500 }}>Quốc tịch:</span><br />
                    <span>{data.nation}</span><br />
                    <span style={{ fontWeight: 500 }}>Nghề nghiệp:</span><br />
                    <span>{data.job}</span><br />
                    <span style={{ fontWeight: 500 }}>Nơi làm việc:</span><br />
                    <span>{data.workplace}</span><br />
                    <span style={{ fontWeight: 500 }}>Trình độ học vấn:</span><br />
                    <span>{data.academicLevel}</span><br />
                    <span style={{ fontWeight: 500 }}>Tiền xử vi phạm pháp luật:</span><br />
                    <span>{data.criminalRecord}</span><br />
                    <span style={{ fontWeight: 500 }}>Lí do:</span><br />
                    <span>{data.reason}</span><br />
                    <span style={{ fontWeight: 500 }}>Họ và tên cũ:</span><br />
                    <span>{data.resident.fullName}</span><br />
                    <span style={{ fontWeight: 500 }}>Mã định danh điện tử:</span><br />
                    <span>{data.resident.identityCode}</span><br />
                    <span style={{ fontWeight: 500 }}>Ngày sinh cũ:</span><br />
                    <span>{data.resident.dateOfBirth}</span><br />
                    <span style={{ fontWeight: 500 }}>Hình ảnh:</span><br />
                </>
            )}
        </>
    )
}

