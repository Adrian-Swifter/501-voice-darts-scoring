let arroffids = [];
let currentScoreLeft = 501;
let currentScoreRight = 501;

for (let i = 1; i < 29; i++) {
  arroffids.push(document.getElementById(`score_${i}`));
}

arroffids.forEach((i, index) => {
  i.addEventListener("focusout", () => {
    if (index % 2 === 0) {
      currentScoreLeft = currentScoreLeft - i.value;
      document.getElementById("left").value = currentScoreLeft;
    } else {
      currentScoreRight = currentScoreRight - i.value;

      if (currentScoreRight === 0) {
        alert("Game Over!!!!");
      } else if (currentScoreRight < 0) {
        document.getElementById("right").value = document.getElementById("right").value;
        currentScoreRight = Number(currentScoreRight) + Number(i.value);
        console.log(i.value)
      } else {
        document.getElementById("right").value = currentScoreLeft;
      }
      console.log(currentScoreRight)
    }
  });
});
