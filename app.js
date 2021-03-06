// Elements selection
const onButton = document.getElementById("on-button");
const screen = document.querySelector(".screen");
const vhsContainer = document.querySelectorAll(".vhs");
const vhsInTitle = document.querySelector(".vhs-in h2");
const vhsIn = document.querySelector(".vhs-in");
//const channelType = document.querySelector('.channel-type');
const welcomeMessage = document.querySelector(".welcome-message");
const tvVhsContent = document.querySelectorAll(".content");

const aboutMe = document.getElementById("AboutMe");

const cards = document.querySelectorAll(".card");
const cardsCon = document.querySelector(".cards"); //fpr changing
const newGameBtn = document.querySelector(".new-game-btn");
const winMessages = document.querySelector(".winMessage");

const carouselImgs = document.querySelectorAll(".carousel img");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const winMessage = document.querySelector(".win-text");

let prevPage = "AboutMe"; //Initial page
let prevCard = "0-0"; //Initial card status
let win = 0;
let isEveryCardRight = true;
let imagesPosition = 0; //Carousel

// On and off button*******************************************************************************************************
const onOff = () => {
  onButton.classList.toggle("off-button");
  onButton.classList.toggle("on-button");
  welcomeMessage.classList.toggle("welcome-message-off");

  tvVhsContent.forEach((vhsContent) => {
    //Changing the active page off
    if (vhsContent.classList.length > 1) {
      contectActive(vhsContent);
      prevPage = vhsContent.id;
    }
    if (onButton.classList.value == "on-button" && vhsContent.id == prevPage) {
      contectActive(vhsContent);
      vhsInTitle.textContent = vhsContent.childNodes[1].innerText;
      vhsIn.style.boxShadow = `var(--${prevPage}Glow)`;
    }
  });
};

onButton.addEventListener("click", onOff);

//VHS***********************************************************************************************************************
// Chose VHS
const changeVhs = (event) => {
  let vhsTextClean = event.target.textContent;
  let vhsText = vhsTextClean.replace(" ", "").replace("?", ""); // seleccting the inner text for the changing

  // Check the same page
  if (vhsInTitle.textContent == vhsText) {
    return;
  }
  // Changing the VHS
  vhsInTitle.textContent = vhsTextClean;
  vhsIn.style.backgroundColor = `var(--${vhsText})`;
  vhsIn.style.boxShadow = `var(--${vhsText}Glow)`;
  // Changing the Channel Type

  // Change the Content in the TV
  tvVhsContent.forEach((vhsContent) => {
    //Changing the active page off
    if (vhsContent.classList.length > 1) {
      contectActive(vhsContent);
    }
    //Changing the new page on
    if (vhsText == vhsContent.id) {
      contectActive(vhsContent);
    }
  });
};

const contectActive = (vhsContent) => {
  /*if(vhsContent.id == 'Game'){
        vhsContent.classList.toggle('content-active-flex');
    } else {
        vhsContent.classList.toggle('content-active-grid');
    }*/
  vhsContent.classList.toggle("content-active-grid");
};

vhsContainer.forEach((vhs) => {
  vhs.addEventListener("click", (event) => {
    //if the television is on
    if (onButton.classList.value == "on-button") {
      changeVhs(event);
    }
  });
});

//Game******************************************************************************************************/
const newGame = () => {
  cardShuffle();
  removeCardToggle();
  changeImages();
  prevCard = "0-0";
  win = 0;
  isEveryCardRight = true;
  winMessages.style.display = "none";
  cardsCon.style.gridRow = "2/ 4";
  /*newGameBtn.style.marginTop ='10px';*/
};

const cardShuffle = () => {
  cards.forEach((card) => {
    card.style.order = Math.floor(Math.random() * cards.length);
  });
};

const removeCardToggle = () => {
  cards.forEach((card) => {
    //console.log(card.classList);
    card.classList.remove("cardCorrect");
    card.classList.remove("cardWrong");
    card.style.display = "grid";
    //console.log(card.classList);
  });
};

const changeImages = () => {
  let firstCars = Math.floor(Math.random() * carouselImgs.length);
  firstCars = firstCars > 1 ? firstCars : 2;

  cards.forEach((card) => {
    if (card.id.charAt(0) == "1") {
      card.children[0].src = `./images/slide_images/image0${firstCars}.jpg`;
    } else if (card.id.charAt(0) == "2") {
      card.children[0].src = `./images/slide_images/image0${firstCars - 1}.jpg`;
    } else if (card.id.charAt(0) == "3") {
      card.children[0].src = `./images/slide_images/image0${firstCars + 1}.jpg`;
    }
  });
};

const gameOn = (event) => {
  if (isEveryCardRight) {
    let selectedCard = event.target;

    if (prevCard == "0-0") {
      selectedCard.classList.toggle("cardCorrect");
      prevCard = selectedCard;
    } else {
      if (prevCard.id.charAt(0) == selectedCard.id.charAt(0)) {
        selectedCard.classList.toggle("cardCorrect");
        prevCard = "0-0";
        win++;
      } else {
        prevCard.classList.toggle("cardCorrect");
        prevCard.classList.toggle("cardWrong");
        selectedCard.classList.toggle("cardWrong");
        isEveryCardRight = false;
        setTimeout(() => {
          prevCard.classList.toggle("cardWrong");
          prevCard = "0-0";
        }, 500);
        setTimeout(() => {
          selectedCard.classList.toggle("cardWrong");
        }, 500);
      }
    }
    if (win == 3) {
      winOnOff();
    }
  } else {
    isEveryCardRight = true;
  }
};

const displayWin = () => {
  cards.forEach((card) => {
    card.style.display = "none";
    cardsCon.style.gridRow = "2/ 3";
    winMessages.style.display = "flex";
  });
};

cards.forEach((card) => {
  card.addEventListener("click", (event) => {
    gameOn(event);
  });
});

const winOnOff = () => {
  winMessage.classList.toggle("win-text-on");
};

winMessage.addEventListener("click", () => {
  winOnOff();
  displayWin();
  //ZsetTimeout(displayWin, 1000);
});

newGameBtn.addEventListener("click", newGame);

//Carousel******************************************************
const nextImage = (move) => {
  toggleActiveImage(carouselImgs);

  if (move === "+") {
    imagesPosition++;
  } else {
    imagesPosition--;
  }

  checkLimit();

  toggleActiveImage(carouselImgs);
};

const checkLimit = () => {
  if (imagesPosition > carouselImgs.length - 1) {
    imagesPosition = 0;
  } else if (imagesPosition < 0) {
    imagesPosition = carouselImgs.length - 1;
  }
};
const toggleActiveImage = (carouselImgs) => {
  carouselImgs[imagesPosition].classList.toggle("active-image");
  carouselImgs[imagesPosition].classList.toggle("unactive-image");
};

nextBtn.addEventListener("click", () => nextImage("+"));
prevBtn.addEventListener("click", () => nextImage("-"));

const whyFacSelect = document.querySelectorAll(".special-why");

whyFacSelect.forEach((reason) => {
  reason.addEventListener("click", () => {
    reason.childNodes[3].classList.toggle("why-full-On");
  });
});

const logKey = (e) => {
  if (aboutMe.classList.length < 2) return;
  switch (e.keyCode) {
    case 37:
      nextImage("-");
      break;
    case 39:
      nextImage("+");
      break;
  }
};

document.addEventListener("keydown", logKey);
