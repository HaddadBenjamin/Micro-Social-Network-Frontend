import {store} from "../../store/store";
import axios from 'axios'
import config from './config'

class Api
{
    public getFromBody<HttpRequestBody, HttpResponse>(endpoint : string, action : string, bodyParameters : HttpRequestBody)
    {

    }

    // Use URI to send the parameters.
    public getFromUri<HttpResponse>(endpoint : string, action : string, queryParameters? : string)
    {
        var url = this.getFromUriUrl(endpoint, queryParameters);

        axios.get<HttpResponse>(url)
            .then(response =>
            {
                console.log(response);
                // typescript-fsa to be to handle success / fail normal behaviour
                store.dispatch(
                {
                    type: action,
                    payload : response.data
                });
            },
                (error) => { console.log(error) }
            );
    }

    private getFromUriUrl(endpoint : string, queryParameters? : string) : string
    {
        return `${config.apiUrl}/${endpoint}/${queryParameters ? '?' + queryParameters : ''}`;
    }

    private getFromBodyUrl(endpoint : string) : string
    {
        return `${config.apiUrl}/${endpoint}`;
    }
}

const api = new Api();

export default api;
