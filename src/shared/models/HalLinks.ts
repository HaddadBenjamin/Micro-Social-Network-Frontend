import Dictionary from "./Dictionary";

interface IHalLinks
{
    _links : Dictionary<IHalLink>
}

export interface IHalLink
{
    href : string,
    method : string
}

export default IHalLinks;