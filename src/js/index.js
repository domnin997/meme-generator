import handleCanvas from "./canvasScript.js";
import handleTextPanelMovement from "./moveTextPanel.js";
import handleTextPanelChange from "./changeTextPanelSize.js";
import handleFontSizeChange from "./textSizeChanger.js";
import manageAppState from "./appStateManager.js";

const {getFontSize, decreaseFont, increaseFont, getTextFormX,
       setTextFormX, getTextFormY, setTextFormY} = manageAppState();

handleCanvas(getFontSize, getTextFormX, getTextFormY);
handleTextPanelMovement(setTextFormX, setTextFormY);
handleTextPanelChange();
handleFontSizeChange(decreaseFont, increaseFont, getFontSize);