let boxes = document.querySelectorAll(".boxes");
let turnO = true;
let win_msg = document.querySelector("p");
let cntDisabled = 0;
let tapAudio = document.querySelector("#tapAudio");
tapAudio.volume = 1;
let winAudio = document.querySelector("#winAudio");
winAudio.volume = 0.2;

let newGamebtn = document.querySelector("#newGame");
newGamebtn.addEventListener("click", () => {
    tapAudio.play();
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
    win_msg.classList.add("hide");
    cntDisabled = 0;
});

let winCondi = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

showWinner = () => {
    win_msg.classList.remove("hide");
    if (turnO) {
        winAudio.play();
        win_msg.innerText = "Player X has won the game!";
    }
    else {
        winAudio.play();
        win_msg.innerText = "Player O has won the game!";
    }
}

let draw = () => {
    console.log("helo");
    win_msg.classList.remove("hide");
    win_msg.innerText = "The game is draw, start new game to play again";
};


let checkWinner = () => {

    for (let indices of winCondi) {
        let val1 = boxes[indices[0]].innerText;
        let val2 = boxes[indices[1]].innerText;
        let val3 = boxes[indices[2]].innerText;
        if (val1 != "" && val2 != "" && val3 != "") {
            if (val1 === val2 && val2 === val3) {
                showWinner();
                disableBoxes();
                return;
            }
        }
    }
};
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            tapAudio.play();
            turnO = false;
        }
        else {
            box.innerText = "X";
            tapAudio.play();
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
        cntDisabled++; // to check draw
        if (cntDisabled === 9)
            draw();
    });
});

