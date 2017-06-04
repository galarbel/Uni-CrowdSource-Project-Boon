import React, {PropTypes} from 'react';
import LoadingProgress from '../common/LoadingProgress';
import Button from "../common/Button";
import TextInput from "../common/TextInput";
import TextAreaInput from "../common/TextAreaInput";
import ChipInput from 'material-ui-chip-input';
import api from "../../api/Api";

//TODO force tags? force image?
class SubmitPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {loading: 0, tagSuggestionsArray: [], tagsArray: [], categories: [], areas: []};

        this.onAddNewTags = this.onAddNewTags.bind(this);
        this.onRemoveNewTag = this.onRemoveNewTag.bind(this);
        this.saveFileToState = this.saveFileToState.bind(this);
        this.submitItem = this.submitItem.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.loadCategories = this.loadCategories.bind(this);
        this.loadAreas = this.loadAreas.bind(this);
    }

    componentWillMount() {
        this.loadTagsSuggestions();
        this.loadCategories();
        this.loadAreas();
    }

    loadTagsSuggestions() {
        this.setState({ loading: this.state.loading + 1});
        api.getAllTags().then(
            response => this.setState({tagSuggestionsArray: response.suggestionTags, loading: this.state.loading - 1})
        ).catch(e => {
            //TODO
        });
    }

    loadCategories() {
        this.setState({ loading: this.state.loading + 1});
        api.getAllCategories().then(
            response => this.setState({categories: response, loading: this.state.loading - 1})
        ).catch(e => {
            //TODO
        });
    }

    loadAreas() {
        this.setState({ loading: this.state.loading + 1});
        api.getAllCities().then(
            response => this.setState({areas: response, loading: this.state.loading - 1})
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
        let foundErrors = false;
        if (!this.state.name || this.state.name === "") {
            this.setState({nameError: "Please enter name"}); foundErrors = true;
        }

        if (!this.state.category || this.state.category === "") {
            this.setState({categoryError: "Please select category"}); foundErrors = true;
        }

        if (!this.state.area || this.state.area === "") {
            this.setState({areaError: "Please select area"}); foundErrors = true;
        }
        if (foundErrors) {
            return;
        }


        const params = {
            image:      this.state.image,
            name:       this.state.name,
            category:   this.state.category,
            area:       this.state.area,
            desc:       this.state.desc || "",
            tags:       this.state.tagsArray.join(";")
        };

        api.submitNewItem(params).then(
            response => { } //TODO
        ).catch(e => {
            //TODO
        });
    }

    saveFileToState(event) {
        const file = event.target.files[0];
        this.setState({image: file});
    }

    handleInputChange(event) {
        const name = event.target.name;
        this.setState({[name] : event.target.value, [name + "Error"] : null});
    }

    render() {
        if (this.state.loading > 0) {
            return (<LoadingProgress />);
        }

        return (
            <div style={{margin:5,fontSize:14}}>
                <input type="file" accept="image/*" onChange={this.saveFileToState} />
                <TextInput label="Name"     onChange={this.handleInputChange} name="name"       error={this.state.nameError}/>
                <TextInput label="Category" onChange={this.handleInputChange} name="category"   error={this.state.categoryError}/>
                <TextInput label="Area"     onChange={this.handleInputChange} name="area"       error={this.state.areaError}/>
                <ChipInput value={this.state.tagsArray}
                           onRequestAdd={this.onAddNewTags}
                           onRequestDelete={this.onRemoveNewTags}
                           fullWidth
                           fullWidthInput
                           hintText="Add Tags"
                           dataSource={this.state.tagsSuggestions}
                />
                <TextAreaInput label="Description" name="desc"/>
                <Button style={{width: "100%", height: "30px"}} label="Submit"  onClick={this.submitItem}/>
                <br/>
            </div>
        );
    }
}

SubmitPage.propTypes = {

};

export default SubmitPage;



