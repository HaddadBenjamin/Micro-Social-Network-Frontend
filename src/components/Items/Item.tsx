interface Item
{
    Id : string,
    Name : string,
    Quality : string,
    Category : string,
    SubCategory : string,
    Type : string,
    LevelRequired : number,
    Level : number,
    Properties : ItemProperty[],
    ImageName : string,

    // Relative to defense :
    MinimumDefenseMinimum  : number,
    MaximumDefenseMinimum  : number,
    MinimumDefenseMaximum  : number,
    MaximumDefenseMaximum  : number,

    // Relative to weapons :
    MinimumOneHandedDamageMinimum  : number,
    MaximumOneHandedDamageMinimum  : number,
    MinimumTwoHandedDamageMinimum  : number,
    MaximumTwoHandedDamageMinimum  : number,
    MinimumOneHandedDamageMaximum  : number,
    MaximumOneHandedDamageMaximum  : number,
    MinimumTwoHandedDamageMaximum  : number,
    MaximumTwoHandedDamageMaximum  : number,

    // Stat required.
    StrengthRequired  : number,
    DexterityRequired : number,
}

export interface ItemProperty
{
    Name : string,
    FormattedName : string,
    Par : number,
    Minimum : number,
    Maximum : number,
    IsPercent : boolean,
    Id : string,
    FirstCharacter : string,
    OrderIndex : number,
}

export default Item;