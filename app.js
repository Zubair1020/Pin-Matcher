//  ****************  Generate Number  **********************

const numberGenerateButton = document.querySelector(".generate-btn");
const generatePinInput = document.querySelector(".pin-generator input");
let randomPin;

numberGenerateButton.addEventListener("click", () => {
  randomPin = Math.floor(Math.random() * (9000 + 1)) + 1000;
  generatePinInput.value = randomPin;
});

// ****************  Set PIN input value  **********************

const pinInput = document.querySelector(".input-section input");
const numberButtons = document.querySelectorAll(".numButton");

for (let numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    pinInput.value += numberButton.textContent;
    numberButton.classList.add("activeButton");
    setTimeout(() => {
      numberButton.classList.remove("activeButton");
    }, 100);
  });
}

// ****************  Submit Button Handel & Check The PIN  **********************

const submitButton = document.querySelector(".submit-btn");
const actionLeft = document.querySelector(".action-left");
let maxAttempt = 3;

submitButton.addEventListener("click", () => {
  const pin = parseInt(pinInput.value);
  if (isNaN(pin) || pin < 1000 || pin > 9999) {
    showError("Please enter a valid 4 digit PIN!");
    maxAttempt--;
    actionLeft.textContent = `${maxAttempt} try left`;
  } else if (randomPin === pin) {
    showSuccess("PIN Matched... Secret door is opening for you");
    actionLeft.textContent = "3 try left";
  } else {
    showError("Incorrect PIN. Please try again!");
    maxAttempt--;
    actionLeft.textContent = `${maxAttempt} try left`;
  }
  if (maxAttempt === 0) {
    disableButtons();
    showError("You have exceeded the maximum number of attempts.");
    actionLeft.textContent = `${maxAttempt} try left`;
  }
});

// ****************  Delete Button Handel  **********************

const deleteButton = document.querySelector(".deleteButton");

deleteButton.addEventListener("click", () => {
  pinInput.value = pinInput.value.slice(0, -1);
  deleteButton.classList.add("activeButton");
  setTimeout(() => {
    deleteButton.classList.remove("activeButton");
  }, 100);
});

// ****************  Clear Button Handel  **********************

const clearButton = document.querySelector(".clearButton");

clearButton.addEventListener("click", () => {
  pinInput.value = "";
  clearButton.classList.add("activeButton");
  setTimeout(() => {
    clearButton.classList.remove("activeButton");
  }, 100);
});

// ****************  Some Constants for Notify  Section **********************

const matchedP = document.querySelector(".notify.matched");
const matchedSpan = document.querySelector("#matched");
const notMatchedP = document.querySelector(".notify.not-matched");
const notMatchedSpan = document.querySelector("#not-matched");

// ****************  Some Utility Function  **********************

const showSuccess = (massage) => {
  matchedP.style.display = "block";
  matchedSpan.textContent = massage;
  notMatchedP.style.display = "none";
  generatePinInput.value = "";
  pinInput.value = "";
};

const showError = (massage) => {
  notMatchedP.style.display = "block";
  notMatchedSpan.textContent = massage;
  matchedP.style.display = "none";
  pinInput.value = "";
};

const disableButtons = () => {
  generatePinInput.disabled = true;
  numberGenerateButton.disabled = true;
  submitButton.disabled = true;
  pinInput.disabled = true;
  generatePinInput.value = "";
  pinInput.value = "";
};
