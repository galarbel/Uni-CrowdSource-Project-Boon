import React, {PropTypes} from "react";
import {StickyContainer, Sticky} from 'react-sticky';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import MuiTheme from "./common/MuiTheme";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Navigation from "./common/Navigation";
import Footer from "./common/Footer";
import {connect} from "react-redux";
import ErrorPage from './common/ErrorPage';
import {bindActionCreators} from "redux";
import * as ajaxStatusActions from "../actions/ajaxStatusActions";

// Needed for onTouchTap for material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Needed for fetch-jsonp polyfill
require('es6-promise').polyfill();

class App extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    shouldComponentUpdate() {
        if (this.props.ajaxError) {
            this.props.actions.clearError();
        }
        return true;
    }


    render() {
        return (
            <div className="Site">
                <div className="Site-content">
                    <StickyContainer>
                        <Sticky style={{zIndex: "10"}}>
                            <Navigation />
                        </Sticky>
                        <MuiThemeProvider muiTheme={getMuiTheme(MuiTheme)}>
                            {this.props.ajaxError ?
                                <ErrorPage msg={this.props.ajaxError}/>
                                :
                                this.props.children}
                        </MuiThemeProvider>
                    </StickyContainer>
                </div>
                <Footer />
            </div>
        );
    }
}

App.propTypes = {
    actions: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    ajaxError: PropTypes.string
};

function mapStateToProps(state/*, ownProps*/) {
    return {
        ajaxError: state.ajaxError
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ajaxStatusActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
