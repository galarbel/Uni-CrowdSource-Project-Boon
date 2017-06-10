import React, {PropTypes} from 'react';
import LoadingProgress from '../common/LoadingProgress';
import Divider from 'material-ui/Divider';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FontAwesome from "react-fontawesome";
import api from "../../api/Api";
import Lightbox from 'react-image-lightbox';


class ProductDetailsPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = Object.assign({loading: 0});

        this.toggleLightbox = this.toggleLightbox.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
    }

    componentWillMount() {
        this.loadAjaxDetails();
    }

    componentDidUpdate(newProps, newState) {
        if (newState.data && newState.data.reported_by_user) {
            window.scrollTo(0,document.body.scrollHeight);
        }
    }


    loadAjaxDetails() {
        this.setState({loading: this.state.loading + 1});
        api.getItemDetails({item_id : this.props.params.id}).then(
            response => this.setState({data: response, loading: this.state.loading - 1})
        ).catch(
            e => {
            } //TODO
        );
    }

    toggleLightbox(e) {
        e.preventDefault();
        this.setState({isLightboxOpen: !this.state.isLightboxOpen});
    }

    closeLightbox() { //this is here cause lightbox doesn't use e.preventDefault
        this.setState({isLightboxOpen: !this.state.isLightboxOpen});
    }

    shareNumber(type, number) {
        return () => {window.location.href = type + ":" + number;};
    }

    reportFalseItem() {
        return () => {
            api.reportFalseItem({item_id: this.props.params.id}).then(
                response => this.setState(Object.assign(this.state.data, {reported_by_user: true}))
            ).catch(
                e => {
                    //TODO
                }
            );
        };
    }

    render() {
        if (this.state.loading > 0) {
            return (<LoadingProgress/>);
        }

        const {title,category,city,date,description,phone, image, tags} = this.state.data;
        return (
            <div>
                <div style={{margin:"16px 16px 90px",fontSize:14}}>
                    <div>
                        <div>
                            <strong>{title}</strong>
                        </div>
                        <div style={{fontSize:'14px'}}>
                            {category}
                        </div>
                    </div>
                    <Divider/>

                    <div><strong>Description:</strong></div>
                    <div>{description}</div>
                    <Divider />
                    <div>
                        <strong>Contact Information</strong>
                        <div>Phone: {phone}</div>
                        <div>Area: {city}</div>
                    </div>
                    <Divider/>
                    <div>
                        <strong>Tags</strong>
                        <div>{tags && tags.split(";").join(", ")}</div>
                        <div>Area: {city}</div>
                    </div>
                    <Divider/>
                    <div>Date Created: {date}</div>
                    <Divider/>

                    <div onClick={this.toggleLightbox}>
                        <br/>
                        <img src={"data:image/jpg;base64," + image} style={{maxWidth: "80vw", maxHeight: "40vh", margin: "auto", display: "block"}}/>
                        <br/>
                    </div>

                    <div>
                        {
                            this.state.data.reported_by_user &&
                            <div className="alert">* This item has been reported by you</div>
                        }
                    </div>
                </div>
                <div style={{position: 'fixed', bottom: 0, width: "100%", height: 85, background: "#FFF"}}>
                    <BottomNavigation selectedIndex={this.state.selectedIndex}>
                        <BottomNavigationItem
                            label="Call"
                            icon={<FontAwesome name={"phone"} size="2x"/>}
                            onTouchTap={this.shareNumber("tel", {phone})}
                        />
                        <BottomNavigationItem
                            label="Message"
                            icon={<FontAwesome name={"envelope"} size="2x"/>}
                            onTouchTap={this.shareNumber("sms", {phone})}
                        />
                        <BottomNavigationItem
                            label="Report"
                            icon={<FontAwesome name={"flag"} size="2x"/>}
                            onTouchTap={this.reportFalseItem()}
                            disabled={this.state.data.reported_by_user}
                        />
                    </BottomNavigation>
                </div>

                {
                    this.state.isLightboxOpen &&
                    <Lightbox
                        mainSrc={"data:image/jpg;base64," + image}
                        onCloseRequest={this.closeLightbox}
                    />
                }
            </div>
        );
    }
}

ProductDetailsPage.propTypes = {
    params: PropTypes.object.isRequired
};

export default ProductDetailsPage;



