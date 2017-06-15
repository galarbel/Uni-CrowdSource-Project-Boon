import React, {PropTypes} from "react";
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';
import Divider from 'material-ui/Divider';
import FontAwesome from "react-fontawesome";
import {StickyContainer, Sticky} from 'react-sticky';
import theme from "./common/MuiTheme";
import DialogWrapper from "./common/DialogWrapper";
import Button from "./common/Button";

class MobileContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {open: false, openDialog: false};

        this.handleToggle = this.handleToggle.bind(this);
        this.checkForNotification = this.checkForNotification.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.viewItem = this.viewItem.bind(this);
    }

    componentWillMount() {
        window.mobileContainerComponent = this;
        this.checkForNotification();
    }

    checkForNotification() {
        if (!sessionStorage.getItem("notification")) {
            return;
        }

        const notification = Object.assign({},JSON.parse(sessionStorage.getItem("notification")));
        sessionStorage.removeItem("notification");
        if (notification && notification.additionalData && notification.additionalData.itemId) {
            this.setState({notification, openDialog: true});
        }
    }

    viewItem() {
        const notification = this.state.notification;
        this.context.router.push("/catalog/details/" + notification.additionalData.itemId);
        this.closeDialog();
    }

    closeDialog() {
        this.setState({openDialog: false});
    }

    handleToggle(){
        this.setState({open: !this.state.open});
    }

    handleMenuOpen(event) {
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
                <DialogWrapper
                    title="BOON FOUND!"
                    open={this.state.openDialog}
                    width="90%"
                    actions={[
                        <Button class="btn" key="1" onClick={this.viewItem} label="View Item" />,
                        <Button class="btn-secondary" key="2" onClick={this.closeDialog} label="Cancel" />
                    ]}
                >
                    <div><br/>Item matching your watchlist found!</div>
                </DialogWrapper>
            </div>
        );
    }
}

MobileContainer.propTypes = {
    actions: PropTypes.object,
    location: PropTypes.object,
    children: PropTypes.element
};

MobileContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default MobileContainer;
