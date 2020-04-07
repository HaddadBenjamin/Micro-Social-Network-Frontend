import config from './config'
import axios, {
    AxiosPromise,
    AxiosResponse
} from "axios";
import ISuggestionItem from "../../models/Suggestion";
import qs from "qs";

class Api
{
    public getUrl(endpoint: string, queryParameters?: string): string
    {
        return `${config.apiUrl}/${endpoint}/${queryParameters ? '?' + queryParameters : ''}`;
    }

    public get(endpoint: string, queryParameters?: any) : AxiosPromise
    {
        return axios({
            method: 'get',
            url: api.getUrl(endpoint, queryParameters == undefined ? '' : qs.stringify(queryParameters)),
            headers: [],
            data: {}
        });
    }

    public post(endpoint: string, body?: any): AxiosPromise
    {
        return axios({
            method: 'post',
            url: api.getUrl(endpoint),
            headers: {},
            data: body
        });
    }

    public delete(endpoint: string, body?: any): AxiosPromise
    {
        return axios({
            method: 'delete',
            url: api.getUrl(endpoint),
            headers: {},
            data: body
        });
    }
}

const api = new Api();

export default api;
