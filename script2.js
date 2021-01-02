// Elements selection
const onButton = document.getElementById('on-button');
const screen = document.querySelector('.screen');
const vhsContainer = document.querySelectorAll('.vhs');
const vhsIn = document.querySelector('.vhs-in h2');
//const channelType = document.querySelector('.channel-type');
const welcomeMessage = document.querySelector ('.welcome-message')
const tvVhsContent = document.querySelectorAll('.content');


const cards = document.querySelectorAll('.card');
const cardsCon = document.querySelector('.cards');//fpr changing
const newGameBtn = document.querySelector('.new-game-btn');
const winMessages = document.querySelector('.winMessage');



let prevPage ='AboutMe';//Initial page
let prevCard = '0-0';//Initial card status
let win = 0;



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
            vhsIn.textContent = vhsContent.childNodes[1].outerText;
           
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
    
    cards.forEach(card =>{
       card.style.order = 1 * Math.floor(Math.random()*cards.length);    
        
    });    
};


const newGame = ()=>{
    cardShuffle(); 
    removeCardToggle(); 
    prevCard = '0-0';
    win=0;  
    winMessages.style.display = 'none';
    cardsCon.style.height = '80%';
    newGameBtn.style.marginTop ='10px';
};

newGameBtn.addEventListener('click', newGame);


const gameOn = (event)=>{
    let selectedCard = event.target;
    
   
    if(prevCard == '0-0'){
        
        selectedCard.classList.toggle('cardCorrect');
        prevCard= selectedCard;
    } else {
        if(prevCard.id.charAt(0) == selectedCard.id.charAt(0)){
           
            selectedCard.classList.toggle('cardCorrect');
            prevCard = '0-0';
            win++;            
        } else {
            prevCard.classList.toggle('cardCorrect');
            prevCard.classList.toggle('cardWrong');
            selectedCard.classList.toggle('cardWrong');
           //Bug 1 if the click are to fast it go funcky
           setTimeout(()=>{
            prevCard.classList.toggle('cardWrong');
            prevCard = '0-0';
           }, 500);
           setTimeout(()=>{
            selectedCard.classList.toggle('cardWrong');
           }, 500);    
            
        }
    }
    if(win==3){   
        setTimeout(displayWin, 1000);                
    };
};

const removeCardToggle = ()=>{
    cards.forEach(card =>{
        //console.log(card.classList);
        card.classList.remove('cardCorrect');
        card.classList.remove('cardWrong');
        card.style.display = 'grid';
        //console.log(card.classList);
    });
};


const displayWin = ()=>{
    cards.forEach(card =>{
        card.style.display = 'none';
        cardsCon.style.height= '40%';
        winMessages.style.display = 'flex';
    });
};


cards.forEach(card =>{
    card.addEventListener('click', (event) =>{
        gameOn(event);

    });  
});