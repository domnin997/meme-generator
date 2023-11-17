export default function handleFontSizeChange (decreaseFont, increaseFont, getFontSize) {
    
    const fontIncrease = document.querySelector('.font-plus-btn');
    const fontDecrease = document.querySelector('.font-minus-btn');
    const fontSizeCont = document.querySelector('.font-size-cont');
    const memeInput = document.querySelector('.meme-text');

    fontIncrease.addEventListener('click', () => {
        increaseFont();
            const currFont = getFontSize();
                fontSizeCont.innerText = currFont;
                    memeInput.style.cssText = `font-size: ${currFont}px`;
    });

    fontDecrease.addEventListener('click', () => {
        if (getFontSize() > 1) {
            decreaseFont();
                const currFont = getFontSize();
                    fontSizeCont.innerText = currFont;
                        memeInput.style.cssText = `font-size: ${currFont}px`;
        }  
    })
}