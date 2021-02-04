var playing = false;
var score;
var action;
var timeRemaining;
var correctAnswer;

// if we click on the start/reset button
document.getElementById("start-reset").onclick = function () {
  // if we are playing
  if (playing == true) {
    location.reload(); // reload the page
    // if we are not playing
  } else {
    // change mode to playing
    playing = true;

    score = 0; // set score to 0
    document.getElementById("scoreValue").innerHTML = score;

    //show countdown box
    show("time-remaining");

    timeRemaining = 60;
    document.getElementById("timeremainingvalue").innerHTML = timeRemaining;

    // hides game over div after you click start game
    hide("game-over");

    // change button to reset
    document.getElementById("start-reset").innerHTML = "Reset Game";

    // start countdown
    startCountdown();

    // generate new Q&A
    generateQA();
  }
};

// for loop to apply the correct and wrong answer rules to boxes 1-4
for (i = 1; i < 5; i++) {
  // clicking on an answer box
  document.getElementById("box" + i).onclick = function () {
    // check if we are playing
    if (playing == true) {
      //   this is in reference to th box1 element we onclicked
      if (this.innerHTML == correctAnswer) {
        // correct answer

        //   increase score
        score++;

        document.getElementById("scoreValue").innerHTML = score;

        //   hide wrong box and show correct
        hide("wrong");
        show("correct");

        setTimeout(function () {
          hide("correct");
        }, 1000);

        //   generate new question
        generateQA();
      } else {
        //   wrong answer
        hide("correct");
        show("wrong");

        setTimeout(function () {
          hide("wrong");
        }, 1000);
      }
    }
  };
}
// if we click on an answer box
// if we are playing
// correct?
// yes
// increase score
// show correct box for 1 sec
// generate new Q&A
// no
// try again box for 1 sec

// functions section

// start counter
function startCountdown() {
  action = setInterval(function () {
    timeRemaining--;

    document.getElementById("timeremainingvalue").innerHTML = timeRemaining;

    if (timeRemaining == 0) {
      stopCountdown();

      show("game-over");
      document.getElementById("game-over").innerHTML =
        "<p>Game over!</p><p>Your score is " + score + "!</p>";

      hide("time-remaining");
      hide("correct");
      hide("wrong");
      playing = false;
      document.getElementById("start-reset").innerHTML = "Start Game";
    }
  }, 1000);
}

// stop counter
function stopCountdown() {
  clearInterval(action);
}

// hide a certain element
function hide(Id) {
  document.getElementById(Id).style.display = "none";
}

// show a certain element
function show(Id) {
  document.getElementById(Id).style.display = "block";
}

// generate question and multiple answers
function generateQA() {
  // we want numbers 1-10 this way if it landed a 0 it would at one
  var x = 1 + Math.round(Math.random() * 9);
  var y = 1 + Math.round(Math.random() * 9);
  correctAnswer = x * y;

  document.getElementById("question").innerHTML = x + "x" + y;

  var correctPosition = 1 + Math.round(Math.random() * 3);

  //   fills one box at random with the correct answer
  document.getElementById("box" + correctPosition).innerHTML = correctAnswer;

  var answers = [correctAnswer];
  //   fill other boxes with wrong answers
  for (i = 1; i < 5; i++) {
    if (i != correctPosition) {
      // wrong answer
      var wrongAnswer;

      //   using a dowhile loop makes it so that piece of code is exectued first before the check statement
      do {
        wrongAnswer =
          (1 + Math.round(Math.random() * 9)) *
          (1 + Math.round(Math.random() * 9));

        //translation: while the wrong answer is in the array keep generating wrong answers
        // also note: if the index is not greater than 0 or strictly -1 than its value is not inside the array
      } while (answers.indexOf(wrongAnswer) > -1);

      //   the wrong answer that is not in the array will be pushed into the array
      // this makes it so there are no duplicate wrong answer values
      document.getElementById("box" + i).innerHTML = wrongAnswer;

      answers.push(wrongAnswer);
    }
  }
}
// var playing = false;
// var startReset = document.getElementById("start-reset");
// var counter = document.getElementById("timeremainingvalue");
// var score = 0;
// var x, y, questions;

// function startGame() {
//   startReset.innerHTML = "Reset Game";
//   var startTime = 60;
//   playing = true;

//   document.getElementById("time-remaining").style.display = "initial";

//   x = Math.round(Math.random() * 10);
//   y = Math.round(Math.random() * 10);
//   questions = [x + "x" + y, x + "x" + y];

//   document.getElementById("question").innerHTML = questions[1];

//   var myCounter = setInterval(function () {
//     startTime--;
//     counter.innerHTML = startTime;

//     if (startTime == 0) {
//       clearInterval(myCounter);
//       document.getElementById("game-over").style.display = "initial";
//       document.getElementById("game-over").innerHTML =
//         "<p>Game over!</p><p>Your score is " + score + "!</p>";
//     }
//   }, 1000);

//   if (playing == true) {
//     document.getElementById("start-reset").onclick = function () {
//       window.location.reload(false);
//     };
//   }
// }
