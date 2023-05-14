const images = document.querySelectorAll('.draggable, .cloudwhite');
const pageWidth = window.innerWidth;
const pageHeight = window.innerHeight;

images.forEach(image => {
  const imageWidth = image.offsetWidth;
  const imageHeight = image.offsetHeight;
  const xPos = Math.floor(Math.random() * (pageWidth - imageWidth));
  const yPos = Math.floor(Math.random() * (pageHeight - imageHeight));
  image.style.left = xPos + 'px';
  image.style.top = yPos + 'px';
});


     var dragItem = null;
    var offsetX = 0;
    var offsetY = 0;

    function dragStart(event) {
      event.preventDefault();
      dragItem = event.target;
      offsetX = event.clientX - dragItem.offsetLeft;
      offsetY = event.clientY - dragItem.offsetTop;
    }

    function dragEnd(event) {
      dragItem = null;
    }

    function drag(event) {
      if (dragItem) {
        event.preventDefault();
        dragItem.style.left = (event.clientX - offsetX) + "px";
        dragItem.style.top = (event.clientY - offsetY) + "px";
      }
    }


    
var autoplayVideoInterval = setInterval("autoplayVideo()",200);


function autoplayVideo()
{
var promise = document.querySelector('video').play();
if (promise !== undefined)
{
promise.then(function (_)
{
// Autoplay started!
clearInterval(autoplayVideoInterval);

}).catch(function (error) {// Autoplay was prevented.
// Show a "Play" button so that user can start playback.
});
}
}