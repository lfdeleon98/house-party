import React, { Component } from 'react';
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { Button, ButtonGroup, Grid, Typography, FormGroup } from "@material-ui/core";
import Info from "./Info";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //when we start, it will be null, so on the first render, it will show the homepage, 
            //and then after the compondentDidMount is done running, it will redirect us to the room if it sees were in a room
            roomCode: null,
        };
        this.clearRoomCode = this.clearRoomCode.bind(this);
    }

    //the component just rendered for the first time on the screen
    //without the async we need to wait for everything to happen before we can do anything else...and this could take sometime
    async componentDidMount() {
        //were going to call '/api/user-in-room', this will return if whether or not were in a room and if we are
        fetch('/api/user-in-room')
        //then well return the response.json or get the json from our response
        .then((response) => response.json())
        //data is a json object that we will parse to get the room code
        .then((data) => {
            //this setting of the state will force our component to rerender with the roomcode
            this.setState({
                roomCode: data.code
            });
        });
    }

    renderHomePage() {
        return (
            
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" component="h3">House Party</Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup  variant="contained" color="primary">
                        <Button color="primary" to="/join" component={ Link }>Join a Room</Button>
                        <Button color="default" to="/info" component={ Link }>Info</Button>
                        <Button color="secondary" to="/create" component={ Link }>Create a Room</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }
    //set the state so that the room code is null
    clearRoomCode() {
        this.setState({
            roomCode: null
        });
    }

    render () {
        return (
            <Router>
                <Switch>
                    { /*when were on this route, it will call this method and whatever is inside of it will show up
                    were using arrow notation because this is the function that will be called when we render this route.*/ }
                    <Route exact path='/' 
                        render={() => {
                            return this.state.roomCode ? (
                                <Redirect to={`/room/${this.state.roomCode}`}/>
                            ) : (
                                this.renderHomePage()
                            );
                        }}
                    />
                    <Route exact path='/join' component={RoomJoinPage}/>
                    <Route exact path='/info' component={Info}/>
                    <Route exact path='/create' component={CreateRoomPage}/>
                    <Route path="/room/:roomCode" 
                        render={(props) => {
                            //this makes sure that we are deleting it in the parent
                            return <Room {...props} leaveRoomCallback={this.clearRoomCode} />
                    }} />                    
                </Switch>
            </Router>
        )
    }
}