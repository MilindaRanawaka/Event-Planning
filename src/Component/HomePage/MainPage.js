import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import PublicRoute from "../ReactMiddleware/PublicRoute";
import Login from "../User/Login";
import PrivateRoute from "../ReactMiddleware/PrivateRoute";
import Homepage from "./Homepage";
import Navbar from "../Navbar/Navbar";
import { Container } from "@material-ui/core";
import UserHome from "../User/UserHome";
import CreateUser from "../User/CreateUser";
import AddEvent from "../Event/AddEvent";
import UpdateEvent from "../Event/UpdateEvent";
import UpdateUser from "../User/UpdateUser";

//Contain all the user routes
function Dashboard() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Navbar />
                <Container
                    maxWidth={false}
                    style={{ marginTop: 75, paddingLeft: 0, paddingRight: 0 }}
                >
                    <Switch>

                        {/*All the Public Routes of System*/}
                        <PublicRoute restricted={false} component={Homepage} path="/" exact />
                        <PublicRoute restricted={true} component={Login} path="/login" exact />
                        <PublicRoute restricted={true} component={CreateUser} path="/create-acc" exact />

                        {/*Authorized Only Routes*/}
                        <PrivateRoute component={UserHome} path="/user" exact />
                        <PrivateRoute component={AddEvent} path="/add-event" exact />
                        <PrivateRoute component={UpdateEvent} path="/updateEvent/:id" exact />
                        <PrivateRoute component={UpdateUser} path="/update-user" exact />
                    </Switch>
                </Container>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default Dashboard;