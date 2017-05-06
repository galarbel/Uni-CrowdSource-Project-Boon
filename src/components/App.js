import React, {PropTypes} from "react";
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as absenceActions from "../actions/ActionsTemplate";
import Divider from 'material-ui/Divider';
import FontAwesome from "react-fontawesome";
import {StickyContainer, Sticky} from 'react-sticky';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import MuiTheme from "./common/MuiTheme";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
/** DO NOT REMOVE THIS - start**/
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
/** DO NOT REMOVE THIS - end**/

const appHeadlines = ["TimeOff Request", "My Requests","Absence Summary","Absence Info","Approve Requests"];

class App extends React.Component {

    constructor(props, context) {
        super(props, context);
        //this.state = {open: false, title:'TimeOff Request'};
        this.titleHandler(this.props.location.pathname);


        this.handleToggle = this.handleToggle.bind(this);
        this.titleHandler = this.titleHandler.bind(this);
    }

    componentWillMount() {
        //this.props.actions.getAbsenceTypes();
    }

    handleToggle(event){
        let Title= this.state.title;
        if (typeof event.target.name != 'undefined' && event.target.name != '' ){
            Title = appHeadlines[event.target.name];
        }
        this.setState({open: !this.state.open,title: Title});

    }

    titleHandler(path){
        let newTitle = appHeadlines[0];
        switch (path){
            case "/create":
                newTitle = appHeadlines[0];
                break;
            case "/requests":
                newTitle = appHeadlines[1];
                break;
            case "/summary":
                newTitle = appHeadlines[2];
                break;
            case "/info":
                newTitle = appHeadlines[3];
                break;
            case "/approve":
                newTitle = appHeadlines[4];
                break;
        }

        this.state = {open: false, title:newTitle};
    }

    render() {
        return (
            <div>
                     <MuiThemeProvider muiTheme={getMuiTheme(MuiTheme)}>
                        {this.props.children}
                    </MuiThemeProvider>
            </div>
        );
    }
}


App.propTypes = {
    actions: PropTypes.object,
    location: PropTypes.object,
    children: PropTypes.element
};

function mapStateToProps(state) {
    return {
        loading: state.ajaxCallsInProgress > 0
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(absenceActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
