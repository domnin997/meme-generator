export default function handleCanvas () {

    const canvas = document.querySelector('.canvas');
    const context = canvas.getContext('2d');
    const uploader = document.querySelector('.uploader');
    const downloadRes = document.getElementById('resultDownload');
    const paintTextBtn = document.querySelector('.paint-text-btn');
    const colorInput = document.querySelector('.color-input');
    const memeInput = document.querySelector('.meme-text');

    const canvasStockWidth = +window.getComputedStyle(canvas).width.replace(/[a-zA-Z]/g, '');
    const canvasStockHight = +window.getComputedStyle(canvas).height.replace(/[a-zA-Z]/g, '');

    let canvasCurrWidth,
        canvasCurrHeight,
        imgDataUrl;

    let widthRatio,
        heightRatio;

    uploader.addEventListener('change', () => {
      
      const myFile = uploader.files[0];
      const img = new Image();
            img.src = URL.createObjectURL(myFile);
            img.onload = function () {

                canvas.height = this.naturalHeight;
                canvasCurrHeight = this.naturalHeight;
                canvas.width = this.naturalWidth;
                canvasCurrWidth = this.naturalWidth;

                context.drawImage(img, 0 , 0);
                context.fillStyle = '#ff2e2e';
                context.font = 'bold 50px sans-serif';
    
                heightRatio = canvasCurrHeight/canvasStockHight;
                widthRatio = canvasCurrWidth/canvasStockWidth;
        }
    })
    
    paintTextBtn.addEventListener('click', () => {
        
        const text = memeInput.value;
        
        context.font = `bold ${Math.round(+currFontSize * heightRatio)}px sans-serif`;
        context.fillStyle = `${colorInput.value}`;
        context.fillText(`${text}`, currFormX*widthRatio+10, currFormY*heightRatio+40);
    
        imgDataUrl = canvas.toDataURL('image/png');
    
        downloadRes.href = imgDataUrl;
    })
}