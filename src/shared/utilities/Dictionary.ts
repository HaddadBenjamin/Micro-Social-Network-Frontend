import IDictionary from "../models/Dictionary";

export class Dictionary<ValueType> implements IDictionary<ValueType>
{
    private items: { [index: string] : ValueType } = {};
    private count: number = 0;

    public ContainsKey(key: string): boolean
    {
        return this.items.hasOwnProperty(key);
    }

    public Count(): number
    {
        return this.count;
    }

    public Add(key: string, value: ValueType)
    {
        if (!this.items.hasOwnProperty(key))
            this.count++;

        this.items[key] = value;
    }

    public Remove(key: string) : ValueType
    {
        const val = this.items[key];

        delete this.items[key];

        this.count--;

        return val;
    }

    public GetValueOrDefault(key: string): ValueType
    {
        return this.items[key];
    }

    public Keys(): string[]
    {
        let keySet: string[] = [];

        for (const prop in this.items)
            if (this.items.hasOwnProperty(prop))
                keySet.push(prop);

        return keySet;
    }

    public Values(): ValueType[]
    {
        let values: ValueType[] = [];

        for (const prop in this.items)
            if (this.items.hasOwnProperty(prop))
                values.push(this.items[prop]);

        return values;
    }
}