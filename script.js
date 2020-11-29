let wordsArray = [
  "student",
  "slow",
  "tradition",
  "shine",
  "ferry",
  "intensify",
  "physics",
  "freedom",
  "animal",
  "consumer",
  "direction",
  "generation",
  "earthflax",
  "proof",
  "session",
  "belief",
  "activate",
  "disaster",
  "scale",
  "understand",
  "voyage",
  "exercise",
  "notion",
  "conscious",
  "speculate",
  "prize",
  "transform",
  "enlarge",
  "offer",
  "recognize",
  "nonremittal",
  "show",
  "appointment",
  "sickness",
  "die",
  "subway",
  "scheme",
  "lodge",
  "democratic",
  "solution",
  "cafe",
  "stun",
  "infrastructure",
  "bench",
  "floor",
  "smile",
  "offensive",
  "choice",
  "joint",
  "lung",
];

let words = wordsArray;

const wordsLength = words.length;
let waterHeight = 0;

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

document.querySelector("#start").addEventListener("click", () => {
  startGame();
});

function startGame() {
  if (document.querySelector("#start")) {
    document.querySelector("#start").removeEventListener("click", () => {});
    document.querySelector("#start").remove();
    document.querySelector("#instructions").remove();
    document.querySelector(".game").removeAttribute("hidden");
  }
  waterHeight = 0;
  document
    .querySelector(".water")
    .setAttribute("style", "height:" + waterHeight + "vh");
  let index = 0;
  let wordInterval = setInterval(() => {
    if (index >= wordsArray.length) {
      clearInterval(wordInterval);
      setTimeout(() => {
        document.querySelector(
          "#scoreOutput"
        ).innerHTML = `You got the water to ${Math.round(waterHeight)}% !`;
        document.querySelector("#overlay").removeAttribute("hidden");
      }, 1000 * 10);
    } else {
      createWordRain(words[index]);
      index = index + 1;
    }
  }, 1500);
}

document.querySelector("#wordInput").addEventListener("keyup", (e) => {
  let currentValue = document.querySelector("#wordInput").value;
  currentValue = currentValue.toLowerCase();
  if (words.includes(currentValue)) {
    const index = words.indexOf(currentValue);
    removeWordRain(currentValue);
    words.splice(index, 1);
    document.querySelector("#wordInput").value = "";
    const newHeight = 100 / wordsArray.length;
    waterHeight += newHeight;
    document
      .querySelector(".water")
      .setAttribute("style", "height:" + waterHeight + "vh");
  }
});

function createWordRain(word) {
  if (word !== "undefined") {
    const newEl = document.createElement("span");
    newEl.setAttribute("id", word);
    newEl.setAttribute(
      "class",
      "rainEl text-2xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl"
    );
    newEl.innerHTML = word;
    newEl.setAttribute(
      "style",
      "left:" + Math.floor(Math.random() * 6) + 1 + "vw"
    );
    document.querySelector(".rain").appendChild(newEl);
  }
}

function removeWordRain(word) {
  document.querySelector(`#${word}`).remove();
}

function onSubmit(e) {
  e.preventDefault();
  return false;
}

document.querySelector("#highlightStart").addEventListener("click", () => {
  document.querySelector("#start").classList.add("ring-4");
  document.querySelector("#start").classList.add("ring-green-400");

  document
    .querySelector("#highlightStart")
    .removeEventListener("click", () => {});
  document.querySelector("#start").remove();
  document.querySelector("#instructions").remove();
  document.querySelector(".game").removeAttribute("hidden");
  startGame();
});

document.querySelector("#retryNo").addEventListener("click", () => {
  document.location.reload();
});

document.querySelector("#retryYes").addEventListener("click", () => {
  words = wordsArray;
  startGame();
  document.querySelector("#overlay").setAttribute("hidden", true);
});
