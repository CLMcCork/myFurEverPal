async function changeColor(newColor) { 
    const img = document.getElementsByClassName('img');
    img.style.color = newColor;
    console.log('ON CLICK IS WORKING!')
   };


changeColor();


module.exports =  changeColor; 
