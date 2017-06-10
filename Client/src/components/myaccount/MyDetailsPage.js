import React, {PropTypes} from "react";
import Button from "../common/Button";
import TextInput from "../common/TextInput";
import MyBasicDetails from "./MyBasicDetails";
import FontAwesome from "react-fontawesome";
import Divider from 'material-ui/Divider';


class MyDetailsPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {isEditMode : false};

        this.toggleEditMode = this.toggleEditMode.bind(this);
    }

    toggleEditMode() {
        this.setState({isEditMode : !this.state.isEditMode});
    }

    render() {
        return (
            <div style={{margin: "10px 16px"}}>
                <div style={{display:'flex', justifyContent: 'space-between', marginBottom: 10}}>
                    <h3>My Details</h3>
                    <div className="btn" onClick={this.toggleEditMode} style={{padding: "3px 10px 5px"}}>
                        { !this.state.isEditMode && <div><FontAwesome name="pencil-square-o" size="lg"/> Edit</div> }
                        { this.state.isEditMode && <div><FontAwesome name="times-circle" size="lg"/> Cancel</div> }
                    </div>
                </div>
                <Divider/>

                <div>
                    <br/>
                    <MyBasicDetails isEditMode={this.state.isEditMode} toggleEditMode={this.toggleEditMode}/>
                </div>
            </div>
        );
    }
}


MyDetailsPage.propTypes = {

};


export default MyDetailsPage;
