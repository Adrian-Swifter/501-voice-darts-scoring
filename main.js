import "./functions.js";

//PLAYER NAMES
(function () {
  let player = document.querySelectorAll(".player");
  let playerArr = Array.from(player);
  playerArr.forEach((i, ind) => {
    i.innerHTML =
      JSON.parse(localStorage.getItem(`player${ind + 1}`)) ||
      `Player ${ind + 1}`;
    i.addEventListener("click", function (e) {
      if (i.firstElementChild === null) {
        i.innerHTML = `<input type="text" placeholder="Player ${ind + 1}...">`;
        i.firstElementChild.focus();
      }

      i.firstElementChild.addEventListener("keyup", function (e) {
        localStorage.setItem(
          `player${ind + 1}`,
          JSON.stringify(i.firstElementChild.value)
        );
        if (e.keyCode === 13) {
          i.innerHTML = JSON.parse(localStorage.getItem(`player${ind + 1}`));
        }
      });
    });
  });
})();
