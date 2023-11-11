export default function handleTextPanelChange () {
    
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
}