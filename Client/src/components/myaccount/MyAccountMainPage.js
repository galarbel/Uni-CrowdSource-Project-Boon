import React, {PropTypes} from "react";
import {Tabs, Tab} from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';
import MyDetailsPage from './MyDetailsPage';
import MyBoonsPage from './MyBoonsPage';

class MyAccountMainPage extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Tabs>
                <Tab label="Details">
                    <MyDetailsPage/>
                </Tab>
                <Tab label="My Boons">
                    <MyBoonsPage/>
                </Tab>
                <Tab label="History">
                    <div>History</div>
                </Tab>
            </Tabs>
        );
    }
}


MyAccountMainPage.propTypes = {

};


export default MyAccountMainPage;
