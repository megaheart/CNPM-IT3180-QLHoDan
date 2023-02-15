import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

function TableSkeleton() {

    return (
        <Stack spacing={1} sx={{ marginRight: 2 }}>
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="text" width={'100%'} height={100} sx={{ fontSize: '1rem' }} />
            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="rectangular" width={'100%'} height={400} />
            {/* <Skeleton variant="rounded" width={'100%'} height={500} /> */}
        </Stack>
    );
}

export default TableSkeleton; 