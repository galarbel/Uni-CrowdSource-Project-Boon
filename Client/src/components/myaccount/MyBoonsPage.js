import React, {PropTypes} from "react";
import Divider from 'material-ui/Divider';
import api from "../../api/Api";
import Item from './MyItemRow';

class MyDetailsPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {loading: 0};

        this.loadMyItems = this.loadMyItems.bind(this);
    }

    componentWillMount() {
        this.loadMyItems();
    }

    loadMyItems() {
        this.setState({loading: this.state.loading + 1});
        api.getUserItems().then(
            items => {
                this.setState({items, loading: this.state.loading - 1});
            }
        ).catch(e => {
            //TODO
        });
    }

    render() {
        return (
            <div style={{margin: "10px 16px"}}>
                <div style={{display:'flex', justifyContent: 'space-between', marginBottom: 10}}>
                    <h3>My Boons</h3>
                </div>
                <Divider/>
                {
                    !this.state.loading &&
                    <div>
                    {this.state.items.length === 0 && <div>Currently there are no boons available</div>}
                    {this.state.items.map((itemData,index)=> <Item data={itemData}  key={index}/>)}
                    </div>
                }
            </div>
        );
    }
}


export default MyDetailsPage;