import config from './config'

class Api
{
    public getUrl(endpoint : string, queryParameters? : string) : string
    {
        return `${config.apiUrl}/${endpoint}/${queryParameters ? '?' + queryParameters : ''}`;
    }
}

const api = new Api();

export default api;
