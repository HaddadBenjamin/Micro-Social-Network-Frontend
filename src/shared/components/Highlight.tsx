import React from "react";
import strings from '../../shared/utilities/strings'

interface Props
{
    text : string,
    searchTerm : string,
    color? : string,
    textColor? : string,
}

class Highlight extends React.PureComponent<Props, {}>
{
    constructor(props : Props)
    {
        super(props);
    }

    render()
    {
        var termColor = this.props.color || 'red';
        var textColor = this.props.textColor == null ? 'white' : this.props.textColor;
        var term = strings.toTitleCase(this.props.searchTerm || '');
        var replaceText = "<span style='color : " + termColor + " !important'>" + term + "</span>";
        console.log(this.props.searchTerm);
        console.log(replaceText);
        var newText = "<span  style='color : " + textColor + " !important'>" + strings.toTitleCase(this.props.text || '').replace(term, replaceText) + "</span>";

        return (<span dangerouslySetInnerHTML={{__html : newText}}></span>);
    }
}

export default Highlight;