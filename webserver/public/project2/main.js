window.onload = () => {
  let skyColor = document.getElementsByClassName("elementsOfTime"); //targetting both the boxes

  let secondsBox = document.getElementById("secondsBox"); //for the tiny boxes
  let minutesBox = document.getElementById("minutesBox");

  let hourOverlay = document.getElementById("hourImage"); //for the hour picture

  let now2 = new Date();
  let secondsCount = now2.getSeconds();
  let minutesCount = now2.getMinutes();
  //   let minutesCount = 59;
  //   let secondsCount = 0;

  minutesBox.innerHTML = "";
  for (let i = 0; i < Math.min(minutesCount, 59); i++) {
    const m = document.createElement("div");
    m.className = "square";
    m.style.backgroundColor = "orange";
    minutesBox.appendChild(m);
  }

  secondsBox.innerHTML = "";
  if (minutesCount !== 59) {
    for (let i = 0; i < secondsCount; i++) {
      const s = document.createElement("div");
      s.className = "square"; // teal from CSS
      secondsBox.appendChild(s);
    }
  }

  hourOverlay.style.display = minutesCount === 59 ? "flex" : "none"; //ternary operator

  updateBoxes(skyColor); //first colours that box that specific grdaient

  // updating every real second
  setInterval(() => {
    updateBoxes(skyColor);

    secondsCount++;

    if (minutesCount === 59) {
      hourOverlay.style.display = "flex";

      if (secondsCount === 60) {
        secondsCount = 0;
        minutesCount = 0;

        hourOverlay.style.display = "none";
        minutesBox.innerHTML = "";
        secondsBox.innerHTML = "";
      }

      return; // skip adding seconds this minute
    }

    const s = document.createElement("div");
    s.className = "square";
    secondsBox.appendChild(s);

    // if we reached 60 seconds advancing the minute
    if (secondsCount === 60) {
      secondsCount = 0;
      secondsBox.innerHTML = "";

      if (minutesCount === 58) {
        minutesCount = 59;
        hourOverlay.style.display = "flex";
      } else {
        minutesCount += 1;
        const m = document.createElement("div");
        m.className = "square";
        m.style.backgroundColor = "orange";
        minutesBox.appendChild(m);
      }
    }
  }, 1000);
};

//These are the rgb values of the colours of the tested gradent I wnated at specific key frames
var FRAMES = [
  { h: 0.0, top: [5, 8, 20], bottom: [0, 0, 10] },
  { h: 5.0, top: [20, 24, 60], bottom: [10, 10, 30] },
  { h: 6.5, top: [255, 120, 80], bottom: [80, 100, 180] },
  { h: 12.0, top: [120, 180, 255], bottom: [180, 220, 255] },
  { h: 17.5, top: [255, 140, 90], bottom: [90, 90, 160] },
  { h: 19.5, top: [120, 30, 90], bottom: [10, 10, 40] },
  { h: 24.0, top: [5, 8, 20], bottom: [0, 0, 10] },
];

function lerp(x, y, a) {
  return x + (y - x) * a; //formula from the definition of lerp() on p5.js
}

function mixRGB(c1, c2, a) {
  return [lerp(c1[0], c2[0], a), lerp(c1[1], c2[1], a), lerp(c1[2], c2[2], a)];
}

function rgbCss(arr) {
  return "rgb(" + Math.round(arr[0]) + ", " + Math.round(arr[1]) + ", " + Math.round(arr[2]) + ")";
}

function colorsAt(hour) {
  // figuring out which two keyframes the current time sits between
  let nextIndex = 1;
  while (nextIndex < FRAMES.length && hour > FRAMES[nextIndex].h) {
    nextIndex++;
  }
  const prevFrame = FRAMES[nextIndex - 1];
  const nextFrame = FRAMES[nextIndex % FRAMES.length];

  // how many hours are between the two frames
  const intervalHours = Math.max(1e-9, nextFrame.h - prevFrame.h);

  let t = (hour - prevFrame.h) / intervalHours;

  if (t < 0) t = 0;
  if (t > 1) t = 1;

  t = t * t * (3 - 2 * t);

  return {
    top: mixRGB(prevFrame.top, nextFrame.top, t),
    bottom: mixRGB(prevFrame.bottom, nextFrame.bottom, t),
  };
}

function updateBoxes(skyColorCollection) {
  let now = new Date();
  let hourFloat = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;

  let result = colorsAt(hourFloat);
  let topCss = rgbCss(result.top);
  let bottomCss = rgbCss(result.bottom);
  let bg = "linear-gradient(to bottom, " + topCss + ", " + bottomCss + ")";

  for (let i = 0; i < skyColorCollection.length; i++) {
    skyColorCollection[i].style.background = bg;
  }
}
