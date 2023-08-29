const currentUrl = location.pathname.split("/").pop(),
      urls = {"index": "index.html"}

function sleep (seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  })
}
async function preload () {
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

  function setFontSize () {
    if (ringWidth == 104) {
      return "16px"
    } else {
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
  const navBar = document.getElementById("nav-bar"),
        header = document.querySelector("header");
  navBar.innerHTML = `
    <nav id="navcontent--right">
        <a class="menu-item" href="./index.html">HOME</a>
        <a class="menu-item" href="./about.html">ABOUT</a>
        <a class="menu-item" href="./project.html">PROJECT</a>
        <a class="menu-item" href="./contact.html">CONTACT</a>
    </nav>
  `;
  if (header !== null) {header.setAttribute("copyright", "2023 ShuYou. All Rights Reserved.");}
  if (currentUrl === "" || currentUrl === urls["index"]) {
    // pass
  } else {
    const pageBottom = document.getElementById("page__bottom");
    pageBottom.setAttribute("date", "Aug 28, 2023");
  }
}

async function typingEffect (word) {
  const name = document.getElementById("name");
  for(let letter of word) {
    name.innerHTML += letter;
    await sleep(0.15);
  }
}

document.addEventListener("DOMContentLoaded",
  async () => {
    writeHTML();
    await preload();
    // in index.html
    if (currentUrl === "" || currentUrl === urls["index"]){typingEffect("ShuYou Lin");}
  }
);
// document.addEventListener("load", )
