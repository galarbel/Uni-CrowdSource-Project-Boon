import React, {PropTypes} from "react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import SamplePic from '../../../resources/img/sample.jpg';
import Divider from 'material-ui/Divider';

class CatalogItem extends React.Component {

     constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <div>
              <Card>
                <CardHeader
                  title={this.props.data.item}
                  subtitle={this.props.data.area}
                />
                <CardMedia
                  overlay={<CardTitle title={this.props.data.item} subtitle={this.props.data.area} />}
                >
                  <img src={SamplePic} />
                </CardMedia>
                <CardTitle title={this.props.data.item} subtitle={this.props.data.name} />
                <CardText>
                  Item description - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
              </Card>
                <Divider/>
            </div>
        );
    }
}


CatalogItem.propTypes = {
    data: PropTypes.object
};


export default CatalogItem;
