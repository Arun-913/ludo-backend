this is a Ludo Backend Repo

Ludo Grid:
![image](https://github.com/Arun-913/ludo-backend/assets/138594295/38d9d300-9317-47d6-ad86-5ed88f90a719)


We have to provide the dice, move(dice number[1-6]), currState(current state of the dice)
For e.g.
dice - b1, y1, r4, etc
move - 1, 2, etc
currState - b11, r34, etc

In response, it will provide the json object if form of :-
{
  nextMove: string,
  playerWon: boolean,
  diceWon: boolean,
  killOther: [boolean, string],
  rollDiceAgain: boolean
}

where,
nextMove - nextMove place where dice to move
playerWon - If the current player won the match or not  i.e. color yellow, red, green or blue won the match or not)
diceWon: whether current dice won or not
killOther: it will retrun array where the first element will which represent the whether the dice killed other dice or not and second element represent the dice who killed
rollDiceAgain - it tells that the current player will roll the dice again or not in the case of single dice won or killed other dice
