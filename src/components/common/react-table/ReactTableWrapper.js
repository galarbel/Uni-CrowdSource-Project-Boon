import React, {Component, PropTypes} from "react";
import ReactTable from "react-table";
import FilterTextInput from "../FilterTextInput";
import "react-table/react-table.css";
import "./react-table.css";

import ExpanderComponent from "./ExpanderComponent";

class ReactTableWrapper extends Component {
    constructor(props, context) {
        super(props, context);

        const columnsWithFilter = this.props.columnsData.map(col => {
            if ("undefined" === typeof col.filterOn) {
                return Object.assign({}, col, {filterOn: true});
            } else {
                return col;
            }
        });

        this.state = {
            filteredData: this.props.originalData,
            columnsWithFilter: columnsWithFilter,
            filterText: null
        };

        this.onFilter = this.onFilter.bind(this);
        this.filter = this.filter.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({filteredData: nextProps.originalData});
        if (this.state.filterText) {
            this.filter(this.state.filterText);
        }
    }

    onFilter(event) {
        event.preventDefault();
        const filterText = event.target.value.toLowerCase();
        this.setState({filterText: filterText}); // keep filter text.
        this.filter(filterText);
    }

    filter(filterText) {
        const data = this.props.originalData;
        const keys = this.state.columnsWithFilter.map(col => {
            if (col.filterOn) {
                return col.id || col.accessor;
            } else {
                return "";
            }
        });

        const filteredData = data.filter(
            row => {
                let res = false;
                keys.forEach(
                    key => {
                        if (row[key] && row[key].toLowerCase().indexOf(filterText) !== -1) {
                            res = true;
                        }
                    }
                );
                return res;
            }
        );
        this.setState(Object.assign({}, {filteredData: filteredData, currentPage: 0}));
    }

    render() {
        return (
            <div>
                {this.props.showFilter &&
                <div style={{marginBottom: 5}}>
                    <FilterTextInput label="Filter" name="filter" showLabel={false} onChange={this.onFilter}
                                     placeholder={this.props.filterPlaceholder}/>
                </div>
                }

                <ReactTable className="-highlight"
                            data={this.state.filteredData}
                            columns={this.state.columnsWithFilter}
                            defaultPageSize={5}
                            minRows={2}
                            showPageJump={false}
                            nextText="Next ▶"
                            previousText="◀ Previous"
                            ExpanderComponent={ExpanderComponent}
                            {...this.props}
                />
            </div>
        );
    }
}

ReactTableWrapper.propTypes = {
    originalData: PropTypes.array.isRequired,
    columnsData: PropTypes.array.isRequired,
    showFilter: PropTypes.bool,
    filterPlaceholder: PropTypes.string
};
ReactTableWrapper.defaultProps = {
    showFilter: true,
    filterPlaceholder: "Filter as you type"
};

export default ReactTableWrapper;
