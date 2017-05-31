import React, {PropTypes} from 'react';
import LoadingProgress from '../common/LoadingProgress';
import Mew from '../../../resources/img/mew.png';
import Divider from 'material-ui/Divider';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FontAwesome from "react-fontawesome";

const initState = {
    name: 'Mew (Pokémon)',
    category : 'Psychic-type',
    area : " Cinnabar Mansion",
    createdDate:"27-02-1996",
    description:'Mew (ミュウ? Myū) is one of the fictional species of creatures from Nintendos and Game Freaks Pokémon media franchise created by Satoshi Tajiri. Mew is a small, pink, Psychic-type Mythical Pokémon. It was added to Pokémon Red and Green by its creator, Game Freak programmer Shigeki Morimoto, as a secret character. As such, its presence has been surrounded by rumors and myths, which contributed to make the Pokémon franchise a success. For years, Mew could not be legitimately obtained in the games except from Pokémon distribution events.',
    phone: '2745382486',
    tags:['Red','Gold','Ruby','Diamond','Black','X']
};

const styles ={
    dividerRules:{
        marginTop:5,
        marginBottom:5
    }
};

class RequestDetails extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = Object.assign({},initState);

    }

    componentWillMount() {
        this.loadAjaxDetails();
    }


    loadAjaxDetails() {
    }

    thisIsHereToRemoveLintWarnings(code) {
        return () => this.select(code);
    }

    render() {
        const {name,category,area,createdDate,description,phone} = this.state;
        if (this.state.loading) {
            return (<LoadingProgress fullPage={false} size={100} style={{ textAlign: "center", margin: "30px"}}/>);
        }

        return (
            <div style={{margin:5,fontSize:14}}>
                <div>
                    <div>
                        <strong>{name}</strong>
                    </div>
                    <div style={{fontSize:'14px'}}>
                        {category}
                    </div>
                </div>
                <Divider style={styles.dividerRules}/>

                        <div><strong>Description:</strong></div>
                        <div>{description}</div>
                <Divider style={styles.dividerRules}/>
                <div>
                    <strong>Contact Information</strong>
                    <div>Phone: {phone}</div>
                    <div>Area: {area}</div>
                </div>
                <Divider style={styles.dividerRules}/>
                <div>Date Created: {createdDate}</div>
                <img src={Mew}/>
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

RequestDetails.propTypes = {
    requestNumber: PropTypes.string
};

export default RequestDetails;



