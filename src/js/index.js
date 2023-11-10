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

let widthRatio,
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

        heightRatio = canvasCurrHeight/canvasStockHight;
        widthRatio = canvasCurrWidth/canvasStockWidth;
    }
})

const submitBtn = document.querySelector('.submit-btn');
const colorInput = document.querySelector('.color-input');

// Работа с размерами шрифта

const fontIncrease = document.querySelector('.font-plus-btn');
const fontDecrease = document.querySelector('.font-minus-btn');
const fontSizeCont = document.querySelector('.font-size-cont');
const memeInput = document.querySelector('.meme-text');

fontIncrease.addEventListener('click', () => {
    ++currFontSize;
        fontSizeCont.innerText = currFontSize;
            memeInput.style.cssText = `font-size: ${currFontSize}px`;
});

fontDecrease.addEventListener('click', () => {
    if (currFontSize > 1) {
        --currFontSize;
            fontSizeCont.innerText = currFontSize;
                memeInput.style.cssText = `font-size: ${currFontSize}px`;
    }
    
})

submitBtn.addEventListener('click', () => {
    const text = memeInput.value;
    ctx.font = `bold ${Math.round(+currFontSize * heightRatio)}px sans-serif`;
    ctx.fillStyle = `${colorInput.value}`;
    ctx.fillText(`${text}`, currFormX*widthRatio+10, currFormY*heightRatio+40);

    imgDataUrl = canvas.toDataURL('image/png');

    downloadRes.href = imgDataUrl;
})

// Функия перемещения панели
const addMemeWindow = document.querySelector('.add-meme-window');
const dragHandle = document.querySelector('.drag-handle');
const managePanel = document.querySelector('.manage-panel-wrap');

let shiftX,
    shiftY;

let leftOffset,
    rightOffset,
    topOffset;

dragHandle.addEventListener('mousedown', (e) => {
    
    shiftX = e.clientX - window.getComputedStyle(addMemeWindow).left.replace(/[a-zA-Z]/g, '');
    shiftY = e.clientY - window.getComputedStyle(addMemeWindow).top.replace(/[a-zA-Z]/g, '');

    dragHandle.ondragstart = function() {
        return false;
    };

    rightOffset = addMemeWindow.getBoundingClientRect().right - e.clientX;
    leftOffset = e.clientX - addMemeWindow.getBoundingClientRect().left;
    topOffset = e.clientY - addMemeWindow.getBoundingClientRect().top;
    
    function yMoveAt (pageY) {
        addMemeWindow.style.top = pageY - shiftY + 'px';
    }

    function xMoveAt (pageX) {
        addMemeWindow.style.left = pageX - shiftX + 'px';
    }

    function onMouseMove(event) {
        const canvasField = document.querySelector('.input-area');

        const newLeft = event.clientX - shiftX;
        
        const rightCanvasBorder = canvasField.getBoundingClientRect().right;
        const leftCanvasBorder = canvasField.getBoundingClientRect().left;
        
        const bottomCanvasBorder = canvasField.getBoundingClientRect().bottom;

        const newMemeWindowRight = event.clientX + rightOffset;
        const newMemeWindowLeft = event.clientX - leftOffset;
        
        const newTop = event.clientY - shiftY;

        currFormX = (addMemeWindow.getBoundingClientRect().x - canvasField.getBoundingClientRect().x);
        currFormY = (addMemeWindow.getBoundingClientRect().y - canvasField.getBoundingClientRect().y);

        
        if (newMemeWindowLeft < leftCanvasBorder) {
            addMemeWindow.style.left = '0px';
        } 
        else if (newMemeWindowRight > rightCanvasBorder) {
            addMemeWindow.style.right = '0px';
        } 
        else {
            xMoveAt(event.pageX);
        }
        
        if (newTop < 0) {
            addMemeWindow.style.top = '-1px';
        } 
        else if (event.clientY > bottomCanvasBorder) {
            addMemeWindow.style.top = `${500 - topOffset}px`;
        }
        else {
            yMoveAt(event.pageY);
        }
    }
    
    document.addEventListener('mousemove', onMouseMove);
    
    document.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        dragHandle.onmouseup = null;
    };   
})


// Блок с изменением размера рабочего поля

    const element = document.querySelector('.add-meme-window');
    const resizer = document.querySelector('.resizer');

    resizer.addEventListener('mousedown', (e) => {
      e.preventDefault();
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
    })
    
    function resize(e) {
      const newWidth = e.clientX - element.getBoundingClientRect().left;
        if (newWidth > 130 && newWidth < 350) {
            element.style.width = `${newWidth}px`;
        }
    }
 
    function stopResize() {
        document.removeEventListener('mousemove', resize);
    }