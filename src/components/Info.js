import React, {useState, useEffect } from "react";
import { Grid, Typography, Button, IconButton } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";

const pages = {
    JOIN: 'pages.join',
    CREATE: 'pages.create'
};

export default function Info(props) {
    const [page, setPage] = useState(pages.JOIN);

    function joinInfo() {
        return "When a user is given the room code by the host, the user is allowed to enter the music control room. The user is allowed to vote to skip songs, and depending on the host's settings, the user may play/pause songs.";
    }

    function createInfo() {
        return "When a user wants to create a room, the application will ask the user to choose whether or not they want their guests to play/pause the music, and how many votes are require to skip a song. Then the user will be asked to login onto their spotify account to authorize use of their account. Once doing so, the user is now the host of the music controller and can later edit the settings if need be.";
    }

    useEffect(() => {
        console.log("ran");
    }); 
    
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">House Party is a music controller webapp</Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="body1">{page === pages.JOIN ? joinInfo() : createInfo() }</Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <IconButton onClick={() => {page === pages.CREATE ? setPage(pages.JOIN) : setPage(pages.CREATE)}}>
                    {page === pages.CREATE ? <NavigateBeforeIcon /> : <NavigateNextIcon />}
                </IconButton>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
            </Grid>
        </Grid>
    )
}