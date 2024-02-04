const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
const winMsgTxt = document.querySelector('[data-win-msg-txt]');
const winMsg  = document.querySelector('[data-win-msg]');
const winBtn = document.querySelector('[data-win-msg-btn]');

let isCircleTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
];

const startGame = () => {
    isCircleTurn = false;

    for (const cell of cellElements) {
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    }

    setBoardHoverClass();
    winMsg.classList.remove("show-win-msg");
};

const endGame = (isDraw) => {
    if (isDraw) {
        winMsgTxt.innerText = "Empate";
    } else {
        winMsgTxt.innerText = isCircleTurn ? "Circulo venceu!" : "X venceu!";
    }

    winMsg.classList.add("show-win-msg");
};

const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    }));
};

const checkForDraw = () => {
    return [... cellElements].every((cell => {
        return cell.classList.contains("x") || cell.classList.contains("circle");
    }));
};

const setBoardHoverClass = () => {
    board.classList.remove("circle");
    board.classList.remove("x");

    if (isCircleTurn) {
        board.classList.add("circle");
    } else {

    } board.classList.add("x");
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    setBoardHoverClass();
};

const handleClick = (e) => {
    // put the mark (x or cicle).
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    cell.classList.add(classToAdd);
    //check victory
    const isWin = checkForWin(classToAdd);
    
    //check tie
    const isDraw = checkForDraw();

    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        //change symbol
        swapTurns();
    }

};

startGame();
winBtn.addEventListener('click', startGame);