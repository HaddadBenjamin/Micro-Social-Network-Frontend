class Maths
{
    public random(minimum : number, maximum : number) : number
    {
        return (Math.floor(Math.random() * Math.floor(maximum)) + minimum + 1);
    }
}

const maths = new Maths();

export default maths;