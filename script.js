/*Text section*/
//Text selection 
const welcomeText = document.querySelector('.welcome-text')

//Change text
const welcomeTextChanger = ()=> {
    
  const greatings = ['Shalom','Yassou','Habari, Hujambo','Welcome','Ciao','Salut', 'Hola', 'Privet', 'Nǐn hǎo', 'Konnichiwa', 'Ahlan']
  const saluteIndex = Math.floor(Math.random()*greatings.length)
  welcomeText.innerHTML = greatings[saluteIndex]
}

//text changer
welcomeText.addEventListener('click', welcomeTextChanger);



//Sun movement 
const sun = document.querySelector('.sun');
//scrollSun function
const scrollSun = ()=>{

  let _docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
  let  _docWidth = (document.width !== undefined) ? document.width : document.body.offsetWidth;

  console.log(window.scrollY/10)

  sun.style.transform = `translate3d(-${window.scrollY / 0.75}px, ${window.scrollY / 3}px, 0)`;
  
  //sun.style.top = `${10+window.scrollY/10}vh`
  //sun.style.left = `${90-window.scrollY/10}vw`
  //console.log(sun.style.top, sun.style.left)

  console.log(_docHeight, _docWidth)
}
//event scroll 
window.addEventListener('scroll',scrollSun)




/*Images carosel*/
// Images selection
const carouselImages = document.querySelector(".images-carousel");
const slides = Array.from(carouselImages.children);
//controls selection
const carouselCotntrols = Array.from(
  document.querySelector(".carousel-controller").children
);

// Image carosel 
const slidesLength = slides.length - 1;
const imagesWith = carouselImages.clientWidth ; // slide with so that you to move the images that you use css

//console.log(carouselCotntrols[0].id);

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
    if (el.id === "play") console.log("play");
    if (el.id === "pause") console.log("pause");
  });
});


/* if the screen size changes */