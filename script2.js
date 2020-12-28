// Elements selection
const onButton = document.getElementById('on-button');
const screen = document.querySelector('.screen');
const vhsContainer = document.querySelectorAll('.vhs');
const vhsIn = document.querySelector('.vhs-in h2');
const channelType = document.querySelector('.channel-type');
const tvVhsContent = document.querySelectorAll('.content');







// On and off button
const onOff = ()=>{
    onButton.classList.toggle('off-button');
    onButton.classList.toggle('on-button');
    screen.classList.toggle('screen-on')
    
    console.log(onButton.classList.value)
    tvVhsContent.forEach(vhsContent =>{
        //Changing the active page off
        if(vhsContent.classList.length > 1){
            vhsContent.classList.toggle('content-active');
        }
        if(onButton.classList.value == 'on-button' && vhsContent.id == 'Home'){
            vhsContent.classList.toggle('content-active');
        }
       
    });

};

onButton.addEventListener('click', onOff);



// Chose VHS 
const changeVhs = (event)=>{
    let vhsText = event.target.textContent; // seleccting the inner text for the changing
    // Check the same page
    if(vhsIn.textContent == vhsText){
        return
    }
    // Changin the VHS
    vhsIn.textContent = vhsText;
    // Changing the Channel Type
    channelType.textContent = vhsText;
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
        if (onButton.classList.value == 'on-button') {
            changeVhs(event);
        }
        
    });   
});
