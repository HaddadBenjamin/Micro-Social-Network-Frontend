import React from "react";
import stringHelpers from '../helpers/stringHelpers'

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
    let term = stringHelpers.toTitleCase(props.searchTerm || '');
    let replaceText = "<span style='color : " + termColor + " !important'>" + term + "</span>";
    let newText = "<span  style='color : " + textColor + " !important'>" + stringHelpers.toTitleCase(props.text || '').replace(term, replaceText) + "</span>";

    return (<span dangerouslySetInnerHTML={{__html: newText}}></span>);
}

export default Highlight;