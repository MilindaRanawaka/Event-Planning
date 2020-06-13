import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import axios from "axios";
import { toast } from "react-toastify";
import {serverUrl, TOKEN_ID} from "../config";

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            events: [],
        };
    };

    componentDidMount() {
        axios
            .get(serverUrl + "/events/")
            .then((response) => {
                this.setState({
                    events: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteCategory(id) {
        axios.delete(serverUrl + "/events/" + id).then((response) => {
            console.log(response);
            toast("Event Deleted");
            setTimeout(() => {
                window.location = "/user";
            }, 5000);
        });
    }

    render() {
        return (
            <div className="container">
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Category Name</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Date&Time</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.events
                        .filter((item) => item["addedBy"] === localStorage.getItem(TOKEN_ID))
                        .map((item) => {
                        return (
                            <tr key={item["_id"]}>
                                <td>{item["name"]}</td>
                                <td>{item["description"]}</td>
                                <td>{item["location"]}</td>
                                <td>{new Intl.DateTimeFormat("en-GB", {
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit",
                                    hour: 'numeric',
                                    minute: 'numeric'
                                }).format(new Date(item["time"]))}</td>
                                <td>
                                    <a href={"/updateEvent/" + item["_id"]}>Edit</a>
                                </td>
                                <td>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a
                                        onClick={(e) => this.deleteCategory(item["_id"])}
                                        href="#"
                                    >
                                        Delete
                                    </a>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}