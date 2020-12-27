// On and off button
const onButton = document.getElementById('on-button');

const screen = document.querySelector('.screen');

const onOff = ()=>{
    console.log('hello', onButton.classList)
    onButton.classList.toggle('off-button');
    onButton.classList.toggle('on-button');
    screen.classList.toggle('screen-on')
};

onButton.addEventListener('click', onOff);