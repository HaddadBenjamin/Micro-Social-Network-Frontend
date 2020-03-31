import {store} from "../../store/store";
import axios from 'axios'
import config from './config'
import Item from "../../components/Items/Item";

class Api
{

    public get<HttpResponse>(endpoint : string, action : string, queryParameters? : string)
    {
        let url = this.getUrl(endpoint, queryParameters);

        axios.get<Item[]>(url, { data : { }}) // when data is not defined, I get a 415 unsupported types
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

    private getUrl(endpoint : string, queryParameters? : string) : string
    {
        return `${config.apiUrl}/${endpoint}/${queryParameters ? '?' + queryParameters : ''}`;
    }
}

const api = new Api();

export default api;
