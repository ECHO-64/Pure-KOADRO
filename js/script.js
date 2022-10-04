// ________________ Variables ________________
const root = document.documentElement,
  local = window.localStorage,
  toTop = document.querySelector(".to-top"),
  bulletsBox = document.querySelector(".bullets-box"),
  bullets = bulletsBox.querySelectorAll(".bullet"),
  stBtn = document.querySelector(".toggle-st"),
  stBox = document.querySelector(".st-box"),
  colors = stBox.querySelectorAll(".colors li"),
  bgLis = stBox.querySelectorAll(".bgs li"),
  fixedHeaderOP = stBox.querySelectorAll(".fixed-header button"),
  toTopOp = stBox.querySelectorAll(".to-top-op button"),
  bulletsOP = stBox.querySelectorAll(".bullets-op button"),
  resetSt = stBox.querySelector(".reset-st"),
  nav = document.querySelector(".navigation"),
  navLinks = document.querySelectorAll(".nav-ul .nav-a"),
  navBtn = document.querySelector(".nav-btn"),
  landing = document.querySelector(".landing"),
  skillsDiv = document.querySelectorAll(".skill"),
  galleryBtns = document.querySelectorAll(".gallery-list li button"),
  galleryDivs = document.querySelectorAll(".gallery .img-div"),
  lindingImgsArr = [
    "land1.jpg",
    "land2.jpg",
    "land3.jpg",
    "land4.jpg",
    "land5.jpg",
    "land6.jpg",
    "land7.jpg",
    "land8.jpg",
  ];

// ________________ Helper Functions ________________
let i = 0;
let option = true;
let int;
function randomBg() {
  if (option == true) {
    int = setInterval(() => {
      i++;
      landing.style.backgroundImage = `url("imgs/land-imgs/land${i}.jpg")`;
      i == lindingImgsArr.length ? (i = 0) : (i = i);
    }, 10000);
  }
}
function stopRandomBg() {
  option = false;
  clearInterval(int);
}
function runRandomBg() {
  option = true;
  randomBg();
}

function classTo(arr, c, t) {
  arr.forEach((el) => {
    el.classList.remove(c);
  });
  t != undefined ? t.classList.add(c) : false;
}

// ________________ Check localStorage in reload ________________
if (local.getItem("main-color")) {
  colors.forEach((li) => {
    li.classList.remove("active");
    li.dataset.color == local.getItem("main-color")
      ? li.classList.add("active")
      : false;
  });
  root.style.setProperty("--main-color", local.getItem("main-color"));
  root.style.setProperty("--skill-color", local.getItem("skill-color"));
}

if (local.getItem("randomBg") == "no") {
  stopRandomBg();
  landing.style.backgroundImage = local.getItem("currentBg");
  bgLis.forEach((li) => {
    local.getItem("bgLiNumber") == li.dataset.number
      ? li.classList.add("active")
      : false;
  });
} else {
  runRandomBg();
}

if (local.getItem("fixedHeader")) {
  classTo(
    fixedHeaderOP,
    "active",
    stBox.querySelector(`.fixed-header .${local.getItem("fixedHeader")}`)
  );
  if (local.getItem("fixedHeader") == "yes") {
    document.querySelector(".top-header").classList.add("fixed");
  }
}

if (local.getItem("toTopOp")) {
  classTo(
    toTopOp,
    "active",
    stBox.querySelector(`.to-top-op .${local.getItem("toTopOp")}`)
  );
}

if (local.getItem("scrollBullets")) {
  classTo(
    bulletsOP,
    "active",
    stBox.querySelector(`.bullets-op .${local.getItem("scrollBullets")}`)
  );
  if (local.getItem("scrollBullets") == "yes") {
    bulletsBox.classList.remove("hide");
  } else {
    bulletsBox.classList.add("hide");
  }
}

// ________________ Scroll To Top Btn ________________
window.addEventListener("scroll", () => {
  if (local.getItem("toTopOp") == "no") {
    return false;
  } else {
    if (scrollY >= landing.offsetHeight) {
      toTop.classList.add("show");
    } else {
      toTop.classList.remove("show");
    }
  }
  // ________________ skills section ________________
  let height = window.innerHeight;
  skillsDiv.forEach((d) => {
    if (d.getBoundingClientRect().top - height < -150) {
      d.classList.add("show");
      d.querySelector(".skill-prog").setAttribute(
        "style",
        `--progress: ${d
          .querySelector(".skill-prog")
          .getAttribute("data-prog")};`
      );
      d.querySelector(".skill-prog").classList.add("fill");
    }
  });
});

toTop.addEventListener("click", () => {
  root.scrollIntoView({ behavior: "smooth" });
});

// ________________ setings box section ________________
stBtn.onclick = function () {
  stBox.classList.add("open");
};

stBox.onclick = (e) => {
  e.stopPropagation();
};

document.addEventListener("click", (e) => {
  if (e.target !== stBtn && e.target !== stBox) {
    if (stBox.classList.contains("open")) {
      stBox.classList.remove("open");
    }
  }
});

colors.forEach((li) => {
  li.addEventListener("click", function () {
    classTo(colors, "active", this);
    const mainColor = this.dataset.color,
      skillColor = mainColor.replace("1)", "0.25)");
    root.style.setProperty("--main-color", mainColor);
    root.style.setProperty("--skill-color", skillColor);
    local.setItem("main-color", mainColor);
    local.setItem("skill-color", skillColor);
  });
});

