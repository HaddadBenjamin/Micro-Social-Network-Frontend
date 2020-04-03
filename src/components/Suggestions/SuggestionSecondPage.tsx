import {
    MDBContainer,
    MDBListGroupItem,
    MDBView,
    MDBMask,
    MDBRow,
    MDBCol,
    MDBDataTable,
    MDBAlert,
    MDBModalBody,
    MDBModalHeader,
    MDBModal,
    MDBModalFooter,
    MDBBtn
} from "mdbreact";
import React, {
    ChangeEvent,
    useEffect,
    useState
} from "react";
import { toast, ToastContainer } from 'react-toastify';
import './SuggestionSecondPage.css'
import '../Items/ItemSecondPage.css'
import '../../shared/css/tabulation.css'
import '../../shared/css/dataTable.css'
import '../../shared/css/view.css'
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    addVote,
    createSuggestion,
    deleteSuggestion,
    getAllSuggestions
} from "../../actions/suggestion.action";
import {IGlobalState} from "../../reducers";
import ApiStatus from "../../models/ApiStatus";
import ISuggestionItem, {
    ISuggestionCommentItem,
    ISuggestionVoteItem
} from "../../models/Suggestion";
import 'react-toastify/dist/ReactToastify.css';
import {map, orderBy, some} from 'lodash';
import {useToggle} from 'react-use';

