const carol = document.querySelector(".images-carousel");
const slides = Array.from(carol.children);

console.log(slides);

const setSlidePosition = (slide, num) => {
  if (slide.style.transform) {
    let some = slide.style.transform.split("(")[1].split(")")[0].split("px")[0];
    some = parseInt(some);
    num = some + num;
  }
  const newNum = num;

  if (newNum <= 0 && newNum >= -600) {
    slide.style.transform = `translateX(${newNum + "px"})`;
    console.log(newNum);
  }
};

const testIng = (num) => {
  slides.forEach((slide) => {
    setSlidePosition(slide, num);
  });
};

const change = (event) => {
  return event.keyCode === 39
    ? testIng(-300)
    : event.keyCode === 37
    ? testIng(300)
    : event.keyCode === 32
    ? testIng(32)
    : null;
};

document.addEventListener("keydown", change);
