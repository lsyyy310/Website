async function preload () {
  let preloader = document.getElementById("preloader");
  preloader.innerHTML = `
      <div id="curtain"></div>
      <div id="ring"></div>
  `

  function sleep (seconds) {
    return new Promise(resolve => {
      setTimeout(resolve, seconds * 1000);
    })
  }

  // draw the curtains
  function drawCurtains () {
    const animationDuration = 1;
    return sleep(animationDuration * 1.5)
  }

  let head = document.head;
      ring = document.getElementById("ring"),
      ringWidth = getComputedStyle(ring).width.slice(0, -2);
  function setFontSize () {
    if (ringWidth == 104) {
      return "16px"
    } else {
      return `${ringWidth / 7}px`
    }
  }

  const fontSize = setFontSize();
  head.innerHTML += `
  <style>
    #ring::after {
      font-size: ${fontSize};
    }
  </style>
  `;
  await drawCurtains();
  preloader.remove();
}
// End function preload

document.addEventListener("DOMContentLoaded", function () {
  preload();
  let pageBottom = document.getElementById("page__bottom");
  pageBottom.setAttribute("date", "Aug 2, 2023");
});
// document.addEventListener("load", )
