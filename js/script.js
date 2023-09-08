const currentUrl = location.pathname.split("/").pop(),
      urls = {"index": "index.html"}

function sleep(seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  })
}
async function preload() {
  const preloader = document.getElementById("preloader");
  preloader.innerHTML = `
      <div id="curtain"></div>
      <div id="ring"></div>
  `

  const head = document.head,
        ring = document.getElementById("ring"),
        ringWidth = getComputedStyle(ring).width.slice(0, -2);
  function drawCurtains () {
    const rotationDuration = getComputedStyle(ring, "::before").animationDuration.slice(0, -1);
    return sleep(rotationDuration * 1.5)
  }

  function setFontSize() {
    if (ringWidth == 104) {
      return "16px"
    }
    else {
      return `${Math.round(ringWidth / 7)}px`
    }
  }

  const fontSize = setFontSize();
  head.innerHTML += `
  <style id="preloader__style">
    #ring::after {
      font-size: ${fontSize};
    }
  </style>
  `;
  const preloaderStyle = document.getElementById("preloader__style");
  await drawCurtains();
  preloader.remove();
  preloaderStyle.remove();
  return sleep(0)
}
// End function preload

function writeHTML () {
  const navbar = document.getElementById("navbar"),
        footer = document.getElementById("footer");
  navbar.innerHTML = `
    <div id="navbar--left">
      <button id="side-header__button" class="center--v"><i class="fa-solid fa-bars"></i></button>
    </div>
    <nav id="navbar--right">
      <a class="menu__item" href="./index.html">HOME</a>
      <a class="menu__item" href="./about.html">ABOUT</a>
      <a class="menu__item" href="./project.html">PROJECT</a>
      <a class="menu__item" href="./contact.html">CONTACT</a>
    </nav>
  `;
  if (footer !== null) {
    footer.setAttribute("date", "Sep 2, 2023")
  }
}

async function typingEffect(word) {
  const name = document.getElementById("name");
  for(let letter of word) {
    name.innerHTML += letter;
    await sleep(0.15);
  }
}

function changeIcon(button) {
  const bars = `<i class="fa-solid fa-bars"></i>`,
        xMark =  `<i class="fa-solid fa-xmark"></i>`,
        sideHeader = document.getElementById("side-header");
  let sideHeaderDisplay = getComputedStyle(sideHeader).display;
  if (sideHeaderDisplay === "initial") {
    button.innerHTML = bars;
    sideHeader.style = ""


  }
  else {
    button.innerHTML = xMark;
  }
}


document.addEventListener("DOMContentLoaded",
  () => {
    ~async function () {
      writeHTML();
      await preload();
      // in index.html
      if (currentUrl === "" || currentUrl === urls["index"]){typingEffect("ShuYou Lin");}
    }();
    ~function buttonListener () {
      const sideHeaderButton = document.getElementById("side-header__button");
      sideHeaderButton.addEventListener("click", () => {changeIcon(sideHeaderButton)})
    }();
  }

);
