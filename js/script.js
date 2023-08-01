async function preload () {
  let preloader = document.getElementById("preloader");
  preloader.innerHTML = `
    <div id="curtain-top" style="top:0;"></div>
    <div id="curtain-bottom" style="bottom:0;"></div> 
    <div id="progress-bar"></div>
  `

  let progressBar = document.getElementById("progress-bar"),
      dots = document.getElementsByClassName("dot");
  function sleep (seconds) {
    return new Promise(resolve => {
      setTimeout(resolve, seconds * 1000);
    })
  }

  function createDots () {
    const ViewportW = window.innerHeight / 100;
    const progressBarWidth = Number(
      getComputedStyle(progressBar).width.slice(0, -2)
    );
    // dot width: 4vh; + .5vh for margin
    const DOTS_NUM = parseInt(
      progressBarWidth / (4.5 * ViewportW)
    );
    let dot_HTMLcode = "<div class=\"dot\"></div>";
    progressBar.innerHTML = dot_HTMLcode.repeat(DOTS_NUM);
  }

  // show the dots
  async function showDots () {   
    for(let i = 0; i < dots.length; i++) {
      let element = dots[i];
      element.style.visibility = "visible";
      await sleep(0.1);
    }
    return sleep(0)
  }

  // draw the curtains
  function drawCurtains () {
    const animationDuration = 1;
    for (element of preloader.children) {
      if (element.id !== "progress-bar") {
        element.style.animation = `draw-the-curtains ${animationDuration}s linear`;
      }
    }
    return sleep(animationDuration)
  }


  createDots();
  // hide the dots
  dots = Object.values(dots);
  dots.forEach(element => {
    element.style.visibility = "hidden";
  })
  await showDots();
  progressBar.style.display = "none";
  await drawCurtains();
  preloader.remove();
}
// End function preload

document.addEventListener("DOMContentLoaded", preload);
// document.addEventListener("load", )
