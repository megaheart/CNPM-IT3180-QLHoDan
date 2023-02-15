import { Dialog } from '@mui/material';
import Grid from '@mui/material/Grid';
import basementModule from '~/services/api/base';
function ImageDialog({ open, onClose, ids, title }) {
    return (
        <Dialog
            fullWidth={true}
            maxWidth='600'
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <h1> {title}</h1>
            <Grid container spacing={2}>
                {
                    ids.map((id, index) => {
                        return (
                            <Grid item xs={12} key={index}>
                                <img alt='loading' src={basementModule.getImageById(id)} style={{ width: '100%', height: 'auto' }} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Dialog>
    );
}

export default ImageDialog;