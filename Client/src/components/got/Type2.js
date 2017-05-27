import React, {PropTypes} from "react";
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FontAwesome from "react-fontawesome";
import ChipInput from 'material-ui-chip-input';
import Button from '../common/Button';

const Type2 = ({sendAction, cancelAction, tagsArray, onAddNewTags, onRemoveNewTags, tagsSuggestions}) => {

    const onTouchTap = "moo";

    return (
        <div  style={{padding: "0 20px", textAlign: "initial"}}>
            <div>
                Please add Tags to the following product
            </div>

            <div>
                <ChipInput value={tagsArray}
                           onRequestAdd={onAddNewTags}
                           onRequestDelete={onRemoveNewTags}
                           fullWidth
                           fullWidthInput
                           hintText="Add Tags"
                           dataSource={tagsSuggestions}
                />
            </div>


            <div>
                <Button style={{width: "100%", height: "30px"}} label="Send" onClick={sendAction}/>
                <br/><br/>
                <Button style={{width: "100%", height: "30px"}} label="Next Question" secondary onClick={cancelAction}/>
            </div>
        </div>
    );
};

Type2.propTypes = {
    sendAction: PropTypes.func.isRequired,
    cancelAction: PropTypes.func.isRequired,
    onAddNewTags: PropTypes.func.isRequired,
    onRemoveNewTags: PropTypes.func.isRequired,
    tagsArray: PropTypes.array.isRequired,
    tagsSuggestions: PropTypes.array.isRequired
};

export default Type2;
