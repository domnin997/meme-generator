export default function handleFontSizeChange () {
    
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
}