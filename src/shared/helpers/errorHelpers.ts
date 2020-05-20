class ErrorHelpers
{
    public getErrorMessage(error: any) : string
    {
        return `${error.response.status} : ${error.response.statusText} - ${error.response.data.Message}.`;
    }
}

const errorHelpers : ErrorHelpers = new ErrorHelpers();

export default errorHelpers;