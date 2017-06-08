import React, {PropTypes} from "react";
import Button from '../common/Button';
import Select, { Creatable } from 'react-select';

const Type2 = ({sendAction, cancelAction, tagsArray, tagsSuggestions, onChangeTags}) => {

    return (
        <div  style={{padding: "0 20px", textAlign: "initial"}}>
            <div>
                Please add Tags to the following product
            </div>

            <div>
                <br/>
                <Creatable
                    multi
                    onChange={onChangeTags}
                    value={tagsArray}
                    options={tagsSuggestions}
                    placeholder="Add tags from list or add your own"
                />
                <br/>
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
    onChangeTags: PropTypes.func.isRequired,
    tagsArray: PropTypes.array.isRequired,
    tagsSuggestions: PropTypes.array.isRequired
};

export default Type2;
