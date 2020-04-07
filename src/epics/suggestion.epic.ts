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
import api from "../shared/utilities/api";
import {AxiosResponse} from 'axios'
import ISuggestionItem from "../models/Suggestion";

type SuggestionEpic = Epic<SuggestionsAction, SuggestionsAction, IGlobalState>;

const getAllSuggestionsEpic: SuggestionEpic = (action$, state$) => action$.pipe(
    filter(isOfType(SuggestionActionTypes.GET_ALL_SUGGESTIONS)),
    switchMap(action =>
        from(api.get('suggestions')).pipe(
            map((response: AxiosResponse<ISuggestionItem[]>) => gotAllSuggestions(response.data)),
            startWith(gettingAllSuggestions()),
            catchError(() => of(gettingAllSuggestionsFailed()))
        )
    )
);

const createSuggestionEpic: SuggestionEpic = (action$, state$) => action$.pipe(
    filter(isOfType(SuggestionActionTypes.CREATE_SUGGESTION)),
    mergeMap(action =>
        from(api.post('suggestions', {
            Content: action.payload.content,
            UserId: state$.value.user.userId
        })).pipe(
            map((response: AxiosResponse<ISuggestionItem>) => createdSuggestion(response.data)),
            startWith(creatingSuggestion()),
            catchError(() => of(creatingSuggestionFailed()))
        )
    )
);

const voteToASuggestionEpic: SuggestionEpic = (action$, state$) => action$.pipe(
    filter(isOfType(SuggestionActionTypes.ADD_VOTE)),
    mergeMap(action =>
        from(api.post(`suggestions/${action.payload.suggestionId}/votes`, {
            IsPositive: action.payload.isPositive,
            UserId: state$.value.user.userId
        })).pipe(
            map((response: AxiosResponse<ISuggestionItem>) => addedVote(response.data)),
            startWith(addindVote()),
            catchError(() => of(addingVoteFailed()))
        )
    )
);

const commentASuggestionEpic: SuggestionEpic = (action$, state$) => action$.pipe(
    filter(isOfType(SuggestionActionTypes.ADD_COMMENT)),
    mergeMap(action =>
        from(api.post(`suggestions/${action.payload.suggestionId}/comments`, {
            Comment: action.payload.comment,
            UserId: state$.value.user.userId
        })).pipe(
            map((response: AxiosResponse<ISuggestionItem>) => addedComment(response.data)),
            startWith(addingComment()),
            catchError(() => of(addingCommentFailed()))
        )
    )
);

const deleteSuggestionEpic: SuggestionEpic = (action$, state$) => action$.pipe(
    filter(isOfType(SuggestionActionTypes.DELETE_SUGGESTION)),
    mergeMap(action =>
        from(api.delete(`suggestions/${action.payload.suggestionId}`, {
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
        from(api.delete(`suggestions/${action.payload.suggestionId}/comments/${action.payload.id}`, {
            UserId: state$.value.user.userId
        })).pipe(
            map((response: AxiosResponse<ISuggestionItem>) => deletedComment(response.data)),
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