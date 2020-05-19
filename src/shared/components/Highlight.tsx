import React from "react";
import strings from '../helpers/strings'

interface Props
{
    text: string,
    searchTerm: string,
    color?: string,
    textColor?: string,
}

const Highlight = (props: Props) =>
{
    let termColor = props.color || 'red';
    let textColor = props.textColor == null ? 'white' : props.textColor;
    let term = strings.toTitleCase(props.searchTerm || '');
    let replaceText = "<span style='color : " + termColor + " !important'>" + term + "</span>";
    let newText = "<span  style='color : " + textColor + " !important'>" + strings.toTitleCase(props.text || '').replace(term, replaceText) + "</span>";

    return (<span dangerouslySetInnerHTML={{__html: newText}}></span>);
}

export default Highlight;