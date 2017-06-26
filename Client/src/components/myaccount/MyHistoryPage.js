import React, {PropTypes} from "react";
import Divider from 'material-ui/Divider';
import api from "../../api/Api";
import Item from './MyHistoryItemRow';
import LoadingProgress from '../common/LoadingProgress';


class MyHistoryPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {loading: 0, ajaxError: null};

        this.loadMyHistory = this.loadMyHistory.bind(this);
    }

    componentWillMount() {
        this.loadMyHistory();
    }

    loadMyHistory() {
        this.setState({loading: this.state.loading + 1});
        api.getUserHistoryItems().then(
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
                <div style={{textAlign:"center", margin: "100px 0 0"}}>
                    <LoadingProgress fullPage={false} />
                </div>
            );
        }

        return (
            <div style={{margin: "10px 16px"}}>
                <div style={{marginBottom: 10}}>
                    <h3>My History</h3>
                </div>
                <Divider/>
                <br/>

                <div>
                    <h4>Boons I Received</h4>
                    <Divider/>
                    <div>
                        <br/>
                        {this.state.items.received.length === 0 && <div>You did not receive any boons yet. what are you waiting for?</div>}
                        {this.state.items.received.map((itemData,index)=> <Item data={itemData}  key={index}/>)}
                    </div>
                </div>

                <br/>

                <div>
                    <h4>Boons I Delivered</h4>
                    <Divider/>
                    <div>
                        <br/>
                        {this.state.items.delivered.length === 0 && <div>You did not deliver any boons yet.</div>}
                        {this.state.items.delivered.map((itemData,index)=> <Item data={itemData}  key={index}/>)}
                    </div>
                </div>

                {
                    this.state.ajaxError &&
                    <div><br/><br/><strong>Error occurred:</strong> {this.state.ajaxError}</div>
                }
            </div>
        );
    }
}


export default MyHistoryPage;
