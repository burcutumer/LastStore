import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import {Link} from "react-router-dom";

export default function() {
    return (
        <Container component={Paper} sx={{height: 400}}>
            <Typography gutterBottom variant="h3">oppsss we couldt found</Typography>
            <Divider/>
            <Button fullWidth component={Link} to='/catalog'>Go back to catalog</Button>
        </Container>
    )
}