// Elements selection
const onButton = document.getElementById('on-button');
const screen = document.querySelector('.screen');
const vhsContainer = document.querySelectorAll('.vhs');
const vhsIn = document.querySelector('.vhs-in h2');
//const channelType = document.querySelector('.channel-type');
const welcomeMessage = document.querySelector ('.welcome-message')
const tvVhsContent = document.querySelectorAll('.content');


const cards = document.querySelectorAll('.card');
const newGameBtn = document.querySelector('.new-game-btn');



let prevPage ='Home';//initial page
let prevCard = '0-0'; // Initial card status



// On and off button
const onOff = ()=>{
    onButton.classList.toggle('off-button');
    onButton.classList.toggle('on-button');
    welcomeMessage.classList.toggle('welcome-message-off');
    
  
    tvVhsContent.forEach(vhsContent =>{
        //Changing the active page off
        if(vhsContent.classList.length > 1){
            vhsContent.classList.toggle('content-active');
            prevPage = vhsContent.id;
        };
        if(onButton.classList.value == 'on-button' && vhsContent.id == prevPage){
            vhsContent.classList.toggle('content-active');
            vhsIn.textContent = vhsContent.id;
            //channelType.textContent = vhsContent.id;
        };
       
    });

};

onButton.addEventListener('click', onOff);



// Chose VHS 
const changeVhs = (event)=>{
    let vhsTextClean = event.target.textContent
    let vhsText = vhsTextClean.replace(" ", "").replace("?",""); // seleccting the inner text for the changing
  
    // Check the same page
    if(vhsIn.textContent == vhsText){
        return
    }
    // Changing the VHS
    vhsIn.textContent = vhsTextClean;
    // Changing the Channel Type
    //channelType.textContent = vhsTextClean;
    // Change the Content in the TV
    tvVhsContent.forEach(vhsContent =>{
        //Changing the active page off
        if(vhsContent.classList.length > 1){
            vhsContent.classList.toggle('content-active');
        } 
        //Changing the new page on
        if (vhsText == vhsContent.id){
            vhsContent.classList.toggle('content-active');      
        };
        
    });

};


vhsContainer.forEach(vhs => {
    vhs.addEventListener('click', (event) =>{
        //if the television is on
        if (onButton.classList.value == 'on-button') {
            changeVhs(event);
        };
        
    });   
});


const cardShuffle = ()=>{
    //console.log(cards);
    cards.forEach(card =>{
       card.style.order = 1 * Math.floor(Math.random()*cards.length);    
        //console.log(card.style.order);
    });    
};


const newGame = ()=>{
    cardShuffle();
};

newGameBtn.addEventListener('click', newGame);


const gameOn = (event)=>{
    let selectedCard = event.target.id;
    
    console.log(selectedCard, prevCard);
    if(prevCard == '0-0'){
        prevCard= event.target.id
    } else {
        if(prevCard.charAt(0) == selectedCard.charAt(0)){
            console.log('well done')
            prevCard = '0-0'

        } else {
            prevCard = '0-0'
        }
    }
   
    
}

cards.forEach(card =>{
    card.addEventListener('click', (event) =>{
        gameOn(event);

    });  
});