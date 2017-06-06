import React, {PropTypes} from "react";
import CatalogItem from './ItemDetails';
import TextInput from "../common/TextInput";
import Button from "../common/Button";
import BasicSearch from './BasicSearch';
import api from "../../api/Api";
import LoadingProgress from '../common/LoadingProgress';


class CatalogPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {showAdvanced: false, items: [], loading: 0, tagSuggestions: [], filterTags: []};

        this.toggleAdvancesSearch = this.toggleAdvancesSearch.bind(this);
        this.prepareTagsForSelect = this.prepareTagsForSelect.bind(this);
        this.handleFilterTagsSelectChange = this.handleFilterTagsSelectChange.bind(this);
        this.filterCatalogItems = this.filterCatalogItems.bind(this);
    }

    componentWillMount() {
        this.setState({loading: this.state.loading + 2});
        api.getCatalogItems().then(
            response => this.setState({items: response, loading: this.state.loading - 1})
        ).catch(
            e => {
            } //TODO
        );

        api.getAllTags().then(
            response => {this.setState({loading: this.state.loading -1}); this.prepareTagsForSelect(response); }
        ).catch(
            e => {
            } //TODO
        );
    }

    prepareTagsForSelect(tags) {
        const tagsForSelect = [];
        tags.map(tag => tagsForSelect.push({value: tag.id, label: tag.name}));
        this.setState({tagSuggestions: tagsForSelect});
    }

    handleFilterTagsSelectChange(values) {
        this.setState({filterTags: values});
    }

    filterCatalogItems(item) {
        const filterTags = this.state.filterTags;
        for (let i = 0; i < filterTags.length; i++) {
            if (!item.tags || item.tags.indexOf(filterTags[i].label) === -1) {
                return false;
            }
        }
        return true;
    }

    toggleAdvancesSearch() {
        this.setState({showAdvanced: !this.state.showAdvanced});
    }

    render() {
        if (this.state.loading > 0) {
            return (<LoadingProgress/>);
        }

        if (this.state.showAdvanced) {
            return (
                <div>
                    <TextInput label="Name"/>
                    <TextInput label="Category"/>
                    <TextInput label="Area"/>
                    <BasicSearch tagSuggestions={this.state.tagSuggestions} onSelectChange={this.handleFilterTagsSelectChange} filterTags={this.state.filterTags}/>
                    <Button style={{width: "100%", height: "30px"}} label="Search"  onClick={this.toggleAdvancesSearch}/>
                </div>
            );
        }

        return (
            <div style={{paddingTop: 98}}>
                <div style={{ position: "fixed", top: 64, zIndex: 100,  width: "100%", background: "#fff" }}>
                    <div style={{border:"5px solid #ccc"}}>
                        <BasicSearch tagSuggestions={this.state.tagSuggestions} onSelectChange={this.handleFilterTagsSelectChange} filterTags={this.state.filterTags}/>
                    </div>
                    <div style={{textAlign: "right", padding: 5}}><a onClick={this.toggleAdvancesSearch}>Advanced Search</a></div>
                </div>

                { this.state.items.length === 0 && <div>Currently there are no boons available</div>}

                {
                    this.state.items.filter(this.filterCatalogItems).map(
                        (itemData,index)=> <CatalogItem data={itemData}  key={index}/>
                    )
                }
            </div>
        );
    }
}


CatalogPage.propTypes = {
};


export default CatalogPage;
