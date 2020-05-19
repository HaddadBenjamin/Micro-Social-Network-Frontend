import IHalLinks, {IHalLink} from "../models/IHalLinks";
import Dictionary from "../models/Dictionary";
import axios, { AxiosPromise } from "axios";
import api from "../helpers/api";

// @ts-ignore
class HalLinks implements IHalLinks
{
    // @ts-ignore
    protected _links: Dictionary<IHalLink>;

    GetLink(linkName : string) : IHalLink
    {
        return this._links.GetValueOrDefault(linkName);
    }

    DoesLinkExist(linkName : string) : boolean
    {
        return this.GetLink(linkName) !== undefined;
    }

    BrowseLink(linkName : string, body?: any, bearerToken? : string) : AxiosPromise
    {
        const link = this.GetLink(linkName);

        return axios({
            method: link.method,
            url: link.href,
            headers: api.getHeaders(bearerToken),
            data: body
        });
    }
}

export default HalLinks;