import IDictionary from "../models/IDictionary";

export class Dictionary<ValueType> implements IDictionary<ValueType>
{
    private _items: { [index: string] : ValueType } = {};
    private _count: number = 0;

    constructor(items : { [index: string] : ValueType } = {})
    {
        this._items = items;
    }

    public ContainsKey(key: string): boolean
    {
        return this._items.hasOwnProperty(key);
    }

    public Count(): number
    {
        return this._count;
    }

    public Add(key: string, value: ValueType)
    {
        if (!this._items.hasOwnProperty(key))
            this._count++;

        this._items[key] = value;
    }

    public Remove(key: string) : ValueType
    {
        const val = this._items[key];

        delete this._items[key];

        this._count--;

        return val;
    }

    public GetValueOrDefault(key: string): ValueType
    {
        return this._items[key];
    }

    public Keys(): string[]
    {
        let keySet: string[] = [];

        for (const prop in this._items)
            if (this._items.hasOwnProperty(prop))
                keySet.push(prop);

        return keySet;
    }

    public Values(): ValueType[]
    {
        let values: ValueType[] = [];

        for (const prop in this._items)
            if (this._items.hasOwnProperty(prop))
                values.push(this._items[prop]);

        return values;
    }
}