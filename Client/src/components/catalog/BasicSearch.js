import React, {PropTypes} from "react";
import Select from 'react-select';


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
                    placeholder="Filter by tags"
                    menuStyle={{height: 150}}
                    autoBlur
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
