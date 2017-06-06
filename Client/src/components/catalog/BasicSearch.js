import React, {PropTypes} from "react";
import ChipInput from 'material-ui-chip-input';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class BasicSearch extends React.Component {

     constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <div>
                <Select
                    multi
                    onChange={this.props.onSelectChange}
                    value={this.props.filterTags}
                    options={this.props.tagSuggestions}
                />
            </div>
        );
    }
}


BasicSearch.propTypes = {
    data: PropTypes.object,
    tagSuggestions: PropTypes.array.isRequired,
    onSelectChange: PropTypes.func.isRequired,
    filterTags: PropTypes.array.isRequired
};


export default BasicSearch;
