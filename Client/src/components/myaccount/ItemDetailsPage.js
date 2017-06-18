import React, {PropTypes} from 'react';
import LoadingProgress from '../common/LoadingProgress';
import Divider from 'material-ui/Divider';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FontAwesome from "react-fontawesome";
import api from "../../api/Api";
import Lightbox from 'react-image-lightbox';
import DialogWrapper from "../common/DialogWrapper";
import Button from "../common/Button";
import TextInput from "../common/TextInput";
import Select from 'react-select';


class ProductDetailsPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {loading: 0, transferDialogOpen: false, transferUser: null, deleteDialogOpen: false, userSuggestions: [], selectFocus: false};

        this.toggleLightbox = this.toggleLightbox.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.transferItemDialogToggle = this.transferItemDialogToggle.bind(this);
        this.deleteItemDialogToggle = this.deleteItemDialogToggle.bind(this);
        this.handleTransferUsernameChange = this.handleTransferUsernameChange.bind(this);
        this.transferItem = this.transferItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.loadUsersSuggestions = this.loadUsersSuggestions.bind(this);
        this.dialogSelectFocusBlur = this.dialogSelectFocusBlur.bind(this);
    }

    componentWillMount() {
        this.loadDetails();
        this.loadUsersSuggestions();
    }

    componentDidUpdate(newProps, newState) {
        if (newState.data && newState.data.transfered_to) {
            window.scrollTo(0,document.body.scrollHeight);
        }
    }

    loadDetails() {
        this.setState({loading: this.state.loading + 1});
        api.getItemDetails({item_id : this.props.params.id}).then(
            response => this.setState({data: response, loading: this.state.loading - 1})
        ).catch(
            e => {
            } //TODO
        );
    }

    loadUsersSuggestions() {
        this.setState({loading: this.state.loading + 1});
        api.getUsernameSuggestions().then(
            response => this.setState({userSuggestions: this.prepareTagsForSelect(response), loading: this.state.loading - 1})
        ).catch(
            e => {
            } //TODO
        );
    }

    prepareTagsForSelect(users) {
        const usersForSelect = [];
        users.map(user => usersForSelect.push({value: user.id, label: user.username}));
        return usersForSelect;
    }

    toggleLightbox(e) {
        e.preventDefault();
        this.setState({isLightboxOpen: !this.state.isLightboxOpen});
    }

    closeLightbox() { //this is here cause lightbox doesn't use e.preventDefault
        this.setState({isLightboxOpen: !this.state.isLightboxOpen});
    }

    editItem() {
        return () => {
            /*api.reportFalseItem({item_id: this.props.params.id}).then(
             response => this.setState(Object.assign(this.state.data, {reported_by_user: true}))
             ).catch(
             e => {
             //TODO
             }
             );*/
        };
    }

    transferItemDialogToggle() {
        this.setState({transferDialogOpen: !this.state.transferDialogOpen});
    }

    deleteItemDialogToggle() {
        this.setState({deleteDialogOpen: !this.state.deleteDialogOpen});
    }

    dialogSelectFocusBlur() {
        this.setState({selectFocus: !this.state.selectFocus});
    }

    handleTransferUsernameChange(userObj) {
        this.setState({transferUser: userObj});
    }

    transferItem() {
        const user = this.state.transferUser;
        if (!user || user === "" || !user.value || user.value === "") {
            this.setState({DialogError: "Please Enter Username"}); return;
        }

        const requestParams = {
            receiveUserId: user.value,
            itemId: this.state.data.item_id
        };

        this.setState({dialogLoading: true});
        api.transferItem(requestParams).then(
            response => this.setState({data: Object.assign(this.state.data,{transfered_to: user.label}), dialogLoading: false, dialogError: "", transferDialogOpen: false})
        ).catch(
            e => {
                //TODO
            }
        );
    }

    deleteItem() {
        const requestParams = { itemId : this.state.data.item_id};

        this.setState({dialogLoading: true});
        api.deleteItem(requestParams).then(
            response => history.back()
        ).catch(
            e => {
                //TODO
            }
        );
    }


    render() {
        if (this.state.loading > 0 || !this.state.data) {
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
                            this.state.data.transfered_to &&
                            <div className="alert">* This item is pending transfer approval of {this.state.data.transfered_to}</div>
                        }
                    </div>
                </div>
                <div style={{position: 'fixed', bottom: 0, width: "100%", height: 85, background: "#FFF"}}>
                    <BottomNavigation selectedIndex={this.state.selectedIndex}>
                        <BottomNavigationItem
                            label="Transfer"
                            icon={<FontAwesome name={"exchange"} size="2x"/>}
                            onTouchTap={this.transferItemDialogToggle}
                        />
                        <BottomNavigationItem
                            label="Delete"
                            icon={<FontAwesome name={"trash-o"} size="2x"/>}
                            onTouchTap={this.deleteItemDialogToggle}
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
                    open={this.state.transferDialogOpen}
                    title={"TRANSFER BOON"}
                    actions={[
                        <Button key="1" label="Submit" onClick={this.transferItem} disabled={this.state.dialogLoading}/>,
                        <Button key="2" label="Cancel" onClick={this.transferItemDialogToggle} disabled={this.state.dialogLoading}/>,
                        <LoadingProgress key="3"
                                         fullPage={false} thickness={2} size={21}
                                         style={{
                                             position: "relative", top: -3, left: 10,
                                             display: this.state.dialogLoading ?  "inline-block" : "none"
                                         }}/>
                    ]}
                    isKeyboardOpen
                >
                    <br/>
                    <div>Enter Username to transfer item</div>
                    <Select
                        onChange={this.handleTransferUsernameChange}
                        options={this.state.userSuggestions}
                        value={this.state.transferUser}
                        placeholder="Select User"
                        menuStyle={{height: 150}}
                        onFocus={this.dialogSelectFocusBlur}
                        onBlur={this.dialogSelectFocusBlur}
                    />
                    <div className="alert" style={{marginTop: 6}}>{this.state.dialogError}</div>

                    {this.state.selectFocus && <div style={{height: "160px"}}/>}
                </DialogWrapper>

                {
                    this.state.deleteDialogOpen &&
                    <DialogWrapper
                        open={this.state.deleteDialogOpen}
                        title={"DELETE BOON"}
                        actions={[
                            <Button key="1" label="Yes" icon="check-square-o" onClick={this.deleteItem} disabled={this.state.dialogLoading}/>,
                            <Button key="2" label="Cancel" onClick={this.deleteItemDialogToggle} disabled={this.state.dialogLoading}/>,
                            <LoadingProgress key="3"
                                             fullPage={false} thickness={2} size={21}
                                             style={{
                                                 position: "relative", top: -3, left: 10,
                                                 display: this.state.dialogLoading ?  "inline-block" : "none"
                                             }}/>
                        ]}
                    >
                        <br/>
                        <div>Are you sure you want to remove this item?</div>
                    </DialogWrapper>
                }
            </div>
        );
    }
}

ProductDetailsPage.propTypes = {
    params: PropTypes.object.isRequired
};

export default ProductDetailsPage;



