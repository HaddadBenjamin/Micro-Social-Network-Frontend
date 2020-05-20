import jquery from "jquery";

class AnimationHelpers
{
    public scrollTo(cssSelector : string)
    {
        jquery('html, body').animate(
            {
                // @ts-ignore
                scrollTop: jquery(cssSelector).offset().top
            }, 800, 'swing');
    }
}

const animationHelpers = new AnimationHelpers();

export default animationHelpers;