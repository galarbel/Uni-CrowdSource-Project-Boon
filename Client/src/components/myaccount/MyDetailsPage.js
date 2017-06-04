import React, {PropTypes} from "react";
import LoadingProgress from '../common/LoadingProgress';
import Button from "../common/Button";
import TextInput from "../common/TextInput";
import TextAreaInput from "../common/TextAreaInput";

class MyDetailsPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {editMode: false};

        this.toggleEditMode = this.toggleEditMode.bind(this);
    }

    toggleEditMode() {
        this.setState({editMode : !this.state.editMode});
    }

    editDetailsSubmit() {
        //todo
    }

    render() {
        const isEdit = this.state.editMode;

        return (
            <div>
                <div style={{display:'flex', justifyContent: 'space-between'}}>
                    <h3>My Details</h3>
                    <button onClick={this.toggleEditMode}>edit icon</button>
                </div>

                <div>
                    <table>
                        <tbody>
                        <tr>
                            <th>
                                Name:
                            </th>
                            <td>
                                {!isEdit && "Kreng"}
                                {isEdit && <TextInput label=""/>}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Email:
                            </th>
                            <td>
                                {!isEdit && "kreng@techno.drom.com"}
                                {isEdit && <TextInput label=""/>}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                phone
                            </th>
                            <td>
                                {!isEdit && "1-800-מימד-x"}
                                {isEdit && <TextInput label=""/>}
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    {isEdit && <Button onClick={this.editDetailsSubmit} label="Submit" />}
                </div>
            </div>
        );
    }
}


MyDetailsPage.propTypes = {

};


export default MyDetailsPage;
