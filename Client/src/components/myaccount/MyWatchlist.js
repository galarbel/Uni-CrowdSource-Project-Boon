import React, {PropTypes} from "react";
import LoadingProgress from '../common/LoadingProgress';
import Button from "../common/Button";
import FontAwesome from "react-fontawesome";
import DialogWrapper from "../common/DialogWrapper";
import api from "../../api/Api";
import { Creatable } from 'react-select';

class MyWatchlist extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: 0,
            editDetailsError: null,
            watchlist: [],
            addEditDialogOpen: false,
            deleteDialogOpen: false,
            selectFocus: false,
            tagsSuggestions: [],
            dialogTagsArray: [],
            dialogLoading: false,
            dialogError: "",
            watchlistIndex: -1,
            dialogAction: ""
        };

        this.getMyWatchlist = this.getMyWatchlist.bind(this);
        this.toggleAddEditDialogOpen = this.toggleAddEditDialogOpen.bind(this);
        this.toggleDeleteDialogOpen = this.toggleDeleteDialogOpen.bind(this);
        this.onChangeTags = this.onChangeTags.bind(this);
        this.getTagSuggestions = this.getTagSuggestions.bind(this);
        this.prepareTagsForSelect = this.prepareTagsForSelect.bind(this);
        this.dialogSelectFocusBlur = this.dialogSelectFocusBlur.bind(this);
        this.bindWatchlistDeleteActions = this.bindWatchlistDeleteActions.bind(this);
        this.deleteWatchlist = this.deleteWatchlist.bind(this);
        this.openAddDialog = this.openAddDialog.bind(this);
        this.performDialogAction = this.performDialogAction.bind(this);
    }

    componentWillMount() {
        this.getMyWatchlist();
        this.getTagSuggestions();
    }

    getMyWatchlist() {
        this.setState({loading: this.state.loading + 1});
        api.getWatchList().then(
            response => {
                this.setState({watchlist: response, loading: this.state.loading - 1});
            }
        ).catch(e => {
            //todo
        });
    }

    getTagSuggestions() {
        this.setState({loading: this.state.loading + 1});
        api.getAllTags().then(
            response => {this.setState({loading: this.state.loading -1}); this.prepareTagsForSelect(response); }
        ).catch(
            e => {
            } //TODO
        );
    }

    prepareTagsForSelect(tags) {
        const tagsForSelect = [];
        tags.map(tag => tagsForSelect.push({value: tag.id, label: tag.name}));
        this.setState({tagsSuggestions: tagsForSelect});
    }

    openAddDialog() {
        this.toggleAddEditDialogOpen("ADD");
    }

    toggleAddEditDialogOpen(action) {
        action = action ? action : "";
        this.setState({addEditDialogOpen: !this.state.addEditDialogOpen, dialogTagsArray: [], dialogAction: action});
    }

    toggleDeleteDialogOpen() {
        this.setState({deleteDialogOpen: !this.state.deleteDialogOpen});
    }

    onChangeTags(tags) {
        this.setState({dialogTagsArray: tags});
    }

    dialogSelectFocusBlur() {
        this.setState({selectFocus: !this.state.selectFocus});
    }

    performDialogAction() {
        this.setState({dialogLoading: true});

        const requestParams = {
            tags: this.state.dialogTagsArray.map(tag => tag.label).join(";"),
        };

        let apiFunction = api.submitWatchlist;
        if (this.state.dialogAction === "EDIT") {
            apiFunction = api.editWatchlist;
            requestParams.wishlistId = this.state.watchlist[this.state.watchlistIndex].wish_id;
        }

        apiFunction(requestParams).then(
            response => {
                if (this.state.dialogAction === "ADD") {
                    this.state.watchlist.push(response);
                } else {
                    const watchlist = this.state.watchlist.slice(); //to copy...
                    watchlist[this.state.watchlistIndex] = response;
                    this.setState({watchlist});
                }
                this.setState({dialogLoading: false, addEditDialogOpen: false, dialogTagsArray: []});
            }
        ).catch(
            e => {
                //todo
            }
        );
    }

    deleteWatchlist() {
        this.setState({dialogLoading: true});
        const requestParams = {
            wishlistId: this.state.watchlist[this.state.watchlistIndex].wish_id
        };
        api.deleteWatchlist(requestParams).then(
            response => {
                this.state.watchlist.splice(this.state.watchlistIndex,1);
                this.setState({dialogLoading: false, deleteDialogOpen: false, watchlistIndex: -1});
            }
        ).catch(
            e => {
                //todo
            }
        );
    }

    bindWatchlistDeleteActions(index) {
        return () => {this.setState({deleteDialogOpen: true, watchlistIndex: index});};
    }

    bindWatchlistEditActions(index) {
        return () => {this.setState({addEditDialogOpen: true, watchlistIndex: index, dialogAction : "EDIT"});};
    }


    render() {
        if (this.state.loading > 0 ) {
            return (
                <div style={{textAlign:"center", margin: "50px 20px 0 0"}}>
                    <LoadingProgress fullPage={false}  size={90} thickness={4}/>
                </div>
            );
        }

        return (
            <div>
                {
                    this.state.watchlist.length === 0 &&
                    <div>
                        <div>No watchlist added yet</div>
                    </div>
                }

                {
                    this.state.watchlist.length >= 1 &&
                    <table style={{width: "100%"}}>
                    <tbody>
                    {
                        this.state.watchlist && this.state.watchlist.map((watchlist,index) => (<tr key={index}>
                            <td>#{index+1}</td>
                            <td style={{width: "98%"}}>{watchlist.tags || "none... error?"}</td>
                            <td style={{whiteSpace: "nowrap"}}>
                                <span onClick={this.bindWatchlistEditActions(index)}><FontAwesome name="pencil" size="lg" className="watchlist-icons"/></span>
                                &nbsp;&nbsp;
                                <span onClick={this.bindWatchlistDeleteActions(index)}><FontAwesome name="trash" size="lg" className="watchlist-icons"/></span>
                            </td>
                        </tr>))
                    }
                    </tbody>
                    </table>
                }

                <br/>
                <div>
                    <Button onClick={this.openAddDialog} icon="plus" label="Add new watchlist" />
                </div>

                <DialogWrapper
                    open={this.state.addEditDialogOpen}
                    title={this.state.dialogAction + " WATCHLIST"}
                    actions={[
                        <Button key="1" label="Submit" onClick={this.performDialogAction} disabled={this.state.dialogLoading}/>,
                        <Button key="2" label="Cancel" onClick={this.toggleAddEditDialogOpen} disabled={this.state.dialogLoading}/>,
                        <LoadingProgress key="3"
                                         fullPage={false} thickness={2} size={21}
                                         style={{
                                             position: "relative", top: -3, left: 10,
                                             display: this.state.dialogLoading ?  "inline-block" : "none"
                                         }}/>
                    ]}
                    isKeyboardOpen={this.state.selectFocus}
                >
                    <br/>
                    <div>Add new watchlist</div>
                    <Creatable
                        multi
                        onChange={this.onChangeTags}
                        value={this.state.dialogTagsArray}
                        options={this.state.tagsSuggestions}
                        onFocus={this.dialogSelectFocusBlur}
                        onBlur={this.dialogSelectFocusBlur}
                        autoBlur={false} //might want this... will have to see on mobile
                        menuStyle={{height: 150}}
                        placeholder="Add tags from list or add your own"
                    />
                    <div className="alert" style={{marginTop: 6}}>{this.state.dialogError}</div>

                    {this.state.selectFocus && <div style={{height: "160px"}}/>}
                </DialogWrapper>

                <DialogWrapper
                    open={this.state.deleteDialogOpen}
                    title="DELETE WATCHLIST"
                    actions={[
                        <Button key="1" label="Submit" onClick={this.deleteWatchlist} disabled={this.state.dialogLoading}/>,
                        <Button key="2" label="Cancel" onClick={this.toggleDeleteDialogOpen} disabled={this.state.dialogLoading}/>,
                        <LoadingProgress key="3"
                                         fullPage={false} thickness={2} size={21}
                                         style={{
                                             position: "relative", top: -3, left: 10,
                                             display: this.state.dialogLoading ?  "inline-block" : "none"
                                         }}/>
                    ]}
                >
                    <br/>
                    <div>Are you sure you want to delete the watchlist:</div>
                    {
                        this.state.watchlistIndex !== -1 &&
                        <div>{this.state.watchlist[this.state.watchlistIndex].tags}</div>
                    }

                    <div className="alert" style={{marginTop: 6}}>{this.state.dialogError}</div>

                    {this.state.selectFocus && <div style={{height: "160px"}}/>}
                </DialogWrapper>

            </div>
        );
    }
}


MyWatchlist.propTypes = {

};


export default MyWatchlist;
