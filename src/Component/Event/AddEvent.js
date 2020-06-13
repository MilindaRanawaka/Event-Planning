import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {serverUrl, TOKEN_ID} from "../config";

toast.configure();

//New Event can create using This component
export default class CreateUser extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            eventName: "",
            eventDescription: "",
            eventLocation: "",
            eventTime: "",
            addedBy: ""
        };
    }

    updateInput(key, value) {
        this.setState({
            [key]: value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const events = {
            eventName: this.state.eventName,
            eventDescription: this.state.eventDescription,
            eventLocation: this.state.eventLocation,
            eventTime: this.state.eventTime,
            addedBy: localStorage.getItem(TOKEN_ID)
        };

        axios
            .post(serverUrl + "/events/add", events)
            .then((response) => {
                console.log(response);
                toast("Event Added");
                this.setState({
                    eventName: "",
                    eventDescription: "",
                    eventLocation: "",
                    eventTime: "",
                    addedBy: ""
                });
            })
            .catch((error) => {
                console.log(error.response);
                toast("Event Exists");
                this.setState({
                    eventName: "",
                    eventDescription: "",
                    eventLocation: "",
                    eventTime: "",
                    addedBy: ""
                });
            });

    }

    render() {
        return (
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card card-signup">
                        <div className="card-header">
                            <h3>Add Event</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <label className="control-label">Event Name</label>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-id-card" />
                                    </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Event Name"
                                        value={this.state.eventName}
                                        onChange={(e) =>
                                            this.updateInput("eventName", e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <label className="control-label">Event Description</label>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-id-card" />
                                    </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Event Description"
                                        value={this.state.eventDescription}
                                        onChange={(e) =>
                                            this.updateInput("eventDescription", e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <label className="control-label">Location</label>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-thumbtack" />
                                    </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Event Location"
                                        value={this.state.eventLocation}
                                        onChange={(e) =>
                                            this.updateInput("eventLocation", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <label className="control-label">Event Date</label>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                          <i className="fas fa-calendar-alt" />
                                        </span>
                                    </div>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        placeholder="Event Date"
                                        value={this.state.eventTime}
                                        onChange={(e) =>
                                            this.updateInput("eventTime", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn float-right reg-btn">
                                    Add event
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        );
    }
}