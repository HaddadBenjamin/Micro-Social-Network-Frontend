class Errors
{
    public getErrorMessage(error: any) : string
    {
        return `${error.response.status} : ${error.response.statusText} - ${error.response.data.Message}.`;
    }
}

const errors: Errors = new Errors();

export default errors;