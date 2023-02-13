import { Button, Container, Paper, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";


export default function ServerError() {
    const nav = useNavigate();
    const { state } = useLocation();  //browsera kaydolur refresh ile kayboolmaz.Anncaak elle acarsam goremem
    return (
        <Container component={Paper}>
            {state?.error ? (
                <>
                    <Typography variant="h3" color='error' gutterBottom>{state.error.title}</Typography>
                    <Typography>{state.error.detail || 'Internal server erroy'}</Typography>
                </>
            ) : (<Typography variant="h5" gutterBottom>Server error</Typography>)}
            <Button onClick={() => nav('/catalog')}>Go back to the store</Button>
        </Container>
    )

}