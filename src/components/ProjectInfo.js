import React, {PropTypes} from "react";
import {connect} from "react-redux";
import LoadingProgress from './common/LoadingProgress';

class ProjectInfo extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        if (this.props.loading) {
            return (
                <LoadingProgress />
            );
        }
        return (
            <div style={{margin: 20}}>
                <h2>Introduction:</h2>
                <h4 style={{marginLeft: 20}}>
                    This is a ReactJS starter project for My Checkpoint apps. It is based on React, Redux and React
                    Router.
                </h4>
                <br />
                <h2>Project structure:</h2>
                    <h3 style={{marginLeft: 20, fontSize: 'small'}}>
                        <ul>
                            <li>/resources</li>
                            <ul>
                                <li>Folder for static resources (SVGs, JPGs, etc.).</li>
                            </ul>
                            <li>/src</li>
                            <ul>
                                <li>/actions - Contains Redux actions related content.</li>
                                <li>/api - Contains API related content.</li>
                                <li>/components - Contains UI elements.</li>
                                <li>/constants - Contain String contstants.</li>
                                <li>/reducers - Contains Redux reducers.</li>
                                <li>/store - Contains Redux store configuration.</li>
                                <li>/styles - Contains CSS file.</li>
                                <li>/utils - Contains common utility helpers.</li>
                                <li>/index.html - Main html file for the app.</li>
                                <li>/index.js - Main entry point for for the React app.</li>
                                <li>/routes.js - Main React Router configuration file.</li>
                            </ul>
                            <li>/tools</li>
                            <ul>
                                <li>Contains build and local dev configuration files.</li>
                            </ul>
                            <li>/</li>
                            <ul>
                                <li>.babelrc - babel config file.</li>
                                <li>.editorconfig - IDE configuration (Indentation, etc.).</li>
                                <li>.eslintrc - ES linting rules.</li>
                                <li>package.json - NPM configuration file. This file lists all projects dependencies and
                                    npm scripts.
                                </li>
                                <li>webpack.config.* - Webpack configuration files for Dev and Prod environments.</li>
                            </ul>
                        </ul>
                    </h3>
                <br />
                <h2>Modules used:</h2>
                <div style={{marginLeft: 20}}>
                    NPM (Node Package Manager, like Maven for Java) is the tool we use to manage
                    dependencies in Javascript development. The file package.json contains all the modules
                    dependencies. Please
                    take a look and be familiar with them.
                    <div>Here is a list of modules you should know about that are already installed:</div>
                    <ul style={{fontSize: 'small'}}>
                        <li><span className="cp_color">currency-symbol-map</span> - A function to lookup the currency symbol for a given currency code and vice versa. <a href="https://github.com/bengourley/currency-symbol-map">More on Github.</a></li>
                        <li><span className="cp_color">fetch-jsonp</span> - fetch-jsonp provides you same API to fetch JSONP like naive Fetch. <a href="https://github.com/camsong/fetch-jsonp">More on Github.</a></li>
                        <li><span className="cp_color">material-ui</span> - A large library of React UI elements inspired by Google's Material Design. <a href="http://www.material-ui.com/#/components/">More info.</a></li>
                        <li><span className="cp_color">moment</span> - A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates. <a href="https://github.com/moment/moment">More on Github.</a></li>
                        <li><span className="cp_color">react-breadcrumbs</span> - React breadcrumbs component for React-Router. <a href="https://github.com/svenanders/react-breadcrumbs">More on Github.</a></li>
                        <li><span className="cp_color">react-collapse</span> - Component-wrapper for collapse animation with react-motion for elements with variable (and dynamic) height. <a href="https://github.com/nkbt/react-collapse">More on Github.</a></li>
                        <li><span className="cp_color">react-datepicker</span> - A simple and reusable datepicker component for React. <a href="https://github.com/Hacker0x01/react-datepicker">More on Github.</a></li>
                        <li><span className="cp_color">react-height</span> - Component-wrapper to determine and report children elements height. <a href="https://github.com/nkbt/react-height">More on Github.</a></li>
                        <li><span className="cp_color">react-portal-tooltip</span> - React tooltip. <a href="https://github.com/romainberger/react-portal-tooltip">More on Github.</a></li>
                        <li><span className="cp_color">react-responsive</span> - Media queries in react for responsive design. <a href="https://github.com/contra/react-responsive">More on Github.</a></li>
                        <li><span className="cp_color">react-sticky</span> - Sticky component for React. <a href="https://github.com/captivationsoftware/react-sticky">More on Github.</a></li>
                        <li><span className="cp_color">react-svg-loader</span> - A webpack loader that loads svg as a React Component. <a href="https://github.com/boopathi/react-svg-loader">More on Github.</a></li>
                        <li><span className="cp_color">react-swipe</span> - Swipe.js as a React component. <a href="https://github.com/voronianski/react-swipe">More on Github.</a></li>
                        <li><span className="cp_color">react-tabs</span> - React tabs component. <a href="https://github.com/reactjs/react-tabs">More on Github.</a></li>
                        <li><span className="cp_color">reactable</span> - Fast, flexible, and simple data tables in React. <a href="https://github.com/glittershark/reactable">More on Github.</a></li>
                        <li><span className="cp_color">toastr</span> - Simple javascript toast notifications. <a href="https://github.com/CodeSeven/toastr">More on Github.</a></li>
                    </ul>
                </div>
                <h4 style={{marginTop: 20}}>
                    Note: For a new app you will need to change some hard coded variables.
                    Please look for <span style={{color: "#60cc00"}}>TODO</span> comments in the code (CTRL + SHIFT + F).
                </h4>
            </div>
        );
    }
}

ProjectInfo.propTypes = {
    loading: PropTypes.bool.isRequired
};

function mapStateToProps(state/*, ownProps*/) {
    return {
        loading: state.ajaxCallsInProgress > 0,
    };
}


export default connect(mapStateToProps)(ProjectInfo);