const SuggestionSecondPage = () =>
{
    const [commentModalIsOpen, toggleCommentModal] = useToggle(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState<ISuggestionItem>( { Content : '', Comments : [], Votes : [], NegativeVoteCount : 0, PositiveVoteCount : 0, Id : '', Ip :''});
    const [firstLoad, setFirstLoad] = useState<boolean>(true);

    const [createSuggestionContent, setCreateSuggestionContent] = useState<string>('');
    const creatingSuggestionStatus = useSelector<IGlobalState, ApiStatus>(state => state.suggestions.creatingASuggestionStatus);

    const gettingAllSuggestionStatus = useSelector<IGlobalState, ApiStatus>(state => state.suggestions.gettingAllSuggestionsStatus);
    const suggestions = useSelector<IGlobalState, ISuggestionItem[]>(state => state.suggestions.suggestions);

    const userIp = useSelector<IGlobalState, string>(state => state.user.ip);

    const dispatch = useDispatch();

    useEffect(() =>
    {
        // équivalent à la fonction componentDidMount
        dispatch(getAllSuggestions());
    }, []);

    useEffect(()=>
    {
        if (creatingSuggestionStatus === ApiStatus.LOADED && !firstLoad)
            toast.success('Your suggestion have been created');

        if (creatingSuggestionStatus === ApiStatus.FAILED)
            toast.error('The creation of your suggestion have failed');

    }, [creatingSuggestionStatus, firstLoad]);

    //region relative to create a new suggestion component
    const createNewSuggestion = () =>
    {
        dispatch(createSuggestion(createSuggestionContent));
    };

    function onChangeCreateSuggestionContent(event: ChangeEvent<HTMLInputElement>): void
    {
        setCreateSuggestionContent(event.target.value);
    }

    function onClickOnCreateSuggestion(event: any): void
    {
        setFirstLoad(false);
        createNewSuggestion();
        setCreateSuggestionContent('');
        toast.info('Creating your suggestion...')
    }

    function addSuggestionComponent()
    {
        if (gettingAllSuggestionStatus === ApiStatus.LOADED)
        return (
            <>
                <input onChange={onChangeCreateSuggestionContent}
                       type="text"
                       value={createSuggestionContent}
                       className=" create-suggestion text-left flex-fill bd-highlight"
                       placeholder="Enter your suggestion"/>
                <i onClick={onClickOnCreateSuggestion}
                   className="create-suggestion-button center fa-2x right ">[+]</i>
            </>);
    }
    //endregion

    function onClickOnPositiveVote(suggestion : ISuggestionItem) : void
    {
        const voteRequest = createVoteRequest(suggestion, true);

        dispatch(addVote(voteRequest));
    }

    function onClickOnNegativeVote(suggestion : ISuggestionItem) : void
    {
        const voteRequest = createVoteRequest(suggestion, false);

        dispatch(addVote(voteRequest));
    }

    function createVoteRequest(suggestion : ISuggestionItem, isPositive : boolean)
    {
        return {
            SuggestionId : suggestion.Id,
            IsPositive : isPositive,
            Ip : userIp
        };
    }

    function onClickOnDeleteSuggestionButton(suggestionId : string) : void
    {
        dispatch(deleteSuggestion(suggestionId));
    }

    function onClickOnCommentButton(suggestion : ISuggestionItem) : void
    {
        setSelectedSuggestion(suggestion);
        toggleCommentModal();
    }

    //region create item data table
    function getItemDataTable(): any
    {
        return {
            columns: getItemDataTableColumns(),
            rows: getItemDataTableRows()
        };
    }

    function getItemDataTableColumns(): any
    {
        return [
            {
                label: 'Content',
                field: 'Content',
                sort: 'disabled'
            },
            {
                label: 'Rate',
                field: 'Rate',
                sort: 'disabled',
            },
            {
                label: 'Comments',
                field: 'CommentsCount',
                sort: 'disabled',
            },
            {
                label: '',
                field: 'VotePositively',
                sort: 'disabled'
            },
            {
                label: '',
                field: 'VoteNegatively',
                sort: 'disabled'
            },
            {
                label: '',
                field: 'DeleteMySuggestionButton',
                sort: 'disabled'
            },
            {
                label: '',
                field: 'Comments',
                sort: 'disabled'
            }
        ];
    }

    function getItemDataTableRows(): any
    {
        const orderedSuggestions = orderBy(suggestions, function(suggestion : ISuggestionItem)
        {
            return -(suggestion.PositiveVoteCount - suggestion.NegativeVoteCount);
        });
        return map(orderedSuggestions, toSuggestionDataTableRow);
    }

    function toSuggestionDataTableRow(suggestion: ISuggestionItem)
    {
        const voteValue: number = suggestion.PositiveVoteCount - suggestion.NegativeVoteCount;
        const voteClass: string =
            voteValue === 0 ? "default-vote" :
                voteValue < 0 ? "negative-vote" :
                    "positive-vote";
        const rateClass = `suggestion ${voteClass}`;

        const commentCount = suggestion.Comments.length;
        const commentCountClass = `suggestion-comment-count ${commentCount > 0 ? "positive-comment-count" : ""}`;
        const iCommentedThisSuggestion = some(suggestion.Comments, function(comment : ISuggestionCommentItem) { return comment.Ip === userIp});
        const commentClass = `fas fa-comments comment-suggestion-button ${iCommentedThisSuggestion ? "fa-lg" : ""}`;

        const isMySuggestion : boolean = suggestion.Ip === userIp;
        const contentClass : string = `suggestion d-flex justify-content-between align-items-center ${isMySuggestion ? "my-suggestion" : ""}`;

        const iVotedPositively : boolean = some(suggestion.Votes, function(vote : ISuggestionVoteItem) { return vote.Ip === userIp && vote.IsPositive });
        const iVotedNegatively: boolean = some(suggestion.Votes, function(vote : ISuggestionVoteItem) { return vote.Ip === userIp && !vote.IsPositive });
        const votePositivelyClass : string = `fas fa-thumbs-up thumbs-up ${iVotedPositively ? "fa-lg" : ""}`;
        const voteNegativelyClass : string = `fas fa-thumbs-down thumbs-down ${iVotedNegatively ? "fa-lg" : ""}`;

        const content = <MDBListGroupItem className={contentClass}>{suggestion.Content}</MDBListGroupItem>;
        const rate = <p className={rateClass}>{voteValue}</p>;
        const votePositively = <i className={votePositivelyClass} onClick={() => onClickOnPositiveVote(suggestion)}></i>;
        const voteNegatively = <i className={voteNegativelyClass} onClick={() => onClickOnNegativeVote(suggestion)}></i>;
        const deleteButton = isMySuggestion ? <i className="fas fa-trash-alt remove-suggestion-button" onClick={() => onClickOnDeleteSuggestionButton(suggestion.Id)}></i>: <></>;
        const comments = <i className={commentClass} onClick={() => onClickOnCommentButton(suggestion)}></i>;
        const commentsCount = <p className={commentCountClass}>{commentCount}</p>;

        return {
            'Content': content,
            'Rate': rate,
            'CommentsCount' : commentsCount,
            'VotePositively': votePositively,
            'VoteNegatively': voteNegatively,
            'Comments' : comments,
            'DeleteMySuggestionButton' : deleteButton,
        };
    }
    //endregion

    return (
        <>
            <div id="item-filter-view">
                <MDBView>
                    <MDBMask className="d-flex justify-content-center align-items-center gradient">
                        <ToastContainer />
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol>
                                    {gettingAllSuggestionStatus === ApiStatus.FAILED &&
                                    <MDBAlert color="danger">Failed to load the suggestions.</MDBAlert>}
                                    {gettingAllSuggestionStatus === ApiStatus.LOADING &&
                                    <MDBAlert color="primary">Loading all the suggestions...</MDBAlert>}
                                    {gettingAllSuggestionStatus === ApiStatus.LOADED &&
                                    <MDBDataTable data={getItemDataTable()} entries={5}/>}
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="create-suggestion-container d-flex bd-highlight">
                                {addSuggestionComponent()}
                            </MDBRow>
                        </MDBContainer>
                    </MDBMask>
                    <MDBModal isOpen={commentModalIsOpen} toggle={(toggleCommentModal)} size="lg">
                        <MDBModalHeader toggle={toggleCommentModal}>{selectedSuggestion.Content}</MDBModalHeader>
                        <MDBModalBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat.
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={toggleCommentModal}>Close</MDBBtn>
                            <MDBBtn color="primary">Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBView>
            </div>
        </>
    );
}

export default SuggestionSecondPage;