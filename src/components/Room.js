//once we created a room or are in the room, this is what we see
import React, { Component } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";

export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
            showSettings: false,
            spotifyAuthenticated: false,
            //store all the info about the current song in the state, so when the song changes, the state updates and so does the component
            song: {},
        };

        //match is the prop that stores all the info about how we got to this component from react router
        this.roomCode = this.props.match.params.roomCode;
        this.leaveRoomButton = this.leaveRoomButton.bind(this);
        this.updateShowSettings = this.updateShowSettings.bind(this);
        this.renderSettingsButton = this.renderSettingsButton.bind(this);
        this.renderSettings = this.renderSettings.bind(this);
        this.getRoomDetails = this.getRoomDetails.bind(this);
        this.authenticateSpotify = this.authenticateSpotify.bind(this);
        this.getCurrentSong = this.getCurrentSong.bind(this);
        this.getRoomDetails();

    }

    componentDidMount() {
        this.interval = setInterval(this.getCurrentSong, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    //we need to make sure that the response is valid
    getRoomDetails() {
        return fetch("/api/get-room" + "?code=" + this.roomCode)
        .then((response) => {
            //if its a valid response, delete the room and redirect to the homepage
            if (!response.ok) {
                this.props.leaveRoomCallback();
                this.props.history.push("/");
            }
            return response.json();
        })
        .then((data) => {
            this.setState({
            votesToSkip: data.votes_to_skip,
            guestCanPause: data.guest_can_pause,
            isHost: data.is_host,
            });
            //prompts the spotify auth
            if (this.state.isHost) {
                this.authenticateSpotify();
              }
        });
    }

    authenticateSpotify() {
        fetch("/spotify/is-authenticated")
          .then((response) => response.json())
          .then((data) => {
            this.setState({ spotifyAuthenticated: data.status });
            console.log(data.status);
            if (!data.status) {
              fetch("/spotify/get-auth-url")
                .then((response) => response.json())
                .then((data) => {
                  window.location.replace(data.url);
                });
            }
          });
      }

      getCurrentSong() {
        fetch("/spotify/current-song")
          .then((response) => {
            if (!response.ok) {
              return {};
            } else {
              return response.json();
            }
          })
          .then((data) => {
            this.setState({ song: data });
            console.log(data);
          });
      }
    
    leaveRoomButton() {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        };
        //after we called the endpoint and left the room, we want to redirect to the homepage
        fetch("/api/leave-room", requestOptions).then((_response) => {
            //this will redirect us to the homepage
          this.props.leaveRoomCallback();
          this.props.history.push("/");
        });
    }

    updateShowSettings(value) {
        this.setState({
            showSettings: value,
        });
    }

    renderSettings() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <CreateRoomPage 
                        update={true} 
                        votesToSkip={this.state.votesToSkip} 
                        guestCanPause={this.state.guestCanPause} 
                        roomCode = {this.roomCode} 
                        updateCallBack={this.getRoomDetails}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" onClick={() => this.updateShowSettings(false)}>
                        Close
                    </Button>
                </Grid>
            </Grid>
        )
        
    }

    renderSettingsButton() {
        return (
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={() => this.updateShowSettings(true)}>Settings</Button>
            </Grid>
        );
    }

    render() {
        //whenever the state of showSettings is true, perform this function, else render as normal
        if (this.state.showSettings) {
            return this.renderSettings();
        }
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">Code: { this.roomCode }</Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <MusicPlayer {...this.state.song}/>
                </Grid>
                
                {this.state.isHost ? this.renderSettingsButton() : null}
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" onClick={this.leaveRoomButton}>Leave Room</Button>
                </Grid>
            </Grid>   
        );
    }
}