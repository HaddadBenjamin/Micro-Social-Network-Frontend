import Dictionary from "./IDictionary";
import HttpMethod from "./HttpMethod";

interface IHalLinks
{
    _links : Dictionary<IHalLink>
}

export interface IHalLink
{
    href : string,
    method : HttpMethod
}

export default IHalLinks;