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
}

const strings: Strings = new Strings();

export default strings;