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

function writeHTML () {
  const currentUrl = location.pathname,
        bottomExclusion = ["/index.html"],
        navBar = document.getElementById("navbar");
  navBar.innerHTML = `
    <nav id="navcontent--right">
      <ul>
        <li><a href="./index.html">HOME</a></li>|
        <li><a href="./about.html">ABOUT</a></li>|
        <li><a href="./project.html">PROJECT</a></li>|
        <li><a href="./contact.html">CONTACT</a></li>
      </ul>
    </nav>
  `
  for (url of bottomExclusion) {
    if (currentUrl.includes(url) === false) {
      const pageBottom = document.getElementById("page__bottom");
      pageBottom.setAttribute("date", "Aug 3, 2023");
      break
    }
  }
  // in index.html
  if (currentUrl.includes("/index.html") === true) {
    const menuIcon = document.getElementById("menu__icon");
    menuIcon.innerHTML = `
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    `
  }
}


document.addEventListener("DOMContentLoaded", () => {preload(); writeHTML();});
// document.addEventListener("load", )
