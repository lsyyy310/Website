async function preload () {
  const preloader = document.getElementById("preloader");
  preloader.innerHTML = `
      <div id="curtain"></div>
      <div id="ring"></div>
  `

  function sleep (seconds) {
    return new Promise(resolve => {
      setTimeout(resolve, seconds * 1000);
    })
  }

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
  // preloaderStyle.remove();
}
// End function preload

function writeHTML () {
  const currentUrl = location.pathname,
        bottomExclusion = ["/index.html"],
        navBar = document.getElementById("nav-bar");
      navBar.innerHTML = `
        <nav id="navcontent--right">
            <a class="menu-item" href="./index.html">HOME</a>
            <a class="menu-item" href="./about.html">ABOUT</a>
            <a class="menu-item" href="./project.html">PROJECT</a>
            <a class="menu-item" href="./contact.html">CONTACT</a>
        </nav>
      `
  for (url of bottomExclusion) {
    if (currentUrl.includes(url) === false) {
      const pageBottom = document.getElementById("page__bottom");
      pageBottom.setAttribute("date", "Aug 26, 2023");
      break
    }
  }
}


document.addEventListener("DOMContentLoaded", () => {preload(); writeHTML();});
// document.addEventListener("load", )
