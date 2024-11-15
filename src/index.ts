'use strict';
if (typeof window !== "undefined") {
  window.onload = function () {
    const submit = document.getElementById("submit") as HTMLButtonElement;
    submit.addEventListener("click", function (e: Event) {
      e.preventDefault();
      
      const inputtedName = document.getElementById("GivenName") as HTMLInputElement;
      const name = inputtedName.value;
      const inputtedEmail = document.getElementById("GivenEmail") as HTMLInputElement;
      const email = inputtedEmail.value;
      const inputtedCardNum = document.getElementById("GivenCardNum") as HTMLInputElement;
      const cardNum = inputtedCardNum.value;
      const subject = "Contact Form Submission";
      const body = `Name: ${name}\n Email: ${email}\n Card Number: ${cardNum}`;
      const mailtoLink = `mailto:challenge@dn-uk.com?subject=${subject}&body=${body}`;

      // Checks if all inputs are validated and sends email if they are or highlights pink if they are not
      if (CheckName(inputtedName) && CheckCardNum(inputtedCardNum) && CheckEmail(email)) {
        window.location.href = mailtoLink;
      } else {
        if (!CheckName(inputtedName)) {
          inputtedName.style.backgroundColor = "pink";
          alert("Invalid Name, input must be your first and last name");
        }
        if (!CheckEmail(email)) {
          inputtedEmail.style.backgroundColor = "pink";
          alert("Invalid Email, input must follow standard email format- xyz@anymail.com");
        }
        if (!CheckCardNum(inputtedCardNum)) {
          inputtedCardNum.style.backgroundColor = "pink";
          alert("Invalid Card, enter your correct card details");
        }
      }
    });
  };
}


// Validate Name: needs a first name and surname with no special characters
function CheckName(inputtedName: HTMLInputElement): boolean {

  let nameValue = inputtedName.value.toString();
  let Valid = true;
  let nameParts = nameValue.split(" ");
  console.log(nameParts)
  
  // Check that the name has exactly two parts (first name and surname)
  if (nameParts.length > 2 || nameParts.length <= 1) {
    return false;
  } else if (nameParts.length === 2) {
    const surname = nameParts[1];
    const firstname = nameParts[0];
    
    if (surname.length > 1 && firstname.length > 1) {
      Valid = true;
    } else {
      Valid = false;
    }
  } else {
    Valid = false;
  }

  const specialChars = /[0-9#$%&'*+/?=^_`{|}~]/;
  for (let i = 0; i < nameValue.length; i++) {
    if (specialChars.test(nameValue[i])) {
      return false;
    }
  }
  
  return Valid;
}

function CheckEmail(inputtedEmail: string): boolean {
  const email = inputtedEmail.trim();

  if (!email.endsWith('.com')){
    return false
  }
  // Restrict allowed characters to alphanumeric and a few special characters: @, ., _, -
  const allowedCharacters = /^[a-zA-Z0-9@._-]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  // Ensure only allowed characters and valid email format
  return allowedCharacters.test(email) && emailPattern.test(email);
}

function CheckCardNum(inputtedCardNum: HTMLInputElement): boolean {
  let cardNum = inputtedCardNum.value;
  if (cardNum.length !== 16) return false;

  let CardNumList: string[] = cardNum.split("");

  // The Luhn algorithm: double every second digit from the right
  for (let i = CardNumList.length - 2; i >= 0; i -= 2) {
    let NumVariable = (parseInt(CardNumList[i]) * 2).toString();

    if (NumVariable.length > 1) {
      let NumVariable2 = parseInt(NumVariable[0]) + parseInt(NumVariable[1]);
      CardNumList[i] = NumVariable2.toString();
    } else {
      CardNumList[i] = NumVariable;
    }
  }

  let total = 0;
  for (let i = 0; i < CardNumList.length; i++) {
    total += parseInt(CardNumList[i]);
  }

  // Check if the total is divisible by 10
  if (total % 10 === 0) {
    return true;
  } else {
    return false;
  }
}

// onBlur validation for name
function onBlurCheckName(){
  console.log('Hello')
  const inputtedNameElement = document.getElementById("GivenName") as HTMLInputElement;
  if (!CheckName(inputtedNameElement)) {
      inputtedNameElement.style.backgroundColor = "pink";
  } else {
      inputtedNameElement.style.backgroundColor = "white";
  }
}

// onBlur validation for card number
function onBlurCheckCard(){
  const inputtedCardNumElement = document.getElementById("GivenCardNum") as HTMLInputElement;
  if (!CheckCardNum(inputtedCardNumElement)) {
      inputtedCardNumElement.style.backgroundColor = "pink";
  } else {
      inputtedCardNumElement.style.backgroundColor = "white";
  }
}
