import React, {PropTypes} from 'react';
import LoadingProgress from '../common/LoadingProgress';
import Button from "../common/Button";
import TextInput from "../common/TextInput";
import TextAreaInput from "../common/TextAreaInput";
import ChipInput from 'material-ui-chip-input';
import api from "../../api/Api";


class SubmitPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {loading: 0, tagSuggestionsArray: [], tagsArray: []};

        this.onAddNewTags = this.onAddNewTags.bind(this);
        this.onRemoveNewTag = this.onRemoveNewTag.bind(this);
    }

    componentWillMount() {
        this.loadTagsSuggestions();
    }

    loadTagsSuggestions() {
        this.setState({ loading: this.state.loading + 1});
        api.getTagsSuggestions().then(
            response => this.setState({tagSuggestionsArray: response.suggestionTags, loading: this.state.loading - 1})
        ).catch(e => {
            //TODO
        });
    }

    onAddNewTags(newTag) {
        let tagsArray = this.state.tagsArray;
        if (!tagsArray.find(x => x === newTag)) {
            tagsArray.push(newTag);
            this.setState({tagsArray});
        }
    }

    onRemoveNewTag(newTag,index) {
        const tagsArray = this.state.tagsArray;
        tagsArray.splice(index,1);
        this.setState({tagsArray});
    }

    submitItem() {

    }

    reportFalseItem() {

    }

    render() {
        if (this.state.loading > 0) {
            return (<LoadingProgress />);
        }

        return (
            <div style={{margin:5,fontSize:14}}>
                <input type="file" accept="image/*" />
                <TextInput label="Name" />
                <TextInput label="Category"/>
                <TextInput label="Area"/>
                <ChipInput value={this.state.tagsArray}
                           onRequestAdd={this.onAddNewTags}
                           onRequestDelete={this.onRemoveNewTags}
                           fullWidth
                           fullWidthInput
                           hintText="Add Tags"
                           dataSource={this.state.tagsSuggestions}
                />
                <TextAreaInput label="Description"/>
                <Button style={{width: "100%", height: "30px"}} label="Submit"  onClick={this.submitItem}/>
                <br/>
                <Button style={{width: "100%", height: "30px"}} label="Report" secondary onClick={this.reportFalseItem}/>
            </div>
        );
    }
}

SubmitPage.propTypes = {

};

export default SubmitPage;



