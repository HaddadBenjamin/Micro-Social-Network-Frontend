import HttpMethod from "./HttpMethod";
import IDictionary from "./IDictionary";

interface IHalLinksResponse
{
    _links : { [index: string] : IHalLink }
}

export interface IHalLinks
{
    _links : IDictionary<IHalLink>
}

export interface IHalLink
{
    href : string,
    method : HttpMethod
}

export default IHalLinksResponse;