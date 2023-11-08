const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const uploader = document.querySelector('.uploader');

const canvasStockWidth = +window.getComputedStyle(canvas).width.replace(/[a-zA-Z]/g, '');
const canvasStockHight = +window.getComputedStyle(canvas).height.replace(/[a-zA-Z]/g, '');

let canvasCurrWidth,
    canvasCurrHeight;

let currFontSize;
console.log(canvasStockHight, canvasStockWidth);
let changeRatio;


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

fontSize.addEventListener('input', () => {
    fontS = fontSize.value;
    currFontSize = fontS;
    console.log(fontS)
    inputField.style.cssText = `font-size: ${fontS}px`;
})

submitBtn.addEventListener('click', () => {
    const text = inputField.value;
    // ctx.font = `bold ${Math.round(+fontSize.value * changeRatio)}px sans-serif`;
    ctx.font = `bold ${Math.round(+currFontSize * changeRatio)}px sans-serif`;
    ctx.fillStyle = `${colorInput.value}`;
    ctx.fillText(`${text}`, 150, 150);
    console.log(currFontSize);
    console.log(+fontSize.value * changeRatio);
})

// canvas.addEventListener('click', addInput);