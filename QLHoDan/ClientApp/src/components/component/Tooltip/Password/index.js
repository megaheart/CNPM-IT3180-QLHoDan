import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';


const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

export default function PasswordTooltip({ children }) {
    return (
        <HtmlTooltip
            placement="right"
            title={
                <React.Fragment>
                    <Typography color="inherit">Định dạng mật khẩu</Typography>
                    <p>Mật khẩu phải có ít nhất 8 chữ cái</p>
                    <p>Mật khẩu chữ cái đầu tiên phải viết hoa</p>
                </React.Fragment>
            }
        >
            {children}
        </HtmlTooltip>
    );
}