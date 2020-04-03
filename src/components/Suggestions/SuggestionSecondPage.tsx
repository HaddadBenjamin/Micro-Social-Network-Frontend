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
    MDBBtn,
    MDBListGroup
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
    addComment,
    addVote,
    createSuggestion,
    deleteComment,
    deletedComment,
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
    const [createSuggestionCommentContent, setCreateSuggestionCommentContent] = useState<string>('');

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

    const createNewSuggestionComment = (suggestionId : string) =>
    {
        dispatch(addComment(suggestionId, createSuggestionCommentContent));
    };

    function onChangeCreateSuggestionContent(event: ChangeEvent<HTMLInputElement>): void
    {
        setCreateSuggestionContent(event.target.value);
    }

    function onChangeCreateSuggestionCommentContent(event: ChangeEvent<HTMLInputElement>): void
    {
        setCreateSuggestionCommentContent(event.target.value);
    }

    function onClickOnCreateSuggestion(event: any): void
    {
        setFirstLoad(false);
        createNewSuggestion();
        setCreateSuggestionContent('');
        toast.info('Creating your suggestion...')
    }

    function onClickOnCreateSuggestionComment(suggestionId : string): void
    {
        setFirstLoad(false);
        createNewSuggestionComment(suggestionId);
        setCreateSuggestionCommentContent('');
        toast.info('Creating your comment...')
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

    function onClickOnDeleteSuggestionButton() : void
    {
        dispatch(deleteSuggestion(selectedSuggestion.Id));
    }

    function onClickOnCommentButton(suggestion : ISuggestionItem) : void
    {
        setSelectedSuggestion(suggestion);
        toggleCommentModal();
    }

    function onDeleteComment(commentId : string, suggestionId : string)
    {
        dispatch(deleteComment(commentId, suggestionId));
    }

    function getCommentsAsListItems(comments : ISuggestionCommentItem[])
    {
        return map(comments, function(comment : ISuggestionCommentItem)
        {
            const isMyComment = comment.Ip === userIp;
            const deleteCommentButton = isMyComment ? <i
                className="fas fa-trash-alt remove-suggestion-comment-button"
                onClick={() => onDeleteComment(comment.Id, selectedSuggestion.Id)}></i> : <></>;
            return <>

                <MDBListGroupItem key={comment.Id} className="comment-modal-content">{deleteCommentButton} {comment.Comment}</MDBListGroupItem>
            </>
        })
    }

    function addSuggestionCommentComponent()
    {
        return (
            <>
                <input onChange={onChangeCreateSuggestionCommentContent}
                       type="text"
                       value={createSuggestionCommentContent}
                       className=" create-suggestion-comment text-left flex-fill bd-highlight"
                       placeholder="Enter your comment"/>
                <i onClick={() => onClickOnCreateSuggestionComment(selectedSuggestion.Id)}
                   className="create-suggestion-comment-button center fa-2x right ">[+]</i>
            </>);
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
        const deleteButton = isMySuggestion ? <i className="fas fa-trash-alt remove-suggestion-button" onClick={() => onClickOnDeleteSuggestionButton()}></i>: <></>;
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
                    <MDBModal className="show-comments-modal" isOpen={commentModalIsOpen} toggle={(toggleCommentModal)} size="lg">
                        <MDBModalHeader toggle={toggleCommentModal}>{selectedSuggestion.Content}</MDBModalHeader>
                        <MDBModalBody>
                            <MDBListGroup>
                                {getCommentsAsListItems(selectedSuggestion.Comments)}
                            </MDBListGroup>
                            <MDBRow className="create-suggestion-comment-container d-flex bd-highlight">
                                {addSuggestionCommentComponent()}
                            </MDBRow>
                        </MDBModalBody>
                    </MDBModal>
                </MDBView>
            </div>
        </>
    );
}

export default SuggestionSecondPage;