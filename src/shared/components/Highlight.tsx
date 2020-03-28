import React from "react";
import strings from '../../shared/utilities/strings'

interface Props
{
    text : string,
    searchTerm : string,
    color? : string,
    textColor? : string,
}

const Highlight = (props : Props) => {
        var termColor = props.color || 'red';
        var textColor = props.textColor == null ? 'white' : props.textColor;
        var term = strings.toTitleCase(props.searchTerm || '');
        var replaceText = "<span style='color : " + termColor + " !important'>" + term + "</span>";
        var newText = "<span  style='color : " + textColor + " !important'>" + strings.toTitleCase(props.text || '').replace(term, replaceText) + "</span>";

        return (<span dangerouslySetInnerHTML={{__html : newText}}></span>);
}

export default Highlight;