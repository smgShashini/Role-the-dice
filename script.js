"use strict";

/*
Author      : Shashini Maheshika Gunawardhaana 
Description : Player wins when the target is complete within 3 attempts
Date        : 2021/06/26

*/

//***************************************[Begin : Variables and functions ]***************************************
const btnStart = document.querySelector(".btn--start");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnAgain = document.querySelector(".btn--again");
const btnExit = document.querySelector(".btn--exit");
const diceEle = document.querySelector(".dice");
const modalWin = document.querySelector(".modal-win");
const modalLost = document.querySelector(".modal-lost");
const overlay = document.querySelector(".overlay");
const targetEle = document.getElementById("target");
const pointsEle = document.getElementById("points");
const attemptsEle = document.getElementById("attempts");
const extLostEle = document.getElementById("exitLost");

let target;
let points;
let attempts;
let diceRollAvtive = false;

const initialState = function () {
  targetEle.textContent = 0;
  pointsEle.textContent = 0;
  attemptsEle.textContent = 0;
  diceEle.src = "dice.png";
};

const generateTarget = function () {
  let number = Math.trunc(Math.random() * 18) + 1;
  if (number < 8) {
    number += 7;
  }
  return number;
};

const startNewGame = function () {
  target = Number(generateTarget());
  points = target;
  attempts = 3;
  targetEle.textContent = target;
  pointsEle.textContent = points;
  attemptsEle.textContent = attempts;
  diceRollAvtive = true;
};

//***************************************[End  : Variables and functions ]***************************************

initialState();
btnStart.addEventListener("click", startNewGame);

// [Roll dice button click event]_________________________________________________________________________________
btnRoll.addEventListener("click", function () {
  if ((attempts <= 3 || attempts >= 1) && diceRollAvtive === true) {
    const diceVal = Math.trunc(Math.random() * 6) + 1;
    diceEle.src = `dice-${diceVal}.png`;
    attempts--;
    attemptsEle.textContent = attempts;
    points -= diceVal;
    pointsEle.textContent = points;
    if (attempts === 0 && (points === 0 || points < 0)) {
      //Congratulations
      modalWin.classList.remove("hidden");
      overlay.classList.remove("hidden");
    } else if (attempts === 0 && points > 0) {
      modalLost.classList.remove("hidden");
      overlay.classList.remove("hidden");
    } else if (points === 0 && attempts <= 2) {
      modalWin.classList.remove("hidden");
      overlay.classList.remove("hidden");
    }
  }
});

//[New game button click event]________________________________________________________________________________________
btnNew.addEventListener("click", function () {
  modalWin.classList.add("hidden");
  overlay.classList.add("hidden");
  diceRollAvtive = true;
  initialState();
  startNewGame();
});

//[Try again button click event]________________________________________________________________________________________
btnAgain.addEventListener("click", function () {
  modalLost.classList.add("hidden");
  overlay.classList.add("hidden");
  diceEle.src = "dice.png";
  points = target;
  attempts = 3;
  diceRollAvtive = true;
  pointsEle.textContent = points;
  attemptsEle.textContent = attempts;
});

//[Exit the game button click event : win state]__________________________________________________________________________
btnExit.addEventListener("click", function () {
  console.log("Exit was clicked");
  overlay.classList.add("hidden");
  modalWin.classList.add("hidden");
  modalLost .classList.add("hidden");
  initialState();
});

//[Exit the game button click event : loose state]________________________________________________________________________
  extLostEle.addEventListener("click", function () {
  overlay.classList.add("hidden");
  modalLost.classList.add("hidden");
  initialState();
});
