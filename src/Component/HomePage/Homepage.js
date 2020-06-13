import React from "react";
import axios from "axios";
import "./Homepage.css";
import {serverUrl} from "../config";

//Homepage of the System
export default class Homepage extends React.Component {

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

    render() {
        return (
            <div>
                {this.state.events.map((item) => {
                    return (
                        <div className="cardbox card border-success mb-3" key={item["_id"]}>
                            <div className="card-body text-success">
                                <h4 className="card-title">{item["name"]}</h4>
                                <h6 className="card-text">{item["description"]}</h6>
                            </div>
                            <div className="card-footer bg-transparent border-success">
                                Time: {new Intl.DateTimeFormat("en-GB", {
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit",
                                    hour: 'numeric',
                                    minute: 'numeric'
                                }).format(new Date(item["time"]))} <br/>
                                 Location: {item["location"]}</div>
                        </div>
                    );
                })}
            </div>
        );
    }
}