import IHalLinks, {IHalLink} from "../models/IHalLinks"
import axios, { AxiosPromise } from "axios"
import api from "../helpers/api"
import {plainToClass} from "class-transformer";
import Suggestion from "../../models/Suggestion";
import { Dictionary } from "./Dictionary";

// @ts-ignore
class HalLinks implements IHalLinks
{
    // @ts-ignore
    public _links: Dictionary<IHalLink>;

    public GetLink(linkName : string) : IHalLink
    {
        // @ts-ignore
        // Allow to get a definition for all the methods of your objects
        this._links = plainToClass(Dictionary, this._links);
        return this._links.GetValueOrDefault(linkName);
    }

    public DoesLinkExist(linkName : string) : boolean
    {
        return this.GetLink(linkName) !== undefined;
    }

    public GetComponentLink(linkName : string, componentIfLinkExists : any, componentIfLinkDontExist? : any) : any
    {
        return this.DoesLinkExist(linkName) ?
            componentIfLinkExists :
            componentIfLinkDontExist == undefined ?
                '' :
                componentIfLinkDontExist;
    }

    public (linkName : string, body?: any, bearerToken? : string) : AxiosPromise
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