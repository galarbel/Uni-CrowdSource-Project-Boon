import React, {PropTypes} from "react";
import ChipInput from 'material-ui-chip-input';

class BasicSearch extends React.Component {

     constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <div>
                <ChipInput
                           hintText="Search By Tags"
                           fullWidth
                           fullWidthInput
                />
            </div>
        );
    }
}


BasicSearch.propTypes = {
    data: PropTypes.object
};


export default BasicSearch;
