import React, {PropTypes} from 'react';
import LoadingProgress from '../common/LoadingProgress';
import Divider from 'material-ui/Divider';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FontAwesome from "react-fontawesome";
import api from "../../api/Api";
import Lightbox from 'react-image-lightbox';
import DialogWrapper from "../common/DialogWrapper";
import Button from "../common/Button";
import Chip from 'material-ui/Chip';
import moment from "moment";

class ProductDetailsPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = Object.assign({loading: 0, reportDialogOpen: false});

        this.toggleLightbox = this.toggleLightbox.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.reportFalseItem = this.reportFalseItem.bind(this);
        this.confirmReportFalseItem = this.confirmReportFalseItem.bind(this);
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

    confirmReportFalseItem() {
        this.setState({reportDialogOpen: !this.state.reportDialogOpen});
    }

    reportFalseItem() {
        api.reportFalseItem({item_id: this.props.params.id}).then(
            response => this.setState({data : Object.assign(this.state.data, {reported_by_user: true}), reportDialogOpen: false})
        ).catch(
            e => {
                //TODO
            }
        );

    }

    render() {
        if (this.state.loading > 0) {
            return (<LoadingProgress/>);
        }

        const {title,category,city,date,description,phone, image, tags} = this.state.data;
        return (
            <div>
                <div style={{fontSize:14}}>
                    <div style={{display:'flex',justifyContent:'space-between',verticalAlign:'bottom',margin:'5px'}}>
                        <h1>
                            {title}
                        </h1>
                        <h1 style={{fontWeight:'initial',color:'#999'}}>
                            {category}
                        </h1>
                    </div>
                    <Divider />
                    <div style={{textAlign:'right'}}>
                    <h4 style={{color:'#999'}}>
                        {moment(date).format("D/mm/YYYY h:mm")}
                    </h4></div>
                    <br />
                    <div style={{background:'#efefef',height:'30px',textAlign:'center',verticalAlign:'center'}}>
                    <h2 style={{verticalAlign:'middle'}}>Description</h2>
                    </div>
                    <div>{description}</div>
                    <br />
                    <div style={{background:'#efefef',height:'30px',textAlign:'center',verticalAlign:'center'}}>
                        <h2 style={{verticalAlign:'middle'}}>Tags</h2>
                    </div>
                        <div style={{padding:'5px'}}>{tags && tags.split(";").map(tag => <Chip  backgroundColor={"#095115"} labelColor="white" style={{display:'inline-block',margin:1}}
                        >
                            {tag}
                        </Chip>)}
                    </div>
                    <div style={{background:'#efefef',height:'30px',textAlign:'center',verticalAlign:'center'}}>
                        <h2 style={{verticalAlign:'middle'}}>Contact Information</h2>
                    </div>
                    <div>
                        <div>Phone: {phone}</div>
                        <div>City: {city}</div>
                    </div>
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
                            onTouchTap={this.confirmReportFalseItem}
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

                <DialogWrapper
                    title="REPORT ITEM"
                    open={this.state.reportDialogOpen}
                    width="90%"
                    actions={[
                        <Button class="btn" key="1" onClick={this.reportFalseItem} label="Report" icon = "check-square-o" />,
                        <Button class="btn-secondary" key="2" onClick={this.confirmReportFalseItem} label="Cancel" />
                    ]}
                >
                    <div>
                        <br/>Confirm reporting of this item?
                    </div>
                </DialogWrapper>

            </div>
        );
    }
}

ProductDetailsPage.propTypes = {
    params: PropTypes.object.isRequired
};

export default ProductDetailsPage;



