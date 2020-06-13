import React from 'react';
import { isLogin, logout } from "../ReactMiddleware/reactAuth";
import { Link } from "react-router-dom";
import {TOKEN_FNAME} from "../config";
import "./Navbar.css";

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            category: [],
            isLogin: isLogin(),
            SearchTerms: "",
            linkTo: "",
            cat: "",
        };
    }

    handleLogout = () => {
        logout();
        this.setState({
            isLogin: false,
        });
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1"
                            >
                                <span className="navbar-toggler-icon"/>
                            </button>
                            <a className="navbar-brand" href="/">
                                Online Event Planning
                            </a>
                            <div
                                className="collapse navbar-collapse"
                                id="bs-example-navbar-collapse-1"
                            >
                                {/*}
                                <form className="form-inline" id="fullSearch">
                                    <input
                                        className="form-control mr-sm-2"
                                        type="text"
                                        id="navBarSearchForm"
                                        placeholder="Search Event"
                                    />
                                    <Link to={""}>
                                        <button
                                            className="btn btn-primary my-2 my-sm-0"
                                            type="submit"
                                        >
                                            Search Event
                                        </button>
                                    </Link>
                                </form>
                                {*/}

                                <ul className="navbar-nav ml-md-auto">
                                    <li className="nav-item active">
                                        {this.state.isLogin ? (
                                            <div>
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a href="/update-user/" className="loged-info">My Info</a>
                                                <a href="/add-event" className="loged-info">Add Event</a>
                                                <a
                                                    href="/user"
                                                    className="loged-info"
                                                >
                                                    {" "}
                                                    {localStorage.getItem(TOKEN_FNAME)}{" "}
                                                </a>
                                                <Link to="" onClick={() => this.handleLogout()}>
                                                    Logout
                                                </Link>
                                            </div>
                                        ) : (
                                            <a href="/login">SignUp / Login</a>
                                        )}
                                    </li>
                                    <br/>
                                    <li className="nav-item dropdown"></li>
                                </ul>

                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}
