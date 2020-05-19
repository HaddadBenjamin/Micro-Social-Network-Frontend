import Dictionary from "./Dictionary";
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