import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Household from '../Paper/household';
// import PropTypes from 'prop-types';
import Population from '../TableTemplate/Population';

export default function SimpleDialog({ open, onClose }) {

    const handleClose = () => {
        onClose(!open);
    };

    return (
        <Dialog fullWidth={true} onClose={handleClose} open={open}>
            <DialogTitle>Danh sách thành viên trong hộ khẩu</DialogTitle>
            <Population />
        </Dialog>
    );
}
// SimpleDialog.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     open: PropTypes.bool.isRequired,
//     selectedValue: PropTypes.string.isRequired,
// };

{/* <List sx={{ pt: 0 }}>
    {emails.map((email) => (
        <ListItem disableGutters>
            <ListItemButton onClick={() => handleListItemClick(email)} key={email}>
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                        <PersonIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email} />
            </ListItemButton>
        </ListItem>
    ))}

    <ListItem disableGutters>
        <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('addAccount')}
        >
            <ListItemAvatar>
                <Avatar>
                    <AddIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
        </ListItemButton>
    </ListItem>
</List> */}