const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const uploader = document.querySelector('.uploader');

uploader.addEventListener('change', (e) => {
    const myFile = uploader.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(myFile);
    img.onload = function () {
        canvas.height = this.naturalHeight;
        canvas.width = this.naturalWidth;
        ctx.drawImage(img, 0 , 0);
        ctx.fillStyle = '#ff2e2e'
        ctx.font = 'bold 50px sans-serif';
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

submitBtn.addEventListener('click', () => {
    const text = inputField.value;
    ctx.font = `bold ${fontSize.value} sans-serif`;
    ctx.fillStyle = `${colorInput.value}`;
    ctx.fillText(`${text}`, 150, 150);
})

// canvas.addEventListener('click', addInput);