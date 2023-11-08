const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const uploader = document.querySelector('.uploader');
const downloadRes = document.getElementById('resultDownload');

const canvasStockWidth = +window.getComputedStyle(canvas).width.replace(/[a-zA-Z]/g, '');
const canvasStockHight = +window.getComputedStyle(canvas).height.replace(/[a-zA-Z]/g, '');

let canvasCurrWidth,
    canvasCurrHeight,
    imgDataUrl;

let currFontSize = 25;
console.log(canvasStockHight, canvasStockWidth);


let changeRatio,
    widthRatio,
    heightRatio;

let currFormX,
    currFormY;


uploader.addEventListener('change', (e) => {
    const myFile = uploader.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(myFile);
    img.onload = function () {
        canvas.height = this.naturalHeight;
        canvasCurrHeight = this.naturalHeight;
        canvas.width = this.naturalWidth;
        canvasCurrWidth = this.naturalWidth;
        
        ctx.drawImage(img, 0 , 0);
        ctx.fillStyle = '#ff2e2e'
        ctx.font = 'bold 50px sans-serif';
        changeRatio = canvasCurrHeight/canvasStockHight;
        heightRatio = canvasCurrHeight/canvasStockHight;
        widthRatio = canvasCurrWidth/canvasStockWidth;
        // ctx.fillText('Some text', 150, 150);
    }
})

function addInput () {
    const input = document.createElement('textarea');
    input.classList.add('text-input');
    input.placeholder = 'Введите'
    canvas.append(input);
}

const inputField = document.querySelector('.some-data');
const submitBtn = document.querySelector('.submit-btn');
const colorInput = document.querySelector('.color-input');
const fontSize = document.querySelector('.font-input');

inputField.addEventListener('input', () => {
    console.log(inputField.value);
})

// fontSize.addEventListener('input', () => {
//     fontS = fontSize.value;
//     currFontSize = fontS;
//     console.log(fontS)
//     inputField.style.cssText = `font-size: ${fontS}px`;
// })

submitBtn.addEventListener('click', () => {
    const text = inputField.value;
    // ctx.font = `bold ${Math.round(+fontSize.value * changeRatio)}px sans-serif`;
    ctx.font = `bold ${Math.round(+currFontSize * changeRatio)}px sans-serif`;
    ctx.fillStyle = `${colorInput.value}`;
    
    
    ctx.fillText(`${text}`, currFormX*widthRatio+20, currFormY*heightRatio+20);
    console.log(currFontSize);
    // console.log(+fontSize.value * changeRatio);


    imgDataUrl = canvas.toDataURL('image/png');

    downloadRes.href = imgDataUrl;
})

const inputWrap = document.querySelector('.input-wrap');


inputWrap.addEventListener('pointerdown', (e) => {
    console.log(e.clientX);
    console.log(inputWrap.getBoundingClientRect().x);
})

// canvas.addEventListener('click', addInput);


// Функия перемещения панели
const dragHandle = document.querySelector('.drag-handle');
const managePanel = document.querySelector('.manage-panel-wrap');

let shiftX,
    shiftY;

    let offsetNEW,
        offsetYNEW;

dragHandle.addEventListener('mousedown', (e) => {

    dragHandle.ondragstart = function() {
        return false;
      };
    offsetNEW = inputWrap.getBoundingClientRect().right - e.clientX;
    offsetYNEW = e.clientY - inputWrap.getBoundingClientRect().top;
    // let shiftX = e.clientX - inputWrap.getBoundingClientRect().left;
    // let shiftY = e.clientY - inputWrap.getBoundingClientRect().top;
    shiftX = e.clientX - window.getComputedStyle(inputWrap).left.replace(/[a-zA-Z]/g, '');
    shiftY = e.clientY - window.getComputedStyle(inputWrap).top.replace(/[a-zA-Z]/g, '');

    console.log(`PageX: ${e.pageX}, event.clientX${e.clientX}, shift ${shiftX}`)
    // moveAt(e.pageX, e.pageY);

    function yMoveAt (pageY) {
        inputWrap.style.top = pageY - shiftY + 'px';
    }

    function xMoveAt (pageX) {
        inputWrap.style.left = pageX - shiftX + 'px';
    }


    function moveAt(pageX, pageY) {
        inputWrap.style.left = pageX - shiftX + 'px';
        inputWrap.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        const inputFieldX = document.querySelector('.input-area').getBoundingClientRect().x;
        const panelLeft = inputWrap.getBoundingClientRect().x;
        const newLeft = event.clientX - shiftX;
        const rightBorder = document.querySelector('.input-area').getBoundingClientRect().right;
        const bottomBorder = document.querySelector('.input-area').getBoundingClientRect().bottom;
        const newRight = event.clientX + offsetNEW;
        const newBottom = event.clientY + offsetYNEW;
        const newTop = event.clientY - shiftY;



        currFormX = (inputWrap.getBoundingClientRect().x - document.querySelector('.input-area').getBoundingClientRect().x);
        currFormY = (inputWrap.getBoundingClientRect().y - document.querySelector('.input-area').getBoundingClientRect().y);

        // console.log(currFormX,currFormY);
        
        console.log(offsetYNEW)
      
        
        if (newLeft < 0) {
            inputWrap.style.left = '-1px';
        } else if ((rightBorder - newRight) < 0) {
            inputWrap.style.right = '-1px';
        } else {
            xMoveAt(event.pageX);
        }
        
        if (newTop < 0) {
            inputWrap.style.top = '-1px';
        } else if ((bottomBorder - event.clientY) < 0) {
            inputWrap.style.top = `${500 - offsetYNEW}px`;
        } else {
            yMoveAt(event.pageY);
        }
    }
    
    document.addEventListener('mousemove', onMouseMove);
    
    document.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        dragHandle.onmouseup = null;
    };   
})

console.log(document.querySelector('.input-area').getBoundingClientRect().right)