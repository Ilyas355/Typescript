'use strict';
if (typeof window !== "undefined") {
    window.onload = function () {
        const submit = document.getElementById("submit");
        if (submit) {
            submit.addEventListener("click", function (e) {
                e.preventDefault();
                const inputtedName = document.getElementById("GivenName");
                const inputtedEmail = document.getElementById("GivenEmail");
                const inputtedCardNum = document.getElementById("GivenCardNum");
                if (!inputtedName || !inputtedEmail || !inputtedCardNum)
                    return;
                const name = inputtedName.value;
                const email = inputtedEmail.value;
                const cardNum = inputtedCardNum.value;
                const subject = "Contact Form Submission";
                const body = `Name: ${name}\n Email: ${email}\n Card Number: ${cardNum}`;
                const mailtoLink = `mailto:challenge@dn-uk.com?subject=${subject}&body=${body}`;
                if (CheckName(inputtedName) && CheckCardNum(inputtedCardNum) && CheckEmail(email)) {
                    window.location.href = mailtoLink;
                }
                else {
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
        }
    };
}
// Validate Name: needs a first name and surname with no special characters
function CheckName(inputtedName) {
    const nameValue = inputtedName.value.toString().trim();
    let Valid = true;
    const nameParts = nameValue.split(" ");
    if (nameParts.length !== 2 || nameParts[0].length <= 1 || nameParts[1].length <= 1) {
        return false;
    }
    const specialChars = "[#$%&'*+/?=^_`{|}~]";
    for (const char of nameValue) {
        if (specialChars.includes(char)) {
            Valid = false;
            break;
        }
    }
    return Valid;
}
// Checks if the email entered is validated
function CheckEmail(inputtedEmail) {
    const email = inputtedEmail.trim();
    const allowedCharacters = /^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~@.]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return allowedCharacters.test(email) && emailPattern.test(email);
}
// Validate Card Number using Luhn's algorithm
function CheckCardNum(inputtedCardNum) {
    const cardNum = inputtedCardNum.value;
    if (cardNum.length !== 16 || isNaN(Number(cardNum)))
        return false;
    let sum = 0;
    for (let i = 0; i < cardNum.length; i++) {
        let digit = parseInt(cardNum[i]);
        if ((cardNum.length - i) % 2 === 0) {
            digit *= 2;
            if (digit > 9)
                digit -= 9;
        }
        sum += digit;
    }
    return sum % 10 === 0;
}
// onBlur validation for name
function onBlurCheckName() {
    const inputtedNameElement = document.getElementById("GivenName");
    if (inputtedNameElement) {
        if (!CheckName(inputtedNameElement)) {
            inputtedNameElement.style.backgroundColor = "pink";
        }
        else {
            inputtedNameElement.style.backgroundColor = "white";
        }
    }
}
// onBlur validation for card number
function onBlurCheckCard() {
    const inputtedCardNumElement = document.getElementById("GivenCardNum");
    if (inputtedCardNumElement) {
        if (!CheckCardNum(inputtedCardNumElement)) {
            inputtedCardNumElement.style.backgroundColor = "pink";
        }
        else {
            inputtedCardNumElement.style.backgroundColor = "white";
        }
    }
}
//# sourceMappingURL=index.js.map