export default function handleTextPanelMovement (setTextFormX, setTextFormY) {
    
    const addMemeWindow = document.querySelector('.add-meme-window');
    const dragHandle = document.querySelector('.drag-handle');
    
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
            const canvasFieldHeight = window.getComputedStyle(canvasField).height.replace(/[a-zA-Z]/g, '');
            
            const rightCanvasBorder = canvasField.getBoundingClientRect().right;
            const leftCanvasBorder = canvasField.getBoundingClientRect().left;
        
            const bottomCanvasBorder = canvasField.getBoundingClientRect().bottom;

            const newMemeWindowRight = event.clientX + rightOffset;
            const newMemeWindowLeft = event.clientX - leftOffset;
        
            const newTop = event.clientY - shiftY;

            setTextFormX((addMemeWindow.getBoundingClientRect().x - canvasField.getBoundingClientRect().x));
            setTextFormY((addMemeWindow.getBoundingClientRect().y - canvasField.getBoundingClientRect().y));
        
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
                addMemeWindow.style.top = `${canvasFieldHeight - topOffset}px`;
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
}