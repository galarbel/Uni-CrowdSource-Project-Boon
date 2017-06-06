import React, {PropTypes} from 'react';
import LoadingProgress from '../common/LoadingProgress';
import Divider from 'material-ui/Divider';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FontAwesome from "react-fontawesome";
import api from "../../api/Api";


class ProductDetailsPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = Object.assign({loading: 0});

    }

    componentWillMount() {
        this.loadAjaxDetails();
    }


    loadAjaxDetails() {
        this.setState({loading: this.state.loading + 1});
        api.getItemDetails({item_id : this.props.params.id}).then(
            response => this.setState({data: response, loading: this.state.loading - 1})
        ).catch(
            e => {
            } //TODO
        );
    }

    thisIsHereToRemoveLintWarnings(code) {
        return () => this.select(code);
    }

    render() {
        if (this.state.loading > 0) {
            return (<LoadingProgress/>);
        }

        const {title,category,city,date,description,phone, image} = this.state.data;
        return (
            <div style={{margin:5,fontSize:14}}>
                <div>
                    <div>
                        <strong>{title}</strong>
                    </div>
                    <div style={{fontSize:'14px'}}>
                        {category}
                    </div>
                </div>
                <Divider/>

                <div><strong>Description:</strong></div>
                <div>{description}</div>
                <Divider />
                <div>
                    <strong>Contact Information</strong>
                    <div>Phone: {phone}</div>
                    <div>Area: {city}</div>
                </div>
                <Divider/>
                <div>Date Created: {date}</div>
                <img src={"data:image/jpg;base64," + image} style={{width: 200}}/>
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem
                        label="Call"
                        icon={<FontAwesome name={"phone"} size="2x"/>}
                        onTouchTap={this.thisIsHereToRemoveLintWarnings(0)}
                    />
                    <BottomNavigationItem
                        label="Favorite"
                        icon={<FontAwesome name={"star"} size="2x"/>}
                        onTouchTap={this.thisIsHereToRemoveLintWarnings(1)}
                    />
                    <BottomNavigationItem
                        label="Report"
                        icon={<FontAwesome name={"flag"} size="2x"/>}
                        onTouchTap={this.thisIsHereToRemoveLintWarnings(2)}
                    />
                </BottomNavigation>
            </div>
        );
    }
}

ProductDetailsPage.propTypes = {
    params: PropTypes.object.isRequired
};

export default ProductDetailsPage;



