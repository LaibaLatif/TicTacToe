let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset-btn");   
let newGameBtn = document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO=true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  boxes.forEach((box) => {
    box.addEventListener("click",() => {
        if(turnO)
        {
            box.innerText = "O";
            box.style.color = "green"; 
            turnO = false;
        }
        else{
            box.innerText = "X";
            box.style.color = "red";
            turnO = true;
        }
        box.disabled= true;
        count++;

        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
  });

  const disableBoxes = () => {
    for(let box of boxes)
    {
        box.disabled = true;
    }
  };

  const enableBoxes = () => {
    for(let box of boxes)
    {
        box.disabled = false;
        box.innerText = "";
    }
  };

  const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msg.style.color = "#68A4F1";
    msgContainer.classList.remove("hide");
    disableBoxes();
  };

  const resetGame = () =>
  {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
  }

  const showWinner = (winner) => {
    if(winner === "O")
    {
        msg.style.color = "green";
    }
    else
    {
        msg.style.color = "red";
    }
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };

  const checkWinner = () => {
    for(let pattern of winPatterns)
    {
        let posVal1 = boxes[pattern[0]].innerText;
        let posVal2 = boxes[pattern[1]].innerText;
        let posVal3 = boxes[pattern[2]].innerText;

        if(posVal1 != "" && posVal2 != "" && posVal3 != "")
        {
            if(posVal1 === posVal2 && posVal1 === posVal3)
            {
                showWinner(posVal1);
                return true;
            }
        }
    }
  };

  newGameBtn.addEventListener("click", resetGame);
  resetbtn.addEventListener("click", resetGame);