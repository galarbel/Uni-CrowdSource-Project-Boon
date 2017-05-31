import React, {PropTypes} from "react";
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';
import Divider from 'material-ui/Divider';
import FontAwesome from "react-fontawesome";
import {StickyContainer, Sticky} from 'react-sticky';
import theme from "./common/MuiTheme";

const appHeadlines = ["TimeOff Request", "My Requests","Absence Summary","Absence Info","Approve Requests"];

class MobileContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {open: false};

        this.handleToggle = this.handleToggle.bind(this);
    }

    componentWillMount() {

    }

    handleToggle(event){
        this.setState({open: !this.state.open});
    }


    handleMenuOpen() {
        return (open) =>  this.setState({open});
    }

    render() {
        const title = this.props.children.props.route.displayName || "boon";
        return (
            <div>
                <StickyContainer>
                    <Sticky>
                        <AppBar
                            title={title}
                            iconClassNameRight="muidocs-icon-navigation-expand-more"
                            onLeftIconButtonTouchTap ={this.handleToggle}
                            onTitleTouchTap = {this.handleToggle}
                        />
                    </Sticky>
                    <Drawer docked={false}
                            width={250}
                            open={this.state.open}
                            className={"drawer"}
                            containerStyle={{backgroundColor:'#efefef',color:'black'}}
                            onRequestChange={this.handleMenuOpen()}>
                        <div style={{textAlign:'center',color:theme.palette.primary1Color,margin:'20px 0'}}>
                            <FontAwesome name={"gift"} size="2x"/>
                            <h1 style={{display:'inline-block',marginLeft:'3px'}}>boon!</h1>
                        </div>
                        <Divider/>
                        <div className="menu-items">
                            <MenuItem ><div onClick={this.handleToggle}><Link name= "1" to="/catalog">Boons catalog</Link></div></MenuItem>
                            <Divider/>
                            <MenuItem ><div onClick={this.handleToggle}><Link name= "2" to="/account">My account</Link></div></MenuItem>
                            <Divider/>
                            <MenuItem ><div onClick={this.handleToggle}><Link name="3" to="/submit">Submit an Item</Link></div></MenuItem>
                            <Divider/>
                            <MenuItem ><div onClick={this.handleToggle}><Link name="" to="/tags">Game Of Tags!</Link></div></MenuItem>
                            <Divider/>
                        </div>
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
