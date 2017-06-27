import React, {PropTypes} from "react";
import {Tabs, Tab} from 'material-ui/Tabs';
import MyDetailsPage from './MyDetailsPage';
import MyBoonsPage from './MyBoonsPage';
import MyHistoryPage from './MyHistoryPage';

class MyAccountMainPage extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Tabs style={{padding: "48px 0 0 0"}} tabItemContainerStyle={{ position: "fixed", top: 64, zIndex: 100,  width: "100%", background: "rgb(9, 81, 21)" }}>
                <Tab label="Details">
                    <MyDetailsPage/>
                </Tab>
                <Tab label="My Boons">
                    <MyBoonsPage/>
                </Tab>
                <Tab label="History">
                    <MyHistoryPage/>
                </Tab>
            </Tabs>
        );
    }
}


MyAccountMainPage.propTypes = {

};


export default MyAccountMainPage;
