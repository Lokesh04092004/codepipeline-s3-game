const pieces = document.querySelectorAll('.piece');

pieces.forEach(piece => {
    piece.addEventListener('dragstart', dragStart);
    piece.addEventListener('dragend', dragEnd);
});

const board = document.querySelector('.board');

board.addEventListener('dragover', dragOver);
board.addEventListener('drop', drop);

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.className);
    e.target.classList.add('dragging');
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const pieceClass = e.dataTransfer.getData('text/plain');
    const piece = document.querySelector(`.${pieceClass}`);
    
    const rect = board.getBoundingClientRect();
    const x = e.clientX - rect.left - (piece.offsetWidth / 2);
    const y = e.clientY - rect.top - (piece.offsetHeight / 2);
    
    piece.style.left = `${x}px`;
    piece.style.top = `${y}px`;
}
