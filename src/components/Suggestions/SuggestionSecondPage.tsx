import {
    MDBContainer,
    MDBListGroupItem,
    MDBView,
    MDBMask,
    MDBRow,
    MDBCol,
    MDBDataTable,
    MDBAlert
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
import ISuggestionItem, {ISuggestionVoteItem} from "../../models/Suggestion";
import 'react-toastify/dist/ReactToastify.css';
import {map, orderBy, some} from 'lodash';

const SuggestionSecondPage = () =>
{
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
                width: 15
            },
            {
                label: '',
                field: 'VotePositively',
                width: 10,
                sort: 'disabled'
            },
            {
                label: '',
                field: 'VoteNegatively',
                width: 10,
                sort: 'disabled'
            },
            {
                label: '',
                field: 'DeleteMySuggestionButton',
                width: 10,
                sort: 'disabled'
            },
            {
                label: 'Comments',
                field: 'Comments',
                width: 10,
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
        const comments = <i className="fas fa-comments comment-suggestion-button"></i>;

        return {
            'Content': content,
            'Rate': rate,
            'VotePositively': votePositively,
            'VoteNegatively': voteNegatively,
            'DeleteMySuggestionButton' : deleteButton,
            'Comments' : comments
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
                </MDBView>
            </div>
        </>
    );
}

export default SuggestionSecondPage;