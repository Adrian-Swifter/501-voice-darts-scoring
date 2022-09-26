import {
  recognition,
  speechRecognitionList,
  grammar,
} from "./speech-recognition.js";

let currentScoreLeft = 501;
let currentScoreRight = 501;
let leftScore = document.getElementById("left");
let rightScore = document.getElementById("right");
let tempArrOfInputs = [];
const scoreInputs = document.getElementsByClassName("score-inputs")[0];
let arroffids = [];
let scoreInputArr = Array.from(document.querySelectorAll(".score-input"));

speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

//GET ALL THE ID's OF SCORE INPUTS
for (let i = 1; i <= scoreInputArr.length; i++) {
  if (!arroffids.includes(document.querySelector(`#score_${i}`)))
    arroffids.push(document.querySelector(`#score_${i}`));
}

//SCORE SUBSTRACTING AND LOGIC
recursivelySubstractScoreAndAddNewScoreInputs(arroffids);

//FUNCTION TO CHECK THE SCORE AND SUBTRACT
function checkScore(currentScore, score, currentElement, index) {
  if (currentScore === 0) {
    alert("Game Over!!!");
    window.location.href = window.location.href;
  } else if (currentScore < 2) {
    score.value = score.value;
    currentScore =
      Number(currentScore) + Math.abs(Number(currentElement.value));
    arroffids[index].value = 0;
  } else {
    score.value = currentScore;
    arroffids[index].value = Math.abs(arroffids[index].value);
  }
}

//CREATE PAIR OF INPUTS WHEN THE MINIMUM NEEDED INPUTS NUMBER IS EXCEEDED
function createNewInputs(currentIndex) {
  const newInput1 = document.createElement("input");
  newInput1.className = "score-input";
  newInput1.setAttribute("id", `score_${currentIndex + 1}`);
  newInput1.type = "number";

  const newInput2 = document.createElement("input");
  newInput2.className = "score-input";
  newInput2.setAttribute("id", `score_${currentIndex + 2}`);
  newInput2.type = "number";

  scoreInputs.appendChild(newInput1);
  scoreInputs.appendChild(newInput2);

  newInput1.focus();
}

export function recursivelySubstractScoreAndAddNewScoreInputs(arrayOfElements) {
  arrayOfElements.forEach((i, index) => {
    i.addEventListener("keyup", (e) => {
      if (e.keyCode === 13 && i.value <= 180) {
        //CREATING NEW INPUTS IF NEEDED AND UPDATING ARRAY WITH ALL THE SCORE INPUTS
        if (
          i.getAttribute("id").split("_")[1] >= 6 &&
          Number(i.getAttribute("id").split("_")[1]) % 2 === 0
        ) {
          createNewInputs(Number(i.getAttribute("id").split("_")[1]));
          scoreInputArr = Array.from(document.querySelectorAll(".score-input"));
          for (let i = 1; i <= scoreInputArr.length; i++) {
            if (!arroffids.includes(document.querySelector(`#score_${i}`)))
              arroffids.push(document.querySelector(`#score_${i}`));
          }
          recursivelySubstractScoreAndAddNewScoreInputs(arroffids);
        }

        if (index % 2 === 0) {
          currentScoreLeft = currentScoreLeft - Math.abs(i.value);
          checkScore(currentScoreLeft, leftScore, i, index);
        } else {
          currentScoreRight = currentScoreRight - Math.abs(i.value);
          checkScore(currentScoreRight, rightScore, i, index);
        }

        arrayOfElements[index + 1].focus();
      }
    });

    //START VOICE RECOGNITION ON INPUT CLICK
    i.addEventListener("click", () => {
      //CHECK TO SEE IF WE ARE CLICKING THE SAME INPUT TWICE TO START VOICE RECOGNITION
      tempArrOfInputs.push(arroffids[index]);
      if (
        tempArrOfInputs.length === 2 &&
        tempArrOfInputs.every((el) => el === tempArrOfInputs[0])
      ) {
        recognition.start();
        console.log("Ready to receive a number command.");
        recognition.onresult = function (event) {
          let last = event.results.length - 1;
          let number = event.results[last][0].transcript;
          arroffids[index].value = number;
        };
      }

      if (tempArrOfInputs.length === 2) {
        tempArrOfInputs.length = 0;
      }
    });
  });
}
