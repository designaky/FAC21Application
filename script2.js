// Elements selection
const onButton = document.getElementById('on-button');
const screen = document.querySelector('.screen');
const vhsContainer = document.querySelectorAll('.vhs');
const vhsIn = document.querySelector('.vhs-in h2');
//const channelType = document.querySelector('.channel-type');
const welcomeMessage = document.querySelector ('.welcome-message')
const tvVhsContent = document.querySelectorAll('.content');







// On and off button
const onOff = ()=>{
    onButton.classList.toggle('off-button');
    onButton.classList.toggle('on-button');
    welcomeMessage.classList.toggle('welcome-message-off')
    
    
    tvVhsContent.forEach(vhsContent =>{
        //Changing the active page off
        if(vhsContent.classList.length > 1){
            vhsContent.classList.toggle('content-active');
        };
        if(onButton.classList.value == 'on-button' && vhsContent.id == 'Home'){
            vhsContent.classList.toggle('content-active');
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
        }
        
    });   
});
