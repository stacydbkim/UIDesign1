// Array of sound file URLs
var soundFiles = [
  "./Tunes/do.wav",
  "./Tunes/re.wav",
  "./Tunes/mi.wav",
  "./Tunes/fa.wav",
  "./Tunes/sol.wav",
  "./Tunes/la.wav",
  "./Tunes/ti.wav",
  "./Tunes/do2.wav",

];


// Function to play a random sound from the soundFiles array
function playRandomSound() {
  // Generate a random index within the length of the soundFiles array
  var randomIndex = Math.floor(Math.random() * soundFiles.length);

  // Create an Audio object with the selected sound file
  var audio = new Audio(soundFiles[randomIndex]);

  // Play the audio file
  audio.play();
}

// JavaScript function to add text to the output section
function addText() {
  // Get the input text
  var inputText = document.getElementById("input").value;

  var bannedWords = ["fuck", "shit"];

  // Check if input text contains any banned words
  for (var i = 0; i < bannedWords.length; i++) {
    if (inputText.includes(bannedWords[i])) {
      alert("Sorry, you cannot submit this text.");
      return;
    }
  }

  // Create a new text box element
  var textBox = document.createElement("div");
  textBox.classList.add("text-box");
  textBox.innerText = inputText;

  // Generate random background color
  var randomColor = Math.floor(Math.random()*16777215).toString(16);
  textBox.style.backgroundColor = "#" + randomColor;

  // Add delete button only if it doesn't exist yet
  if (!textBox.querySelector(".delete-button")) {
    var deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerText = "x";
    deleteButton.addEventListener("click", function () {
      textBox.remove();
      saveToLocalStorage();
    });
    textBox.appendChild(deleteButton);
  }

  // Insert the text box at the beginning of the output section
  var output = document.getElementById("output");
  output.insertBefore(textBox, output.firstChild);

  // Clear the input field
  document.getElementById("input").value = "";

  // Save the new text to localStorage
  saveToLocalStorage();

  // Add event listener to the new text box element for toggling strike-through effect
  textBox.addEventListener("click", function () {
    if (textBox.style.textDecoration === "line-through") {
      textBox.style.textDecoration = "none";
    } else {
      textBox.style.textDecoration = "line-through";
    }
    saveToLocalStorage();
  });

  // Add event listener to the new text box element for playing a random sound on hover
  textBox.addEventListener("mouseover", function () {
    playRandomSound();
  });
}

// Load saved data from localStorage on page load
function loadFromLocalStorage() {
  var savedText = localStorage.getItem("text");
  if (savedText) {
    console.log(savedText)
    var output = document.getElementById("output");
    output.innerHTML = savedText;

    // Add event listeners to all delete buttons and text-box elements
    var deleteButtons = output.querySelectorAll(".delete-button");
    deleteButtons.forEach(function (deleteButton) {
      deleteButton.addEventListener("click", function () {
        deleteButton.parentNode.remove();
        saveToLocalStorage();
      });
    });
    var textBoxes = output.querySelectorAll(".text-box");
    textBoxes.forEach(function (textBox) {
      if (!textBox.querySelector(".delete-button")) {
        var deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", function () {
          deleteButton.parentNode.remove();
          saveToLocalStorage();
        });
        textBox.appendChild(deleteButton);
      }
      textBox.addEventListener("click", function () {
        if (textBox.style.textDecoration === "line-through") {
          textBox.style.textDecoration = "none";
        } else {
          textBox.style.textDecoration = "line-through";
        }
        saveToLocalStorage();
      });
      textBox.addEventListener("mouseover", function () {
        playRandomSound();
      });
    });
  }
}



// Save the current text in the output section to localStorage
function saveToLocalStorage() {
  var output = document.getElementById("output");
  localStorage.setItem("text", output.innerHTML);
}



// Call addText() function when "Enter" key is pressed
var input = document.getElementById("input");
input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addText();
  }
});

// Load saved data on page load
window.addEventListener("load", loadFromLocalStorage);


