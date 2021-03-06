import axios, { AxiosPromise } from "axios"
import api from "../helpers/apiHelpers"
import { Dictionary } from "./Dictionary";
import IDictionary from "../models/IDictionary";
import {IHalLink, IHalLinks} from "../models/IHalLinks";

class HalLinks implements IHalLinks
{
    _links : IDictionary<IHalLink>

    constructor(links : { [index: string] : IHalLink } = { })
    {
        this._links = new Dictionary<IHalLink>(links);
    }

    public GetLink(linkName : string) : IHalLink
    {
        return this._links.GetValueOrDefault(linkName);
    }

    public DoesLinkExists(linkName : string) : boolean
    {
        return this.GetLink(linkName) != undefined;
    }

    public GetLinkComponent(linkName : string, componentIfLinkExists : any, componentIfLinkDontExist? : any) : any
    {
        return this.DoesLinkExists(linkName) ? componentIfLinkExists :
            componentIfLinkDontExist == undefined ?  '' : componentIfLinkDontExist;
    }

    public BrowseLink(linkName : string, body?: any, bearerToken? : string) : AxiosPromise
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