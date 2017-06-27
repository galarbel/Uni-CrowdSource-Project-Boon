import React, {PropTypes} from "react";
import Button from "../common/Button";
import TextInput from "../common/TextInput";
import MyBasicDetails from "./MyBasicDetails";
import MyWatchlist from "./MyWatchlist";
import FontAwesome from "react-fontawesome";
import Divider from 'material-ui/Divider';


class MyDetailsPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {isEditModeDetails : false};

        this.toggleEditModeDetails = this.toggleEditModeDetails.bind(this);
    }

    toggleEditModeDetails() {
        this.setState({isEditModeDetails : !this.state.isEditModeDetails});
    }


    render() {
        return (
            <div style={{margin: "10px 16px"}}>
                <div style={{display:'flex', justifyContent: 'space-between', marginBottom: 10}}>
                    <h3>My Details</h3>
                    <div name="Details" className="btn" onClick={this.toggleEditModeDetails} style={{padding: "3px 10px 5px"}}>
                        { !this.state.isEditModeDetails && <div><FontAwesome name="pencil-square-o" size="lg"/> Edit</div> }
                        { this.state.isEditModeDetails && <div><FontAwesome name="times-circle" size="lg"/> Cancel</div> }
                    </div>
                </div>
                <Divider/>

                <div>
                    <br/>
                    <MyBasicDetails isEditMode={this.state.isEditModeDetails} toggleEditMode={this.toggleEditModeDetails}/>
                </div>

                <br/>

                <div style={{display:'flex', justifyContent: 'space-between', marginBottom: 10}}>
                    <h3>My Watchlist</h3>
                </div>
                <Divider/>

                <div>
                    <br/>
                    <MyWatchlist />
                </div>
            </div>
        );
    }
}


MyDetailsPage.propTypes = {

};


export default MyDetailsPage;
