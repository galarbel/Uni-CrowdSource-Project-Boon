import React, {PropTypes} from "react";
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {Link} from 'react-router';
import Lightbox from 'react-image-lightbox';
import Chip from 'material-ui/Chip';

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
                <Link name="0" to={"/catalog/details/" + item.item_id}>
                    <Card>
                        <CardText style={{padding: "10px"}}>
                            <div style={{display: "flex"}}>
                                <div onClick={this.toggleLightbox} style={{width: "80px",marginRight:'5px'}}>
                                    <img src={"data:image/jpg;base64," + item.image} style={{maxWidth: 80, maxHeight: 100}} />
                                </div>
                                <div style={{width:'100%'}}>
                                    <div style={{fontSize: 17,color:'#095115',display:'flex',justifyContent:'space-between'}}>
                                        <div><strong>{item.title}</strong></div>
                                        <div>{item.category}</div>
                                    </div>
                                    <Divider/>
                                    <div style={{display:'flex'}}>
                                    <div><strong>City: </strong></div>
                                        <div> {item.city}</div></div>
                                    <div><strong>Item Description: </strong></div>
                                    <div>{item.description}</div>
                                </div>
                            </div>
                        </CardText>
                    </Card>
                    <Divider/>
                    <div style={{position: "absolute", top: 0, bottom: 0, margin: "auto", right: 15, height: 20}}>
                        <i className="fa fa-chevron-right" aria-hidden="true" />
                    </div>
                </Link>

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
