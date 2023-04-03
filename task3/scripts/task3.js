/**
* The function validates the username input field
* takes as parameter the register Form
* returns true if the username is a valid email address, false otherwise
* Uses regular expression to check the username pattern
* Uses the function displayError to display an error message if any.
*/

function validateEmail(registerForm) {
	//gets the username input field value
	let email=registerForm.username.value.trim();
	//define the valid pattern
	let pattern=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
	//if the input doesn't match the given pattern
	if(!(pattern.test(email))) {
		displayError("span","Please insert a valid email address","username");
		return false;
	}
	//if the username length > 40 characters
	if(email.length > 40) {
		displayError("span","Max Username length 40 characters","username");
		return false;
	}
	return true;
}

/**
* The function validates the password input value.
* Takes the form as parameter.
* Uses regular expressions to check the password pattern
* Returns true if the value entered is valid, false otherwise.
* Uses the function displayError to display an error message if any.
*/

function validatePassword(registerForm) {
	//gets the value of the password input.
	let pass=registerForm.password.value;
	pass=pass.trim();
	//if the password doesn't contain a lower case letter.
	if (!pass.match(/[a-z]/g)) {
		displayError("span","Password must contain at least one lower case letter","password");
		return false;
	}
	//if the password doesn't contain an upper case letter
	if (!(pass.match(/[A-Z]/g))) {
		displayError("span","Password must contain at least one upper case letter","password");
		return false;
	}
	//if the password doesn't contain a numeric character
	if (!(pass.match(/[0-9]/g))) {
		displayError("span","Password must contain at least one number","password");
		return false;
	}
	//check for white space
	if (pass.match(/[" "]/g)) {
		displayError("span","No White Spaces Please","password");
		return false;
	}
	//if the password length is not 8
	if (!(pass.length > 7)) {
		displayError("span","Password must be 8 characters","password");
		return false;
	}
	
	return true;
}

/**
* The Function check if the two entered password match, 
* Uses the function displayError to displays an error message
* if they don't.
* Takes as parameter the form.
* Returns a boolean.
*/

function checkPasswordMatch (registerForm) { 
	//gets the value of the password input.
	let originalPassword = registerForm.password.value.trim();
	//gets the value of the retyped password input.
	let retypedPassword = registerForm.retypedpassword.value.trim(); 
	//if the passwords match
	if (originalPassword === retypedPassword) { 
		return true; 
	} else {
		//displays an error message.
		let passwordMatchError = document.getElementById("passwordmatcherror");
		if(passwordMatchError) {
			passwordMatchError.setAttribute("class", "error");
			passwordMatchError.innerHTML = ("Passwords do not match. Please retype");
			return false;
		}
		else {
			displayError("span","Passwords do not match. Please retype","retypedpassword");
			return false;
		}
	}
}

/**
* The function display an error message on the screen.
* Takes the new html element type, the text to display,
* and the position where insert the message.
* returns nothing.
*/

function displayError(newNodeType, newNodeText, elem) {
	//gets the position
	let element=document.getElementById(elem);
	// creates the new html element.
	let error = document.createElement(newNodeType);
	//creates the new text element 
	let errorText = document.createTextNode(newNodeText);
	//appends the text element to the new element
	error.appendChild(errorText);
	//assigns class attribute to the new element 
    error.setAttribute("class","error");
	//insert the element in  the given position
    element.parentNode.insertBefore(error,element.nextSibiling);
}

/**
* The function is used to make the show password checkbox work.
* Takes the form as parameter.
* return nothing.
*/

function showPasswords(registerForm) {
	//gets the password input element
	let password=registerForm.password;
	//gets the retyped password input element
	let retyped=registerForm.retypedpassword;
	//check the password input type value and act accordingly 
	if (password.type === "password") {
		password.type = "text";
	  } else {
		password.type = "password";
	  }
	  //check the password input type value and act accordingly
	  if (retyped.type === "password") {
		retyped.type = "text";
	  } else {
		retyped.type = "password";
	  }
}

/**
* The function remove the error messages from the screen.
* Takes nothing as parameter
* Returns nothing
*/

function cleanErrors() {
	//gets all the elements of class errors
	let errors=document.getElementsByClassName("error");
	//if any
	if(errors) {
		//remove them
		for(let i=errors.length; i>0; i--) {
			errors[i-1].remove();
		}
	}
}


window.onload = () => {
	//gets the form
	let registerForm = document.getElementById("registerdetails");
	//gets the submit button
	let regButton=document.getElementById("registerButton");
	//gets the show password checkbox
	let toogle=document.getElementById("showpasswords");
	//set an event listener on the registration button
	//and defines the event handler function 
	regButton.addEventListener("click", (event) => {
		cleanErrors();
	});
	//set an event listener on the show password checkbox 
	//and defines the event handler function 
	toogle.addEventListener("change",(event) => {
		showPasswords(registerForm);
	},false);
	//set an event listener on the form 
	//and defines the handler function 
	registerForm.addEventListener("submit", 
	(event) => {
		if(!validateEmail(registerForm)) {
			event.preventDefault();
		}
		
		if(!validatePassword(registerForm)) {
			event.preventDefault();
		}
		
		if (!checkPasswordMatch(registerForm)) {
			event.preventDefault();
		}
	}, false);
}
