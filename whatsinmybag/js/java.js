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
  if (event.type === 'touchstart') {
    dragItem = event.target;
    offsetX = event.touches[0].clientX - dragItem.offsetLeft;
    offsetY = event.touches[0].clientY - dragItem.offsetTop;
  } else {
    dragItem = event.target;
    offsetX = event.clientX - dragItem.offsetLeft;
    offsetY = event.clientY - dragItem.offsetTop;
  }
}

function dragEnd(event) {
  dragItem = null;
}

function drag(event) {
  if (dragItem) {
    event.preventDefault();
    if (event.type === 'touchmove') {
      dragItem.style.left = (event.touches[0].clientX - offsetX) + "px";
      dragItem.style.top = (event.touches[0].clientY - offsetY) + "px";
    } else {
      dragItem.style.left = (event.clientX - offsetX) + "px";
      dragItem.style.top = (event.clientY - offsetY) + "px";
    }
  }
}

// Add event listeners for touch and mouse events
images.forEach(image => {
  image.addEventListener('touchstart', dragStart);
  image.addEventListener('touchmove', drag);
  image.addEventListener('touchend', dragEnd);
  image.addEventListener('mousedown', dragStart);
  image.addEventListener('mousemove', drag);
  image.addEventListener('mouseup', dragEnd);
});
