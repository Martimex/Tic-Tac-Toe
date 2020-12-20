const grid = document.querySelector('#grid-container');
const tiles = grid.querySelectorAll('.tile');
const reset = document.querySelector(".btn");

let turn = 1;

let board = [

    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
]

let p1moves = [];
let p2moves = [];

function checkResult(tab)
{
    isDraw();

    const win = [[1,2,3], [1,4,7], [1,5,9], [2,5,8], [3,5,7], [3,6,9], [4,5,6], [7,8,9]];
    
    for(let i=0; i<=7; i++)
    {
        if(win[i].every(r=> tab.includes(r)))
        { whoWins(); i=i+8}
    }
}

function isDraw()
{
    (turn === 10)? document.getElementById("winner").innerText = "Draw!" : "";
}

reset.addEventListener('click', (e) => {
    turn = 1;
    //p1moves.splice(0);  Would it work??
    //p2moves.splice(0);  Would it work??
    
    for(let j=0; j<=2; j++)
    {
        for(let k=0; k<=2; k++)
        {
          board[j][k] = "";
        }
    }
})

function whoWins()
{
    (turn%2 === 1)? document.getElementById("winner").innerText = "Circle wins!" 
    : document.getElementById("winner").innerText = "Cross wins!";

    tiles.forEach(tile => tile.removeEventListener('click', foo));
}

tiles.forEach(tile => tile.addEventListener('click', foo));  

function foo(e) {
    const trgt = e.target;

    if(!(trgt.classList.contains('icon-cancel')) || (trgt.classList.contains('icon-circle-empty')))
    {   (turn %2 === 1)? trgt.classList.add('icon-cancel') : trgt.classList.add('icon-circle-empty');

        (turn %2 === 1)? board[trgt.dataset.rows][trgt.dataset.columns] = 'x'
        : board[trgt.dataset.rows][trgt.dataset.columns] = 'o';

        let num = ((parseInt(trgt.dataset.rows)) * 3 + (parseInt(trgt.dataset.columns)+1));

        if(turn %2 === 1) {p1moves.push(num); turn++; checkResult(p1moves);}
        else {p2moves.push(num); turn++; checkResult(p2moves);}
    }

}

