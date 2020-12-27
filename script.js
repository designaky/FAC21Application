/*Text section*/
//Text selection 
const welcomeText = document.querySelector('.welcome-text');

//Change text
const welcomeTextChanger = ()=> {
    
  const greatings = ['Shalom','Yassou','Habari, Hujambo','Welcome','Ciao','Salut', 'Hola', 'Privet', 'Nǐn hǎo', 'Konnichiwa', 'Ahlan'];
  const saluteIndex = Math.floor(Math.random()*greatings.length);
  welcomeText.innerHTML = greatings[saluteIndex];
}
// Auto Salute
setInterval(welcomeTextChanger, 1000);

//text changer
welcomeText.addEventListener('click', welcomeTextChanger);

//Sun movement 
const sun = document.querySelector('.sun');
const night = document.querySelector('.paesaggio-stellato')

//scrollSun nad night functions

const nightChecker= (_docHeight,_docWidth)=>{
  console.log(window.pageYOffset, window.innerHeight*2, window.scrollY)
  //console.log('--',window.navigator, document.body.scrollHeight)
  if (window.pageYOffset == window.innerHeight*2){
    night.style.opacity = '100%';
    starsOff(night);
    stars(_docHeight,_docWidth) ; 
  } else {
    starsOff(night);
    night.style.opacity = '0%';}
}

//stars On
const stars = (_docHeight,_docWidth)=>{
  let count = 500;
  let i = 0;
  while(i<count){
    let star = document.createElement('i');
    let x = Math.floor(Math.random() * _docWidth);
    let y = Math.floor(Math.random() * _docHeight);
    let duration = Math.random()*10;
    let size = Math.random()*2;

    star.style.left = x+'px';
    star.style.top = y+'px';
    star.style.width = 1+size+'px';
    star.style.height = 1+size+'px';
    star.style.animationDuration = 5+duration+'s';
    night.appendChild(star)
    i++
  }
}

//stars Off
const starsOff = (night)=>{
  /* console.log(night.children.length) */
  if (night.children.length>0) {
    while(night.firstChild){
      night.removeChild(night.lastChild);
    }
  }
  
}

const scrollSun = ()=>{
  let _docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
  let _docWidth = (document.width !== undefined) ? document.width : document.body.offsetWidth;
  var test = (window.scrollY*_docWidth)/_docHeight
  const scrollPerY = (window.scrollY)/_docHeight;
  const scrollPerX = (test)/_docWidth;
  


  console.log(scrollPerY, scrollPerX) 
 

  sun.style.transform = `translate3d(-${scrollPerX*_docHeight}px, ${scrollPerY*1000}px, 0)`;

  
  //colorchange BG and sun
  const colorChangeBg = ()=> {
    return 76-scrollY/25 >= 5 ? 76-scrollY/25 : 5
  };
  const colorChangeSun = ()=> {
    return 56-scrollY/30 >= 16 ? 56-scrollY/30 : 16
  };

  //colorchange
  document.querySelector('body').style.background = `hsl(193, 100%, ${colorChangeBg()}%)`;
  
  sun.style.background = `hsl(${colorChangeSun()}, 100%, 50%)`;
  sun.style.boxShadow  = `-1rem 1rem 3rem hsl(${colorChangeSun()}, 100%, 50%),
  1rem -1rem 3rem hsl(${colorChangeSun()}, 100%, 50%)`;

  /*Stellar night chaning*/
  nightChecker(_docHeight,_docWidth)
 
 // console.log(_docHeight, _docWidth,document.documentElement.scrollTop,window.pageYOffset, window.innerHeight);
}

//refine

const refineRezise = ()=>{
  nightChecker(document.body.offsetHeight,document.body.offsetWidth)
}

//event scroll 
window.addEventListener('scroll',scrollSun)
window.addEventListener('resize', refineRezise)




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