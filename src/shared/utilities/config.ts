// @ts-ignore
interface ApplicationConfiguration
{
    apiUrl : string
}

const developmentConfiguration : ApplicationConfiguration =
{
    apiUrl : "http://localhost:56205/api/v1"
};

const productionConfiguration : ApplicationConfiguration =
{
    apiUrl : "https://diablo-2-enriched-documentation.azurewebsites.net/api/v1"
};

const config = process.env.NODE_ENV === "production" ?
    productionConfiguration :
    developmentConfiguration;

export default config;