bgLis.forEach((li) => {
  li.addEventListener("click", (e) => {
    stopRandomBg();
    landing.style.backgroundImage = `url(${e.target.src})`;
    local.setItem("randomBg", "no");
    local.setItem("currentBg", landing.style.backgroundImage);
    local.setItem("bgLiNumber", e.currentTarget.dataset.number);
    classTo(bgLis, "active", e.currentTarget);
  });
});

fixedHeaderOP.forEach((btn) => {
  btn.addEventListener("click", function () {
    classTo(fixedHeaderOP, "active", this);
    if (this.classList.contains("yes")) {
      document.querySelector(".top-header").classList.add("fixed");
      local.setItem("fixedHeader", "yes");
    } else {
      document.querySelector(".top-header").classList.remove("fixed");
      local.setItem("fixedHeader", "no");
    }
  });
});

toTopOp.forEach((btn) => {
  btn.addEventListener("click", function () {
    classTo(toTopOp, "active", this);
    if (this.classList.contains("yes")) {
      toTop.classList.add("show");
      local.setItem("toTopOp", "yes");
    } else {
      toTop.classList.remove("show");
      local.setItem("toTopOp", "no");
    }
  });
});

bulletsOP.forEach((btn) => {
  btn.addEventListener("click", function () {
    classTo(bulletsOP, "active", this);
    if (this.classList.contains("yes")) {
      bulletsBox.classList.remove("hide");
      local.setItem("scrollBullets", "yes");
    } else {
      bulletsBox.classList.add("hide");
      local.setItem("scrollBullets", "no");
    }
  });
});

resetSt.addEventListener("click", () => {
  window.location.reload();
  localStorage.clear();
  root.style.setProperty("--main-color", "rgba(0 188 212 / 1)");
  root.style.setProperty("--skill-color", "rgba(0 188 212 / 0.25)");
  landing.style.backgroundImage = "url('imgs/land-imgs/land1.jpg')";
  randomBg();
});

// ________________ bullets section ________________
bullets.forEach((bullet) => {
  bullet.addEventListener("click", function () {
    document.querySelector(`.${this.dataset.section}`).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// ________________ header and nav section ________________
navLinks.forEach((a) => {
  a.addEventListener("click", function (e) {
    e.preventDefault();
    classTo(navLinks, "active", this);
    nav.classList.remove("open");
    navBtn.classList.remove("clicked");
    document.querySelector(`.${this.dataset.section}`).scrollIntoView({
      behavior: "smooth",
    });
  });
});

navBtn.addEventListener("click", function () {
  this.classList.toggle("clicked");
  nav.classList.toggle("open");
});

// ________________ gallery section ________________
galleryBtns.forEach((li) => {
  li.addEventListener("click", function () {
    classTo(galleryBtns, "active", this);
    galleryDivs.forEach((d) => {
      d.classList.add("hide");
    });
    document.querySelectorAll(this.dataset.filter).forEach((d) => {
      d.classList.replace("hide", "veiw");
    });
    if (this.classList.contains("veiw-all")) {
      galleryDivs.forEach((d) => {
        d.classList.replace("hide", "veiw");
      });
    }
  });
});

galleryDivs.forEach((d) => {
  d.addEventListener("click", (e) => {
    let img = e.currentTarget.firstElementChild;
    let caption = e.currentTarget.dataset.caption;
    let desc = e.currentTarget.dataset.desc;

    let popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";

    let popupContainer = document.createElement("div");
    popupContainer.className = "container";
    popupOverlay.appendChild(popupContainer);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    popupContainer.appendChild(popupBox);

    let popupImg = document.createElement("img");
    popupImg.className = "popup-img";
    popupImg.src = img.src;
    popupBox.appendChild(popupImg);

    let popupContent = document.createElement("div");
    popupContent.className = "popup-content";
    popupBox.appendChild(popupContent);

    let popupH3 = document.createElement("h3");
    popupH3.className = "popup-h3";
    if (caption != null) {
      popupH3.appendChild(document.createTextNode(caption));
    } else {
      popupH3.appendChild(document.createTextNode("no caption"));
    }
    popupContent.appendChild(popupH3);

    let popupDesc = document.createElement("p");
    popupDesc.className = "popup-desc";
    popupDesc.appendChild(document.createTextNode(desc));
    popupContent.appendChild(popupDesc);

    let savePopup = document.createElement("button");
    savePopup.className = "m-btn savePopup";
    let saveIcon = document.createElement("i");
    saveIcon.className = "fas fa-download";
    savePopup.appendChild(saveIcon);
    savePopup.appendChild(document.createTextNode("save"));
    popupContent.appendChild(savePopup);

    let popupCnavas = document.createElement("canvas");
    popupCnavas.className = "popup-canvas";
    popupCnavas.width = popupImg.width;
    popupCnavas.height = popupImg.height;
    popupCnavas
      .getContext("2d")
      .drawImage(img, 0, 0, popupCnavas.width, popupCnavas.height);
    popupOverlay.appendChild(popupCnavas);

    saveLink = document.createElement("a");
    saveLink.className = "save-link";
    saveLink.setAttribute("download", `${popupH3.innerText}`);
    saveLink.setAttribute("href", `${popupCnavas.toDataURL()}`);
    popupOverlay.appendChild(saveLink);

    let closePopup = document.createElement("i");
    closePopup.className = "close-popup fas fa-xmark";
    popupBox.appendChild(closePopup);

    document.body.appendChild(popupOverlay);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-popup")) {
    document.querySelector(".popup-overlay").remove();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("savePopup")) {
    document.querySelector(".save-link").click();
  }
});
