import React, {PropTypes} from "react";
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
    location: PropTypes.object,
    children: PropTypes.element
};

export default App;
