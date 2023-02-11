import * as React from 'react';
import { Stack, Skeleton } from '@mui/material';

export default function Animations() {
    return (
        <Stack spacing={1} sx={{ width: '100%' }}>
            <Skeleton variant="rectangular" height={100} animation="wave" />
            <Skeleton variant="rectangular" height={100} animation="wave" />
            <Skeleton variant="rectangular" height={100} animation="wave" />
            <Skeleton variant="rectangular" height={100} animation="wave" />
            <Skeleton variant="rectangular" height={100} animation="wave" />
        </Stack>
    );
}