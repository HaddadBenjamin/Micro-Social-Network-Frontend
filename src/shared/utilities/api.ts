import {store} from "../../store/store";
import axios from 'axios'
import config from './config'

class Api
{
    public getByBody<HttpRequestBody, HttpResponse>(endpoint : string, action : string, bodyParameters : HttpRequestBody)
    {
        var url = this.getByBodyUrl(endpoint);

        axios.get<HttpResponse>(url, {
            data : {  SubCategories : 'Two Handed Polearm'}})
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

    // Use URI to send the parameters.
    public getByUri<HttpResponse>(endpoint : string, action : string, queryParameters? : string)
    {
        var url = this.getByUriUrl(endpoint, queryParameters);

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

    private getByUriUrl(endpoint : string, queryParameters? : string) : string
    {
        return `${config.apiUrl}/${endpoint}/${queryParameters ? '?' + queryParameters : ''}`;
    }

    private getByBodyUrl(endpoint : string) : string
    {
        return `${config.apiUrl}/${endpoint}`;
    }
}

const api = new Api();

export default api;
