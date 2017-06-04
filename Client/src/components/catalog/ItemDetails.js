import React, {PropTypes} from "react";
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {Link} from 'react-router';
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
                <Link name="0" to="/catalog/details/123">
                    <Card>
                        <CardHeader
                            title={item.title}
                            subtitle={item.city}
                        />
                        <CardText style={{padding: "0 16px"}}>
                            <div style={{display: "flex"}}>
                                <div onClick={this.toggleLightbox}>
                                    <img src={"data:image/jpg;base64," + item.image} style={{width: 100, height: 100}} />
                                </div>
                                <div>
                                    <div><strong>Item Description:</strong></div>
                                    <div>{item.desc}</div>
                                    <div><strong>Tags</strong></div>
                                    <div>{item.tags && item.tags.replace(";",", ")}</div>
                                </div>
                            </div>
                        </CardText>
                    </Card>
                    <Divider/>
                    <div style={{position: "absolute", top: 0, bottom: 0, margin: "auto", right: 15, height: 20}}>
                        >
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
