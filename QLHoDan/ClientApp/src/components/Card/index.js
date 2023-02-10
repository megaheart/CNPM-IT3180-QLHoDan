import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard({ content, imgLink, number }) {
    return (
        <Card sx={{ maxWidth: 1000 }}>
            <CardMedia
                component="img"
                alt="image media"
                height="170"
                image={imgLink}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {content}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    <b>{number}</b>
                </Typography>
            </CardContent>
            {/* <CardActions>
                <Button size="small">Chi tiết</Button>
            </CardActions> */}
        </Card>
    );
}