// Images selection
const carouselImages = document.querySelector(".images-carousel");
const slides = Array.from(carouselImages.children);
//controls selection
const carouselCotntrols = Array.from(
  document.querySelector(".carousel-controller").children
);

const slidesLength = slides.length - 1;
const imagesWith = carouselImages.clientWidth; // slide with so that you to move the images that you use css

console.log(carouselCotntrols[0].id);

const setSlidePosition = (slide, num) => {
  if (slide.style.transform) {
    let some = slide.style.transform.split("(")[1].split(")")[0].split("px")[0];
    some = parseInt(some);
    num = some + num;
  }
  const newNum = num;

  if (newNum <= 0 && newNum >= -imagesWith * slidesLength) {
    slide.style.transform = `translateX(${newNum + "px"})`;
    //console.log(newNum);
  }
};

const testIng = (num) => {
  slides.forEach((slide) => {
    setSlidePosition(slide, num);
  });
};

const change = (event) => {
  return event.keyCode === 39
    ? testIng(-imagesWith)
    : event.keyCode === 37
    ? testIng(imagesWith)
    : event.keyCode === 32
    ? testIng(32)
    : null;
};

// Event in the dom

document.addEventListener("keydown", change);

carouselCotntrols.forEach((el) => {
  // For each element ot the Controls I have add the function tho change the images
  el.addEventListener("click", (e) => {
    if (el.id === "prev") testIng(imagesWith);
    if (el.id === "next") testIng(-imagesWith);
  });
});
