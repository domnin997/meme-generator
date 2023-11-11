import handleCanvas from "./canvasScript.js";
import handleTextPanelMovement from "./moveTextPanel.js";
import handleTextPanelChange from "./changeTextPanelSize.js";
import handleFontSizeChange from "./textSizeChanger.js";

window.currFontSize = 25;
window.currFormX = 0;
window.currFormY = 0;

handleCanvas();
handleTextPanelMovement();
handleTextPanelChange();
handleFontSizeChange();