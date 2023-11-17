export default function manageAppState () {
    
    let fontSize = 25,
        textFormX = 0,
        textFormY = 0;

    function getFontSize () {
        return fontSize;
    }

    function decreaseFont () {
        --fontSize;
    }

    function increaseFont () { 
        ++fontSize;
    }

    function getTextFormX () {
        return textFormX;
    }

    function setTextFormX (value) {
        textFormX = value;
    }

    function getTextFormY () {
        return textFormY;
    }

    function setTextFormY (value) {
        textFormY = value;
    }

    return {getFontSize, decreaseFont, increaseFont, getTextFormX, setTextFormX, getTextFormY, setTextFormY};

}