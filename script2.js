// Elements selection
const onButton = document.getElementById('on-button');
const screen = document.querySelector('.screen');
const vhsContainer = document.querySelectorAll('.vhs');
const vhsIn = document.querySelector('.vhs-in h2');
const channelType = document.querySelector('.channel-type');







// On and off button
const onOff = ()=>{
    onButton.classList.toggle('off-button');
    onButton.classList.toggle('on-button');
    screen.classList.toggle('screen-on')
};

onButton.addEventListener('click', onOff);



// Chose VHS 
const changeVhs = (event)=>{
    let vhsText = event.target.textContent; // seleccting the inner text for the changing
    // Changin the VHS
    vhsIn.textContent = vhsText;
    // Changing the Channel Type
    channelType.textContent = vhsText;
    // Change the Content in the TV

};


vhsContainer.forEach(vhs => {
    vhs.addEventListener('click', (event) =>{
        changeVhs(event);
    });   
});
