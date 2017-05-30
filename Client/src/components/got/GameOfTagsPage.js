import React, {PropTypes} from 'react';
import LoadingProgress from '../common/LoadingProgress';
import Type1 from "./Type1";
import Type2 from "./Type2";
import api from "../../api/Api";


const initState = {
    loading: 0,
    question: null,
    tagsArray:[],
    tagSuggestionsArray: []
};

class GameOfTagsPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = Object.assign({},initState);
        this.loadQuestion = this.loadQuestion.bind(this);
        this.loadTagsSuggestions = this.loadTagsSuggestions.bind(this);
        this.onSelectAnswer = this.onSelectAnswer.bind(this);
        this.onSendNewTags = this.onSendNewTags.bind(this);
        this.onAddNewTags = this.onAddNewTags.bind(this);
        this.onRemoveNewTag = this.onRemoveNewTag.bind(this);
    }

    componentWillMount() {
        this.loadTagsSuggestions();
        this.loadQuestion();
    }

    loadTagsSuggestions() {
        this.setState({ loading: this.state.loading + 1});
        api.getTagsSuggestions().then(
            response => this.setState({tagSuggestionsArray: response.suggestionTags, loading: this.state.loading - 1})
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

    onSelectAnswer(answerType) {
        const question = this.state.question;

        const params = {
            itemId : question.itemId,
            tag: question.tag,
            answer: answerType
        };

        this.setState({loading: this.state.loading + 1});

        api.answerGameOfTagsType1(params).then(
            response => {
                //TODO - add success toastr / snackbox
                this.setState({question: response, loading: this.state.loading - 1, tagsArray: []});
            }
        ).catch(e => {
            //TODO
        });
    }

    onSendNewTags(tagsArray) {
        const question = this.state.question;

        const params = {
            itemId : question.itemId,
            newTags: this.state.tagsArray.join("~|~")
        };

        this.setState({loading: this.state.loading + 1});
        api.answerGameOfTagsType2(params).then(
            response => {
                //TODO - add success toastr / snackbox
                this.setState({question: response, loading: this.state.loading - 1});
            }
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

                <div style={{padding: "60px 30px"}}>
                    <div style={{display: "flex"}}>
                        <div style={{maxWidth: "40vw"}}>
                        <img src={"data:image/png;base64," + question.image} style={{display: "block", width: "100%", height: "auto"}}/>
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
                               onAddNewTags={this.onAddNewTags}
                               onRemoveNewTags={this.onRemoveNewTag}
                               tagsSuggestions={this.state.tagSuggestionsArray}
                    />
                    }
                </div>
            </div>
        );
    }
}

GameOfTagsPage.propTypes = {
};

export default GameOfTagsPage;



