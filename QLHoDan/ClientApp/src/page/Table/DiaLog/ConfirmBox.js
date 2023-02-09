import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


function ConfirmBox({ open, onClose, onAgree, title }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle sx={{ fontSize: 20 }} id="alert-dialog-title">
                {title || "Xóa hộ khẩu ?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ fontSize: 15 }} id="alert-dialog-description">
                    Thao tác này sẽ xóa những gì vừa thay đổi, bạn có chắc chắn muốn đóng ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button sx={{ fontSize: 15 }} onClick={onClose}>Suy nghĩ lại</Button>
                <Button sx={{ fontSize: 15 }} onClick={onAgree} autoFocus>
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>);
}

export default ConfirmBox;