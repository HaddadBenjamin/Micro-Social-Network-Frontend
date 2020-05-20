import configurationService from '../services/configurationService'
import axios, {
    AxiosPromise,
} from "axios";
import qs from "qs";

class ApiHelpers
{
    public get(endpoint: string, queryParameters?: any, bearerToken? : string) : AxiosPromise
    {
        return axios({
            method: 'GET',
            url: this.getUrl(endpoint, queryParameters),
            headers: this.getHeaders(bearerToken),
            data: {}
        });
    }

    public post(endpoint: string, body?: any, bearerToken? : string): AxiosPromise
    {
        return axios({
            method: 'POST',
            url: this.getUrl(endpoint),
            headers: this.getHeaders(bearerToken),
            data: body
        });
    }

    public put(endpoint: string, body?: any,  bearerToken? : string) : AxiosPromise
    {
        return axios({
            method: 'PUT',
            url: this.getUrl(endpoint),
            headers: this.getHeaders(bearerToken),
            data: body
        });
    }

    public delete(endpoint: string, body?: any, bearerToken? : string): AxiosPromise
    {
        return axios({
            method: 'DELETE',
            url: this.getUrl(endpoint),
            headers: this.getHeaders(bearerToken),
            data: body
        });
    }

    public getUrl(endpoint: string, queryParameters?: string, bearerToken? : string): string
    {
        return `${configurationService.apiUrl}/${endpoint}${queryParameters ? '/?' + qs.stringify(queryParameters) : ''}`;
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

const apiHelpers = new ApiHelpers();

export default apiHelpers;