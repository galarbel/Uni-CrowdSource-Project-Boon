import React, {PropTypes} from 'react';
import LoadingProgress from '../common/LoadingProgress';
import Type1 from "./Type1";
import Type2 from "./Type2";
import api from "../../api/Api";
import Lightbox from 'react-image-lightbox';


const initState = {
    loading: 0,
    question: null,
    tagsArray:[],
    tagSuggestionsArray: [],
    isLightboxOpen: false
};

class GameOfTagsPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = Object.assign({},initState);
        this.loadQuestion = this.loadQuestion.bind(this);
        this.loadTagsSuggestions = this.loadTagsSuggestions.bind(this);
        this.onSelectAnswer = this.onSelectAnswer.bind(this);
        this.onSendNewTags = this.onSendNewTags.bind(this);
        this.answerGameOfTags = this.answerGameOfTags.bind(this);
        this.toggleLightbox = this.toggleLightbox.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.onChangeTags = this.onChangeTags.bind(this);
    }

    componentWillMount() {
        this.loadTagsSuggestions();
        this.loadQuestion();
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

    loadQuestion() {
        this.setState({ loading: this.state.loading + 1});
        api.getGameOfTagsQuestion().then(
            response => this.setState({question: response, loading: this.state.loading - 1, tagsArray: []})
        ).catch(e => {
            //TODO
        });
    }

    answerGameOfTags(params) {
        this.setState({loading: this.state.loading + 1});
        api.answerGameOfTags(params).then(
            response => {
                //TODO - add success toastr / snackbox
                this.setState({loading: this.state.loading - 1, tagsArray: [], question: null});
                this.loadQuestion();
            }
        ).catch(e => {
            //TODO
        });
    }

    onSelectAnswer(answerType) {
        const question = this.state.question;

        const params = {
            type: 1,
            tag: question.tag,
            itemTagId: question.itemTagId,
            isCorrect: answerType
        };

        this.answerGameOfTags(params);
    }

    onSendNewTags(tagsArray) {
        const question = this.state.question;
        const params = {
            type: 2,
            itemId : question.id,
            tags: this.state.tagsArray.map(tag => tag.label).join(";")
        };
        this.answerGameOfTags(params);
    }

    onChangeTags(tags) {
        this.setState({tagsArray: tags});
    }

    toggleLightbox(e) {
        e.preventDefault();
        this.setState({isLightboxOpen: !this.state.isLightboxOpen});
    }

    closeLightbox() { //this is here cause lightbox doesn't use e.preventDefault
        this.setState({isLightboxOpen: !this.state.isLightboxOpen});
    }


    render() {
        const question = this.state.question;
        if (this.state.loading > 0 || !question) {
            return (<LoadingProgress />);
        }

        return (
            <div>
                <div style={{textAlign:"center", paddingTop: 20}}>
                    <h2>Game Of Tags!</h2>
                </div>

                <div style={{padding: "30px 20px"}}>
                    <div style={{display: "flex"}}>
                        <div onClick={this.toggleLightbox}>
                            <img src={"data:image/png;base64," + question.image} style={{display: "block", maxWidth: "35vw", maxHeight: "40vh"}}/>
                        </div>
                        <div style={{paddingLeft: 20}}>
                            <div><strong>Description:</strong></div>
                            <div>{question.description}</div>
                        </div>
                    </div>
                </div>

                <div style={{textAlign: "center"}}>
                    { question.type === 1 && <Type1 tag={question.tag_name} onSelectAnswer={this.onSelectAnswer}/>}
                </div>

                <div style={{textAlign: "center"}}>
                    {
                        question.type === 2 &&
                        <Type2 sendAction={this.onSendNewTags}
                               cancelAction={this.loadQuestion}
                               tagsArray={this.state.tagsArray}
                               tagsSuggestions={this.state.tagSuggestionsArray}
                               onChangeTags={this.onChangeTags}
                        />
                    }
                </div>

                {
                    this.state.isLightboxOpen &&
                    <Lightbox
                        mainSrc={"data:image/jpg;base64," + question.image}
                        onCloseRequest={this.closeLightbox}
                    />
                }

            </div>
        );
    }
}

GameOfTagsPage.propTypes = {

};

export default GameOfTagsPage;



