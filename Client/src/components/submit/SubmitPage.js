import React, {PropTypes} from 'react';
import LoadingProgress from '../common/LoadingProgress';
import Button from "../common/Button";
import TextInput from "../common/TextInput";
import TextAreaInput from "../common/TextAreaInput";
import api from "../../api/Api";
import Select, {Creatable} from 'react-select';
import FontAwesome from "react-fontawesome";

//TODO force tags? force image?
class SubmitPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {loading: 0, tagSuggestionsArray: [], tagsArray: [], categories: [], areas: []};

        this.onChangeTags = this.onChangeTags.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeArea = this.onChangeArea.bind(this);
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
            tags => {
                const tagsForSelect = [];
                tags.map(tag => tagsForSelect.push({value: tag.id, label: tag.name}));
                this.setState({tagSuggestionsArray: tagsForSelect, loading: this.state.loading - 1});
            }
        ).catch(e => {
            //TODO
        });
    }

    loadCategories() {
        this.setState({ loading: this.state.loading + 1});
        api.getAllCategories().then(
            categories => {
                const categoriesForSelect = [];
                categories.map(item => categoriesForSelect.push({value: item.id, label: item.name}));
                this.setState({categories: categoriesForSelect, loading: this.state.loading - 1});
            }
        ).catch(e => {
            //TODO
        });
    }

    loadAreas() {
        this.setState({ loading: this.state.loading + 1});
        api.getAllCities().then(
            areas => {
                const areasForSelect = [];
                areas.map(item => areasForSelect.push({value: item.id, label: item.name}));
                this.setState({areas: areasForSelect, loading: this.state.loading - 1});
            }
        ).catch(e => {
            //TODO
        });
    }

    onChangeTags(tags) {
        this.setState({tagsArray: tags, submitError : null});
    }

    onChangeCategory(category) {
        this.setState({category: category.value, submitError : null});
    }

    onChangeArea(area) {
        this.setState({area: area.value, submitError : null});
    }

    submitItem() {
        this.setState({loading: this.state.loading + 1});
        let errorsFound = false;

        if (!this.state.image || this.state.image === "") {
            this.setState({submitError: "Please select image"}); errorsFound = true;
        }
        if (!this.state.area || this.state.area === "") {
            this.setState({submitError: "Please select area"}); errorsFound = true;
        }

        if (!this.state.category || this.state.category === "") {
            this.setState({submitError: "Please select category"}); errorsFound = true;
        }

        if (!this.state.name || this.state.name === "") {
            this.setState({submitError: "Please enter title"}); errorsFound = true;
        }

        if (errorsFound) {
            this.setState({loading: this.state.loading - 1});
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
            response => {
                this.setState({itemSent: true, loading: this.state.loading - 1});
            }
        ).catch(e => {
            //TODO
        });
    }

    saveFileToState(event) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            this.setState({image: file, filename: file.name});
        }
    }

    handleInputChange(event) {
        const name = event.target.name;
        this.setState({[name] : event.target.value, submitError : null});
    }

    reloadPage() {
        this.setState({image: null, name: null, category:null, area: null, desc: null, tagsArray: [], itemSent: false});
    }

    loadCatalog() {
        this.context.router.push("/catalog");
    }

    render() {
        if (this.state.loading > 0) {
            return (<LoadingProgress />);
        }

        if (this.state.itemSent) {
            return (
                <div style={{margin:5,fontSize:14}}>
                    <div style={{textAlign:"center"}}>
                        <h2>Add Item</h2>
                        <br/><br/><br/>
                        <div>
                            Item Added Successfully!
                        </div>
                        <br/><br/>
                        <div>
                            <Button onClick={this.reloadPage} label="Add Another Item" icon="plus-square" />
                            <Button onClick={this.loadCatalog} label="Browse Catalog" icon="database" />
                        </div>
                    </div>

                </div>);
        }

        return (
            <div style={{margin:16,fontSize:14}}>
                <div style={{textAlign:"center"}}>
                    <h2>Add Item</h2>
                </div>
                <br/>
                <TextInput label="" onChange={this.handleInputChange} name="name" placeholder="Add Title" />
                <br/>
                <Select
                    onChange={this.onChangeCategory}
                    value={this.state.category}
                    options={this.state.categories}
                    placeholder="Select Category"
                    clearable={false}
                />
                <br/>

                <Select
                    onChange={this.onChangeArea}
                    value={this.state.area}
                    options={this.state.areas}
                    placeholder="Select Area"
                    clearable={false}
                />
                <br/>

                <Creatable
                    multi
                    onChange={this.onChangeTags}
                    value={this.state.tagsArray}
                    options={this.state.tagSuggestionsArray}
                    placeholder="Add tags from list or add your own"
                />
                <br/>
                <input type="file" accept="image/*" onChange={this.saveFileToState} id="file-upload" style={{display: "none"}}/>
                <label htmlFor="file-upload">
                    <div className="btn" style={{whiteSpace: "nowrap", overflow: "auto", textOverflow: "ellipsis", maxWidth: "45vw", display: "inline-block"}}>
                        <FontAwesome name="picture-o" /> {this.state.filename || "Choose Image"}
                    </div>
                </label>
                <br/><br/>
                <TextAreaInput label="" name="desc" placeholder="Add Description"/>
                <br/>
                {
                    this.state.submitError &&
                    <div className="alert">{this.state.submitError}<br/><br/></div>

                }
                <Button style={{width: "100%", height: "30px"}} label="Submit"  onClick={this.submitItem} icon="check-square-o"/>
                <br/>
            </div>
        );
    }
}

SubmitPage.propTypes = {

};

SubmitPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default SubmitPage;



