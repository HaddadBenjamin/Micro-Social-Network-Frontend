class Strings
{
    public toTitleCase(text: string)
    {
        const FirstCharacterIndex: number = 0;
        const FromCharacterIndex: number = 1;

        return text.replace(
            /\w\S*/g,
            function (textToReplace: string)
            {
                return textToReplace.charAt(FirstCharacterIndex).toUpperCase() +
                    textToReplace.substr(FromCharacterIndex).toLowerCase();
            }
        );
    }

    public hashcode(text: string)
    {
        let hash : number = 0;

        for (let index = 0; index < text.length; index++)
        {
            hash += Math.pow(text.charCodeAt(index) * 31, text.length - index);
            hash = hash & hash; // Convert to 32bit integer
        }

        return hash;
    }
}

const strings: Strings = new Strings();

export default strings;