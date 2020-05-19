import IHalLinks, {IHalLink} from "../models/IHalLinks";
import Dictionary from "../models/Dictionary";

class HalLinks implements IHalLinks
{
    _links: Dictionary<IHalLink>;

    GetLink(linkName : string) : IHalLink
    {

    }
}