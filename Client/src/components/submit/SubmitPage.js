import React, {PropTypes} from 'react';
import LoadingProgress from '../common/LoadingProgress';
import Mew from '../../../resources/img/mew.png';
import Divider from 'material-ui/Divider';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FontAwesome from "react-fontawesome";


class SubmitPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        //this.state = Object.assign({},initState);

    }

    componentWillMount() {

    }


    render() {
        return (
            <div style={{margin:5,fontSize:14}}>
                Hi....
            </div>
        );
    }
}

SubmitPage.propTypes = {

};

export default SubmitPage;



