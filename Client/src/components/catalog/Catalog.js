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

        this.state = {showAdvanced: false, items: [], loading: true};

        this.toggleAdvancesSearch = this.toggleAdvancesSearch.bind(this);
    }

    componentWillMount() {
         this.setState({loading: true});
         api.getCatalogItems().then(
             response => this.setState({items: response, loading: false})
         ).catch(
             e => {} //TODO
         );
    }

    toggleAdvancesSearch() {
         this.setState({showAdvanced: !this.state.showAdvanced});
    }

    render() {
         if (this.state.loading) {
             return (<LoadingProgress/>);
         }

         if (this.state.showAdvanced) {
             return (
                 <div>
                     <TextInput label="Name"/>
                     <TextInput label="Category"/>
                     <TextInput label="Area"/>
                     <BasicSearch/>
                     <Button style={{width: "100%", height: "30px"}} label="Search"  onClick={this.toggleAdvancesSearch}/>
                 </div>
             );
         }

        return (
            <div style={{paddingTop: 98}}>
                <div style={{ position: "fixed", top: 64, zIndex: 100,  width: "100%", background: "#fff" }}>
                    <div style={{border:"5px solid #ccc"}}>
                        <BasicSearch/>
                    </div>
                    <div style={{textAlign: "right", padding: 5}}><a onClick={this.toggleAdvancesSearch}>Advanced Search</a></div>
                </div>

                { this.state.items.length === 0 && <div>Currently there are no boons available</div>}

                {
                    this.state.items.map(
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
