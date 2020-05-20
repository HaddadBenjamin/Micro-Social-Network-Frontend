import {
    addedComment,
    addedVote,
    addindVote,
    addingComment,
    addingCommentFailed,
    addingVoteFailed,
    createdSuggestion,
    creatingSuggestion,
    creatingSuggestionFailed,
    deletedComment,
    deletedSuggestion,
    deletingComment,
    deletingCommentFailed,
    deletingSuggestion,
    deletingSuggestionFailed,
    gettingAllSuggestions,
    gettingAllSuggestionsFailed,
    gotAllSuggestions,
    SuggestionActionTypes,
    SuggestionsAction
} from "../actions/suggestion.action";
import {IGlobalState} from "../reducers";
import {
    combineEpics,
    Epic
} from "redux-observable";
import {
    switchMap,
    map,
    startWith,
    catchError,
    filter,
    mergeMap
} from "rxjs/operators";
import {isOfType} from "typesafe-actions";
import {
    from,
    of
} from "rxjs";
import apiHelpers from "../shared/helpers/apiHelpers";
import {AxiosResponse} from 'axios'
import Suggestion, {ISuggestions} from "../models/Suggestion";

type SuggestionEpic = Epic<SuggestionsAction, SuggestionsAction, IGlobalState>;

const getAllSuggestionsEpic: SuggestionEpic = (action$, state$) => action$.pipe(
    filter(isOfType(SuggestionActionTypes.GET_ALL_SUGGESTIONS)),
    switchMap(action =>
        from(apiHelpers.get('suggestions')).pipe(
            map((response: AxiosResponse<ISuggestions>) => gotAllSuggestions(response.data.Elements, response.data)),
            startWith(gettingAllSuggestions()),
            catchError(() => of(gettingAllSuggestionsFailed()))
        )
    )
);

const createSuggestionEpic: SuggestionEpic = (action$, state$) => action$.pipe(
    filter(isOfType(SuggestionActionTypes.CREATE_SUGGESTION)),
    mergeMap(action =>
        from(action.payload.halLinks.BrowseLink("suggestion_create",{
            Content: action.payload.content,
            UserId: state$.value.user.userId
        })).pipe(
            map((response: AxiosResponse<Suggestion>) => createdSuggestion(response.data)),
            startWith(creatingSuggestion()),
            catchError(() => of(creatingSuggestionFailed()))
        )
    )
);

const voteToASuggestionEpic: SuggestionEpic = (action$, state$) => action$.pipe(
    filter(isOfType(SuggestionActionTypes.ADD_VOTE)),
    mergeMap(action =>
        from(action.payload.halLinks.BrowseLink("vote_create",{
            IsPositive: action.payload.isPositive,
            UserId: state$.value.user.userId
        })).pipe(
            map((response: AxiosResponse<Suggestion>) => addedVote(response.data)),
            startWith(addindVote()),
            catchError(() => of(addingVoteFailed()))
        )
    )
);

const commentASuggestionEpic: SuggestionEpic = (action$, state$) => action$.pipe(
    filter(isOfType(SuggestionActionTypes.ADD_COMMENT)),
    mergeMap(action =>
        from(action.payload.halLinks.BrowseLink("comment_create",{
            Comment: action.payload.comment,
            UserId: state$.value.user.userId
        })).pipe(
            map((response: AxiosResponse<Suggestion>) => addedComment(response.data)),
            startWith(addingComment()),
            catchError(() => of(addingCommentFailed()))
        )
    )
);

const deleteSuggestionEpic: SuggestionEpic = (action$, state$) => action$.pipe(
    filter(isOfType(SuggestionActionTypes.DELETE_SUGGESTION)),
    mergeMap(action =>
        from(action.payload.halLinks.BrowseLink("suggestion_delete",{
            UserId: state$.value.user.userId
        })).pipe(
            map((response: AxiosResponse<string>) => deletedSuggestion(response.data)),
            startWith(deletingSuggestion()),
            catchError(() => of(deletingSuggestionFailed()))
        )
    ));

const deleteACommentFromASuggestionEpic: SuggestionEpic = (action$, state$) => action$.pipe(
    filter(isOfType(SuggestionActionTypes.DELETE_COMMENT)),
    mergeMap(action =>
        from(action.payload.halLinks.BrowseLink("comment_delete",{
            UserId: state$.value.user.userId
        })).pipe(
            map((response: AxiosResponse<Suggestion>) => deletedComment(response.data)),
            startWith(deletingComment()),
            catchError(() => of(deletingCommentFailed()))
        )
    ));

export default combineEpics(
    createSuggestionEpic,
    getAllSuggestionsEpic,
    voteToASuggestionEpic,
    commentASuggestionEpic,
    deleteSuggestionEpic,
    deleteACommentFromASuggestionEpic);