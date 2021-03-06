import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import axios from "axios";
import { login } from "../ReactMiddleware/reactAuth";
import { serverUrl } from "../config";

toast.configure();

//Login page of the System
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: "",
            password: "",
        };
    }

    updateInput(key, value) {
        this.setState({
            [key]: value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const users = {
            email: this.state.email,
            password: this.state.password,
        };

        axios
            .post(serverUrl + "/users/", users)
            .then((response) => {
                //Redirect to page
                login(response.data.token, response.data.user);
                window.location = "/user";
            })
            .catch((error) => {
                console.log(error.response);
                toast("Please Check Email or Password");
                this.setState({
                    password: "",
                });
            });
    }

    render() {
        return (
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card card-login">
                        <div className="card-header">
                            <h3>Sign In</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit} className="loginForm">
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-at" />
                                    </span>
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={(e) => this.updateInput("email", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-key" />
                                    </span>
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="password"
                                        value={this.state.password}
                                        onChange={(e) =>
                                            this.updateInput("password", e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="submit"
                                        value="Login"
                                        className="btn float-right login_btn"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Don't have an account?<a href="/create-acc">Sign Up</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}