import React, {PropTypes} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import MuiTheme from "./common/MuiTheme";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {connect} from "react-redux";

import LoginPage from "./login/LoginPage";
/** DO NOT REMOVE THIS - start**/
import injectTapEventPlugin from 'react-tap-event-plugin';
/** DO NOT REMOVE THIS - end**/

const appHeadlines = ["TimeOff Request", "My Requests","Absence Summary","Absence Info","Approve Requests"];

class App extends React.Component {

    constructor(props, context) {
        super(props, context);

        injectTapEventPlugin();
    }

    componentWillMount() {

    }

    render() {
        const childLoginRequired = !this.props.children.props.route.loginNotRequired;
        const pageToShow = (!this.props.loggedIn && childLoginRequired) ? (<LoginPage />) : this.props.children;
        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme(MuiTheme)}>
                    {pageToShow}
                </MuiThemeProvider>
            </div>
        );
    }
}


App.propTypes = {
    location: PropTypes.object,
    children: PropTypes.element,
    loggedIn: PropTypes.bool.isRequired,
    route: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        loggedIn: state.loggedIn
    };
}


export default connect(mapStateToProps)(App);
