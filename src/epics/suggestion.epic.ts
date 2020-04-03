import {
    addedVote,
    addindVote,
    addingVoteFailed,
    createdSuggestion,
    creatingSuggestion,
    creatingSuggestionFailed,
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
import axios, {AxiosResponse} from 'axios'
import ISuggestionItem from "../models/Suggestion";

type SuggestionEpic = Epic<SuggestionsAction, SuggestionsAction, IGlobalState>;

const getAllSuggestionsEpic: SuggestionEpic = (action$, state$) => action$.pipe(
    filter(isOfType(SuggestionActionTypes.GET_ALL_SUGGESTIONS)),
    switchMap(action =>
        // I should refactor this part, to put this logic of geturl, config inside the API
        from(axios.get<ISuggestionItem[]>(api.getUrl('suggestions/getall'), {data: {}})).pipe(
            map((response: AxiosResponse<ISuggestionItem[]>) => gotAllSuggestions(response.data)),
            startWith(gettingAllSuggestions()),
            catchError(() => of(gettingAllSuggestionsFailed()))
        )
    )
);

const createSuggestionEpic: SuggestionEpic = (action$, state$) => action$.pipe(
    filter(isOfType(SuggestionActionTypes.CREATE_SUGGESTION)),
    mergeMap(action =>
        from(axios({
            method: 'post',
            url: api.getUrl('suggestions/create'),
            headers: {},
            data: {
                Content: action.payload.content,
                Ip : state$.value.user.ip
            }
        })).pipe(
            map((response: AxiosResponse<ISuggestionItem>) => createdSuggestion(response.data)),
            startWith(creatingSuggestion()),
            catchError(() => of(creatingSuggestionFailed()))
        )
    ));

const voteToASuggestionEpic: SuggestionEpic = (action$, state$) => action$.pipe(
    filter(isOfType(SuggestionActionTypes.ADD_VOTE)),
    mergeMap(action =>
        from(axios({
            method: 'post',
            url: api.getUrl('suggestions/vote'),
            headers: {},
            data: {
                SuggestionId: action.payload.suggestionId,
                IsPositive: action.payload.isPositive,
                Ip: action.payload.ip
            }
        })).pipe(
            map((response: AxiosResponse<ISuggestionItem>) => addedVote(response.data)),
            startWith(addindVote()),
            catchError(() => of(addingVoteFailed()))
        )
    )
);

export default combineEpics(getAllSuggestionsEpic, createSuggestionEpic, voteToASuggestionEpic);