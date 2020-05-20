import Dictionary from "./IDictionary";
import HttpMethod from "./HttpMethod";
import {AxiosPromise} from "axios";
import {ReactNode} from "react";

interface IHalLinks
{
    _links : Dictionary<IHalLink>

    GetLink(linkName : string) : IHalLink
    DoesLinkExist(linkName : string) : boolean
    GetComponentLink(linkName : string, componentIfLinkExists : ReactNode, componentIfLinkDontExist? : ReactNode) : ReactNode
    BrowseLink(linkName : string, body?: any, bearerToken? : string) : AxiosPromise
}

export interface IHalLink
{
    href : string,
    method : HttpMethod
}

export default IHalLinks;