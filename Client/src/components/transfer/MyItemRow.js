import React, {PropTypes} from "react";
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FontAwesome from "react-fontawesome";
import Divider from 'material-ui/Divider';
import Lightbox from 'react-image-lightbox';

class CatalogItem extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {isLightboxOpen: false};

        this.toggleLightbox = this.toggleLightbox.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
    }

    toggleLightbox(e) {
        e.preventDefault();
        this.setState({isLightboxOpen: !this.state.isLightboxOpen});
    }

    closeLightbox() { //this is here cause lightbox doesn't use e.preventDefault
        this.setState({isLightboxOpen: !this.state.isLightboxOpen});
    }

    render() {
        const item = this.props.data;
        return (
            <div style={{position: "relative"}}>

                <Card>
                    <CardText style={{padding: "16px"}}>
                        <div style={{display: "flex"}}>
                            <div onClick={this.toggleLightbox} style={{width: "80px"}}>
                                <img src={"data:image/jpg;base64," + item.image} style={{maxWidth: 60, maxHeight: 100}} />
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
                <Divider/>


                {
                    this.state.isLightboxOpen &&
                    <Lightbox
                        mainSrc={"data:image/jpg;base64," + item.image}
                        onCloseRequest={this.closeLightbox}
                    />
                }
            </div>


        );
    }
}


CatalogItem.propTypes = {
    data: PropTypes.object
};


export default CatalogItem;
