import React, {PropTypes} from "react";
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FontAwesome from "react-fontawesome";
import Divider from 'material-ui/Divider';
import Lightbox from 'react-image-lightbox';
import Button from "../common/Button";
import DialogWrapper from "../common/DialogWrapper";
import LoadingProgress from '../common/LoadingProgress';
import api from "../../api/Api";

class CatalogItem extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {isLightboxOpen: false, dialogOpen: false, dialogAction: "", dialogLoading : false};

        this.toggleLightbox = this.toggleLightbox.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.toggleDialogOpen = this.toggleDialogOpen.bind(this);
        this.approveOrRejectBoon = this.approveOrRejectBoon.bind(this);
        this.transferItemDialogToggle = this.transferItemDialogToggle.bind(this);
        this.deleteItemDialogToggle = this.deleteItemDialogToggle.bind(this);
    }

    toggleLightbox(e) {
        e.preventDefault();
        this.setState({isLightboxOpen: !this.state.isLightboxOpen});
    }

    closeLightbox() { //this is here cause lightbox doesn't use e.preventDefault
        this.setState({isLightboxOpen: !this.state.isLightboxOpen});
    }

    toggleDialogOpen() {
        this.setState({dialogOpen: !this.state.dialogOpen});
    }

    transferItemDialogToggle() {
        this.setState({dialogAction: "approve"});
        this.toggleDialogOpen();
    }

    deleteItemDialogToggle() {
        this.setState({dialogAction: "reject"});
        this.toggleDialogOpen();
    }

    approveOrRejectBoon() {
        const requestParams = {
            isApproved: this.state.action === "approve" ? 1 : 0,
            requestId: this.props.data.request_id
        };

        this.setState({dialogLoading: true});
        api.approveOrRejectTransfer(requestParams).then(
            response => { this.setState({done: true, dialogOpen: false}); }
        ).catch(
            e => {
                //todo
            }
        );

    }

    render() {
        if (this.state.done) { //so lazy... :)
            return (<div/>);
        }

        const item = this.props.data;
        return (
            <div style={{position: "relative"}}>

                <Card>
                    <CardText style={{padding: "16px 16px 0", borderBottom:"1px solid #ccc"}}>
                        <div style={{display: "flex"}}>
                            <div onClick={this.toggleLightbox} style={{width: "80px"}}>
                                <img src={"data:image/jpg;base64," + item.image} style={{maxWidth: 60, maxHeight: 80}} />
                            </div>
                            <div>
                                <div style={{fontSize: 17}}><strong>{item.title}</strong></div>
                                <div><strong>City:</strong></div>
                                <div>{item.area}</div>

                            </div>
                        </div>
                    </CardText>
                    <div className="pending-actions">
                        <BottomNavigation selectedIndex={this.state.selectedIndex}>
                            <BottomNavigationItem
                                icon={<div><FontAwesome name={"check"} size="2x"/> Approve</div>}
                                onTouchTap={this.transferItemDialogToggle}
                            />
                            <BottomNavigationItem
                                icon={<div><FontAwesome name={"times"} size="2x"/> Reject</div>}
                                onTouchTap={this.deleteItemDialogToggle}
                            />
                        </BottomNavigation>
                    </div>
                </Card>

                <br/>


                {
                    this.state.isLightboxOpen &&
                    <Lightbox
                        mainSrc={"data:image/jpg;base64," + item.image}
                        onCloseRequest={this.closeLightbox}
                    />
                }

                <DialogWrapper
                    open={this.state.dialogOpen}
                    title={this.state.dialogAction.toUpperCase() + " BOON"}
                    actions={[
                        <Button key="1" icon="check-square-o" label={this.state.dialogAction.capitalizeFirstLetter()} onClick={this.approveOrRejectBoon} disabled={this.state.dialogLoading}/>,
                        <Button key="2" label="Cancel" onClick={this.toggleDialogOpen} disabled={this.state.dialogLoading}/>,
                        <LoadingProgress key="3"
                                         fullPage={false} thickness={2} size={21}
                                         style={{
                                             position: "relative", top: -3, left: 10,
                                             display: this.state.dialogLoading ?  "inline-block" : "none"
                                         }}/>
                    ]}
                >
                    <br/>
                    <div>Are you sure you want to {this.state.dialogAction} this boon?</div>
                </DialogWrapper>
            </div>
        );
    }
}


CatalogItem.propTypes = {
    data: PropTypes.object
};


export default CatalogItem;
