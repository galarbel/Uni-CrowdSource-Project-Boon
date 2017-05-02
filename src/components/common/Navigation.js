import React from "react";
import {Link} from "react-router";
import cpLogo from "../../../resources/img/CPIntranetLogo.png";

const Navigation = () => (
    <div className="top">
        <div className="header">
            <a href="/">
                <h3 className="title" style={{display1: "inline-block"}}>Time Off</h3>
            </a>
            <a href="http://cpi.checkpoint.com" target="_blank">
                <img src={cpLogo} style={{verticalAlign: "top"}} />
            </a>
        </div>
        <nav>
            <Link activeClassName="nav-link-active" to="/create/">Create Request</Link>
            <Link activeClassName="nav-link-active" to="/requests/">My Requests</Link>
            <Link activeClassName="nav-link-active" to="/approve/">Approve Requests</Link>
            <Link activeClassName="nav-link-active" to="/projectInfo/">Time Off Calendar</Link>
            <Link activeClassName="nav-link-active" to="/reports/">Reports</Link>
        </nav>
    </div>
);

export default Navigation;
