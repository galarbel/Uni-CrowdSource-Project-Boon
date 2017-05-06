import React, {PropTypes} from "react";
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';
import Divider from 'material-ui/Divider';
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
         /*this.props.actions.getAbsenceTypes();
         this.props.actions.getAbsenceRelatedInfo();
         this.props.actions.getAbsencesSummary();*/
     }

    handleToggle(event){
        let Title= this.state.title;
        if (typeof event.target.name != 'undefined' && event.target.name != '' ){
           Title = appHeadlines[event.target.name];
        }
        this.setState({open: !this.state.open,title: Title});
    }

    titleHandler(path){
        let newTitle = "Boon!";
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
                        <FontAwesome name={"gift"} size="2x"/>
                        <h1 style={{display:'inline-block',marginLeft:'3px'}}>Boon</h1>
                    </div>
                    <Divider/>
                    <MenuItem ><div onClick={this.handleToggle}><Link name="0" to="/">Home</Link></div></MenuItem>
                    <Divider/>
                    <MenuItem ><div onClick={this.handleToggle}><Link name="1" to="/account">My account</Link></div></MenuItem>
                    <Divider/>
                    <MenuItem ><div onClick={this.handleToggle}><Link name= "2" to="/submit">Add boon</Link></div></MenuItem>
                    <Divider/>
                    <MenuItem ><div onClick={this.handleToggle}><Link name= "3" to="/catalog">Catalog</Link></div></MenuItem>
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


export default MobileContainer;