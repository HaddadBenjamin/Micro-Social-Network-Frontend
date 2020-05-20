class MathHelpers
{
    public random(minimum : number, maximum : number) : number
    {
        return (Math.floor(Math.random() * Math.floor(maximum)) + minimum);
    }
}

const mathHelpers = new MathHelpers();

export default mathHelpers;