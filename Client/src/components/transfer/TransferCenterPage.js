import React, {PropTypes} from "react";
import Divider from 'material-ui/Divider';
import api from "../../api/Api";
import Item from './MyItemRow';
import LoadingProgress from '../common/LoadingProgress';


class TransferCenterPage extends React.Component {

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
        api.getPendingTransferApproval().then(
            items => {
                this.setState({items, loading: this.state.loading - 1});
            }
        ).catch(e => {
            this.setState({ajaxError: e.message, loading: this.state.loading -1});
        });
    }

    render() {
        if (this.state.loading > 0) {
            return (
                <LoadingProgress />
            );
        }

        return (
            <div style={{margin: "10px 16px"}}>
                <div style={{marginBottom: 10}}>
                    <h3>Boons Pending Approval</h3>
                </div>
                <Divider/>

                <div>
                    {this.state.items.length === 0 && <div>Currently there are no boons pending approval</div>}
                    {this.state.items.map((itemData,index)=> <Item data={itemData}  key={index}/>)}
                </div>

                {
                    this.state.ajaxError &&
                    <div><br/><br/><strong>Error occurred:</strong> {this.state.ajaxError}</div>
                }
            </div>
        );
    }
}


export default TransferCenterPage;
