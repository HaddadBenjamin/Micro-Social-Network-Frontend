import config from './config'
import axios, {
    AxiosPromise,
} from "axios";
import qs from "qs";

class Api
{
    public get(endpoint: string, queryParameters?: any, bearerToken? : string) : AxiosPromise
    {
        return axios({
            method: 'GET',
            url: api.getUrl(endpoint, queryParameters),
            headers: api.getHeaders(bearerToken),
            data: {}
        });
    }

    public post(endpoint: string, body?: any, bearerToken? : string): AxiosPromise
    {
        return axios({
            method: 'POST',
            url: api.getUrl(endpoint),
            headers: api.getHeaders(bearerToken),
            data: body
        });
    }

    public put(endpoint: string, body?: any,  bearerToken? : string) : AxiosPromise
    {
        return axios({
            method: 'PUT',
            url: api.getUrl(endpoint),
            headers: api.getHeaders(bearerToken),
            data: body
        });
    }

    public delete(endpoint: string, body?: any, bearerToken? : string): AxiosPromise
    {
        return axios({
            method: 'DELETE',
            url: api.getUrl(endpoint),
            headers: api.getHeaders(bearerToken),
            data: body
        });
    }

    public getUrl(endpoint: string, queryParameters?: string, bearerToken? : string): string
    {
        return `${config.apiUrl}/${endpoint}${queryParameters ? '/?' + qs.stringify(queryParameters) : ''}`;
    }

    public getHeaders(bearerToken? : string) : any
    {
        return bearerToken === undefined ?
            {} :
            {
                "Authorization" : "Bearer " + bearerToken
            };
    }
}

const api = new Api();

export default api;