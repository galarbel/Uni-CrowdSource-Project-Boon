import React, {PropTypes} from "react";
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as absenceActions from "../../actions/employeeActions";
import Divider from 'material-ui/Divider';
import umbrella from '../../../resources/img/TimeOff.png';
import FontAwesome from "react-fontawesome";
import {StickyContainer, Sticky} from 'react-sticky';

const appHeadlines = ["TimeOff Request", "My Requests","Absence Summary","Absence Info","Approve Requests"];

class MobileContainer extends React.Component {

     constructor(props, context) {
        super(props, context);
        //this.state = {open: false, title:'TimeOff Request'};
        this.titleHandler(this.props.location.pathname);


        this.handleToggle = this.handleToggle.bind(this);
        this.titleHandler = this.titleHandler.bind(this);
    }

     componentWillMount() {
         this.props.actions.getAbsenceTypes();
         this.props.actions.getAbsenceRelatedInfo();
         this.props.actions.getAbsencesSummary();
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
                <StickyContainer>
                    <Sticky>
                <AppBar
                    title={this.state.title}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap ={this.handleToggle}
                    onTitleTouchTap = {this.handleToggle}
                />
                    </Sticky>
                <Drawer docked={false}
                        width={250}
                        open={this.state.open}
                        className={"drawer"}
                        containerStyle={{backgroundColor:'#999',color:'white'}}
                        onRequestChange={(open) =>  this.setState({open})}>
                    <div style={{textAlign:'center',color:'#e65785',margin:'20px 0'}}>
                        <FontAwesome name={"umbrella"} size="2x"/>
                        <h1 style={{display:'inline-block',marginLeft:'3px'}}>TimeOff</h1>
                    </div>
                    <Divider/>
                    <MenuItem ><div onClick={this.handleToggle}><Link name="0" to="/create">Create Request</Link></div></MenuItem>
                    <Divider/>
                    <MenuItem ><div onClick={this.handleToggle}><Link name="1" to="/requests">My Requests</Link></div></MenuItem>
                    <Divider/>
                    <MenuItem ><div onClick={this.handleToggle}><Link name= "2" to="/summary">Absence Summary</Link></div></MenuItem>
                    <Divider/>
                    <MenuItem ><div onClick={this.handleToggle}><Link name= "3" to="/info">Absence Related Info</Link></div></MenuItem>
                    <Divider/>
                    <MenuItem ><div  onClick={this.handleToggle}><Link name= "4" to="/approve">Approve Requests</Link></div></MenuItem>
                    <Divider/>
                </Drawer>

                {this.props.children}
                </StickyContainer>
            </div>
        );
    }
}


MobileContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MobileContainer);
