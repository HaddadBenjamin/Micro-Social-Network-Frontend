import {
    MDBContainer,
    MDBListGroupItem,
    MDBView,
    MDBMask,
    MDBRow,
    MDBCol,
    MDBDataTable,
    MDBModalBody,
    MDBModalHeader,
    MDBModal,
    MDBListGroup
} from "mdbreact";
import React, {
    ChangeEvent,
    useEffect,
    useState
} from "react";
import { toast } from 'react-toastify';
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
    deleteSuggestion,
    getAllSuggestions
} from "../../actions/suggestion.action";
import {IGlobalState} from "../../reducers";
import ApiStatus from "../../shared/models/ApiStatus";
import ISuggestion, {
    emptySuggestion,
    ISuggestionComment,
    ISuggestionVote, ISuggestionVoteRequest
} from "../../models/Suggestion";
import 'react-toastify/dist/ReactToastify.css';
import {map, orderBy, some, findIndex } from 'lodash';
import {useToggle} from 'react-use';
import Loader from "../../shared/components/Loader";
import '../../shared/css/toastify.css'
import HalLinks from "../../shared/utilities/HalLinks";
import IHalLinksResponse from "../../shared/models/IHalLinks";
const SuggestionSecondPage = () =>
{
    const [commentModalIsOpen, toggleCommentModal] = useToggle(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState<ISuggestion>(emptySuggestion);
    const [createSuggestionCommentContent, setCreateSuggestionCommentContent] = useState<string>('');

    const [firstLoad, setFirstLoad] = useState<boolean>(true);

    const [createSuggestionContent, setCreateSuggestionContent] = useState<string>('');
    const creatingSuggestionStatus = useSelector<IGlobalState, ApiStatus>(state => state.suggestions.creatingASuggestionStatus);

    const gettingAllSuggestionStatus = useSelector<IGlobalState, ApiStatus>(state => state.suggestions.gettingAllSuggestionsStatus);
    const suggestions = useSelector<IGlobalState, ISuggestion[]>(state => state.suggestions.suggestions);
    const globalHalLinks = useSelector<IGlobalState, IHalLinksResponse>(state => state.suggestions.halLinks);

    const userId = useSelector<IGlobalState, string>(state => state.user.userId);

    const dispatch = useDispatch();

    useEffect(() =>
    {
        dispatch(getAllSuggestions());
    }, [userId]);

    useEffect(()=>
    {
        if (creatingSuggestionStatus === ApiStatus.LOADED && !firstLoad)
            toast.success('Your suggestion has been created');

        if (creatingSuggestionStatus === ApiStatus.FAILED)
            toast.error('The creation of your suggestion has failed');

    }, [creatingSuggestionStatus, firstLoad]);

    useEffect(() =>
    {
        const suggestionIndex = findIndex(suggestions, function(suggestion : ISuggestion) { return suggestion.Id === selectedSuggestion.Id; });
        if (suggestionIndex !== -1)
            setSelectedSuggestion(suggestions[suggestionIndex]);
    }, [suggestions]);

    //region relative to create a new suggestion component
    const createNewSuggestion = () =>
    {
        const halLinks = new HalLinks(globalHalLinks._links);

        dispatch(createSuggestion(createSuggestionContent, halLinks));
    };

    const createNewSuggestionComment = () =>
    {
        const halLinks = new HalLinks(selectedSuggestion._links);

        dispatch(addComment(selectedSuggestion.Id, createSuggestionCommentContent, halLinks));
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

    function onClickOnCreateSuggestionComment(): void
    {
        createNewSuggestionComment();
        setCreateSuggestionCommentContent('');
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
                   className="create-suggestion-button center fa-lg right ">📨</i>
            </>);
    }
    //endregion

    function onClickOnPositiveVote(suggestion : ISuggestion, halLinks : HalLinks) : void
    {
        const voteRequest = createVoteRequest(suggestion, true, halLinks);

        dispatch(addVote(voteRequest));
    }

    function onClickOnNegativeVote(suggestion : ISuggestion, halLinks : HalLinks) : void
    {
        const voteRequest = createVoteRequest(suggestion, false, halLinks);

        dispatch(addVote(voteRequest));
    }

    function createVoteRequest(suggestion : ISuggestion, isPositive : boolean, halLinks : HalLinks) : ISuggestionVoteRequest
    {
        return {
            SuggestionId : suggestion.Id,
            IsPositive : isPositive,
            HalLinks : halLinks
        };
    }

    function onClickOnDeleteSuggestionButton(suggestion : ISuggestion) : void
    {
        const halLinks = new HalLinks(suggestion._links);

        dispatch(deleteSuggestion(suggestion.Id, halLinks));
    }

    function onClickOnCommentButton(suggestion : ISuggestion) : void
    {
        setSelectedSuggestion(suggestion);
        toggleCommentModal();
    }

    function onDeleteComment(commentId : string, halLinks : HalLinks)
    {
        dispatch(deleteComment(commentId, selectedSuggestion.Id, halLinks));
    }

    function getCommentsAsListItems(comments : ISuggestionComment[])
    {
        return map(comments, function(comment : ISuggestionComment)
        {
            const halLinks = new HalLinks(comment._links);

            const deleteCommentButton = halLinks.GetComponentLink("comment_delete", <i
                className="fas fa-trash-alt remove-suggestion-comment-button"
                key={'suggestion-comment-button' + comment.Id}
                onClick={() => onDeleteComment(comment.Id, halLinks)}/>);

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
                <i onClick={() => onClickOnCreateSuggestionComment()}
                   className="create-suggestion-comment-button center fa-lg right ">📨</i>
            </>);
    }

    function createSuggestionComponent()
    {
        return (
            <MDBRow className="create-suggestion-comment-container d-flex bd-highlight">
                {addSuggestionCommentComponent()}
            </MDBRow>
        );
    }

    //region create item data table
    function getSuggestionDataTable(): any
    {
        return {
            columns: getSuggestionDataTableColumns(),
            rows: getSuggestionDataTableRows(),
            responsive : true
        };
    }

        function getSuggestionDataTableColumns(): any
        {
            return [
                {
                    label: 'Content',
                    field: 'Content',
                    sort: 'disabled'
                },
                {
                    label: '👍',
                    field: 'Rate',
                    sort: 'disabled',
                    width : '10px'
                },
                {
                    label: '💬',
                    field: 'CommentsCount',
                    sort: 'disabled',
                    width : '10px'
                },
                {
                    label: '',
                    field: 'VotePositively',
                    sort: 'disabled',
                    width : '10px'
                },
                {
                    label: '',
                    field: 'VoteNegatively',
                    sort: 'disabled',
                    width : '10px'
                },
                {
                    label: '',
                    field: 'Comments',
                    sort: 'disabled',
                    width : '10px'
                },
                {
                    label: '',
                    field: 'DeleteMySuggestionButton',
                    sort: 'disabled',
                    width : '10px'
                }
            ];
        }

    function getSuggestionDataTableRows(): any
    {
        const orderedSuggestions = orderBy(suggestions, [function(suggestion : ISuggestion)
        {
            return suggestion.PositiveVoteCount - suggestion.NegativeVoteCount;
        }, function(suggestion : ISuggestion)
        {
            return suggestion.Comments.length;
        }], ["desc", "desc"]);
        return map(orderedSuggestions, toSuggestionDataTableRow);
    }

    function toSuggestionDataTableRow(suggestion: ISuggestion)
    {
        const halLinks = new HalLinks(suggestion._links);

        const voteValue: number = suggestion.PositiveVoteCount - suggestion.NegativeVoteCount;
        const voteClass: string = voteValue === 0 ? "default-vote" : voteValue < 0 ? "negative-vote" : "positive-vote";
        const rateClass = `suggestion ${voteClass}`;

        const commentCount = suggestion.Comments.length;
        const commentCountClass = `suggestion-comment-count ${commentCount > 0 ? "positive-comment-count" : ""}`;
        const iCommentedThisSuggestion = some(suggestion.Comments, function(comment : ISuggestionComment) { return comment.CreatedBy === userId });
        const commentClass = `fas fa-comments comment-suggestion-button ${iCommentedThisSuggestion ? "fa-lg" : ""}`;

        const isMySuggestion : boolean = halLinks.DoesLinkExist("suggestion_delete");
        const contentClass : string = `suggestion d-flex justify-content-between align-items-center ${isMySuggestion ? "my-suggestion" : ""}`;

        const iVotedPositively : boolean = some(suggestion.Votes, function(vote : ISuggestionVote) { return vote.CreatedBy === userId && vote.IsPositive });
        const iVotedNegatively: boolean = some(suggestion.Votes, function(vote : ISuggestionVote) { return vote.CreatedBy === userId && !vote.IsPositive });
        const votePositivelyClass : string = `fas fa-thumbs-up thumbs-up ${iVotedPositively ? "fa-lg" : ""}`;
        const voteNegativelyClass : string = `fas fa-thumbs-down thumbs-down ${iVotedNegatively ? "fa-lg" : ""}`;

        const content = <MDBListGroupItem className={contentClass}>{suggestion.Content}</MDBListGroupItem>;
        const rate = <p className={rateClass}>{voteValue}</p>;
        const votePositively = halLinks.GetComponentLink("vote_create", <i className={votePositivelyClass} onClick={() => onClickOnPositiveVote(suggestion, halLinks)}></i>);
        const voteNegatively = halLinks.GetComponentLink("vote_create", <i className={voteNegativelyClass} onClick={() => onClickOnNegativeVote(suggestion, halLinks)}></i>);
        const deleteButton = halLinks.GetComponentLink("suggestion_delete", <i className="fas fa-trash-alt remove-suggestion-button" onClick={() => onClickOnDeleteSuggestionButton(suggestion)}></i>);
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
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol>
                                    <Loader
                                        loadingStatus={gettingAllSuggestionStatus}
                                        resourceName="suggestions"
                                        resourceToLoad={<MDBDataTable data={getSuggestionDataTable()} entries={5}/>}
                                    />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="create-suggestion-container d-flex bd-highlight">
                                {addSuggestionComponent()}
                            </MDBRow>
                        </MDBContainer>
                    </MDBMask>
                    <MDBModal className="show-comments-modal" isOpen={commentModalIsOpen} toggle={(toggleCommentModal)} size="lg">
                        <MDBModalHeader
                            className="suggestion-comment-title"
                            toggle={toggleCommentModal}>{selectedSuggestion.Content}</MDBModalHeader>
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
