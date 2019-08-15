class Maths
{
    public random(minimum : number, maximum : number) : number
    {
        return (Math.floor(Math.random() * Math.floor(maximum)) + minimum);
    }
}

const maths = new Maths();

export default maths;