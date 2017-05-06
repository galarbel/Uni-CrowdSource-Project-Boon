import React, {PropTypes} from "react";
import {Link} from 'react-router';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as absenceActions from "../actions/ActionsTemplate";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import MuiTheme from "./common/MuiTheme";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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
        //this.props.actions.getAbsenceTypes();
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
