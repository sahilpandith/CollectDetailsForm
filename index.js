import './style.css';
function getFormNodeAndInputs (){
    const formNode = document.createElement('form');
    formNode.setAttribute('novalidate',true);
    formNode.setHTML(`<label for="email">Email</label>
        <input id="email" type="email" name="email" required>
        <span class="error" ></span>
        <label for="country">Country</label>
        <input id="country" type="text" name="country" required>
        <span class="error" ></span>
        <label for="zipCode">Zip Code</label>
        <input id="zipCode" type="text" name="zipCode" required pattern="[0-9]{6}">
        <span class="error" ></span>
        <label for="password">Password</label>
        <input id="password" type="password" name="password" required minlength='8'>
        <span class="error" ></span>
        <label for="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" type="password" name="confirmPassword" required minlength='8'>
        <span class="error" ></span>
        <button type="submit" id="submitDetails">Submit</button>`)
        
    const emailNode =formNode.querySelector('#email');
    const countryNode =formNode.querySelector('#country');
    const zipCodeNode =formNode.querySelector('#zipCode');
    const passwordNode =formNode.querySelector('#password');
    const confirmPasswordNode =formNode.querySelector('#confirmPassword');
    const submitBtnNode =formNode.querySelector('#submitDetails');
    return {
        formNode,
        emailNode,
        countryNode,
        zipCodeNode,
        passwordNode,
        confirmPasswordNode,
        submitBtnNode
    }
}

function resetInputErrorState(){
    this.nextElementSibling.textContent = "";
    this.classList.remove('error-active');
}
function validateEmailInput(event){
    this.setCustomValidity('');
    if(this.validity.valid){
        resetInputErrorState.call(this);
    }else{
        if(this.validity.valueMissing){
            this.setCustomValidity('Email is required');
            this.nextElementSibling.textContent = "Email is required";
        }else if(this.validity.typeMismatch){
            this.setCustomValidity('Email should be of format something@something.com');
            this.nextElementSibling.textContent = "Invalid Email format";
        }
        this.classList.add("error-active");
    }
}
function validateCountryInput(event){
    this.setCustomValidity('');
    if(this.validity.valid){
        resetInputErrorState.call(this);
    }else{
        if(this.validity.valueMissing){
            this.setCustomValidity('Country is required');
            this.nextElementSibling.textContent = "Country is required";
        }
        this.classList.add("error-active");
    }
}
function validateZipCodeInput(event){
    this.setCustomValidity('');
    if(this.validity.valid){
        resetInputErrorState.call(this);
    }else{
        if(this.validity.valueMissing){
            this.setCustomValidity('Zip Code is required');
            this.nextElementSibling.textContent = "Zip Code is required";
        }else if(this.validity.patternMismatch){
            this.setCustomValidity('Zipcode should be of 6 digits.');
            this.nextElementSibling.textContent = "ZipCode format - 6 digits";
        }
        this.classList.add("error-active");
    }
}
function validatePasswordInput(event){
    this.setCustomValidity('');
    if(this.validity.valid){
        resetInputErrorState.call(this);
    }else{
        if(this.validity.valueMissing){
            this.setCustomValidity('Password is required');
            this.nextElementSibling.textContent = "Password is required";
        }else if(this.validity.tooShort){
            this.setCustomValidity('min length is 8.');
            this.nextElementSibling.textContent = "min length should be 8";
        }
        this.classList.add("error-active");
    }
}

function validateConfirmPasswordInput(event,passwordNode){
    this.setCustomValidity('');
    if(this.validity.valid && passwordNode.value===this.value){
        resetInputErrorState.call(this);
    }else{
        if(this.validity.valueMissing){
            this.setCustomValidity('Confrim Password is required');
            this.nextElementSibling.textContent = "Confrim Password is required";
        }else if(this.validity.tooShort){
            this.setCustomValidity('min length is 8.');
            this.nextElementSibling.textContent = "min length should be 8";
        }else if(passwordNode.value!==this.value){
            this.setCustomValidity('it should be same as password.');
            this.nextElementSibling.textContent = "it should be same as password.";
        }
        this.classList.add("error-active");
    }
}

const module = (function(){
    const root = document.getElementById('root');
    const {formNode,emailNode,countryNode,zipCodeNode ,passwordNode,confirmPasswordNode,submitBtnNode} = getFormNodeAndInputs();
    root.appendChild(formNode);

    emailNode.addEventListener('blur',validateEmailInput);
    countryNode.addEventListener('blur',validateCountryInput);
    zipCodeNode.addEventListener('blur',validateZipCodeInput);
    passwordNode.addEventListener('blur',validatePasswordInput);
    confirmPasswordNode.addEventListener('blur',function(event){
        validateConfirmPasswordInput.call(this,event,passwordNode);
    });
    

    submitBtnNode.addEventListener('click',function(event){
        event.preventDefault();
        validateEmailInput.call(emailNode);
        validateCountryInput.call(countryNode);
        validateZipCodeInput.call(zipCodeNode);
        validatePasswordInput.call(passwordNode);
        validateConfirmPasswordInput.call(confirmPasswordNode,event,passwordNode);
        if(!formNode.checkValidity()) return;
        root.innerHTML += `<div class="sucess">Details submitted successfully</div>`;
    })
})()