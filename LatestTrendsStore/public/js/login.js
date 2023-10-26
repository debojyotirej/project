
var validateeUserCredentials = () => {

  $(".invalidCredentials").hide();
  var userData = {};
  userData.userId = $("#userId").val();
  userData.password = $("#acctPassword").val();
  var captcha = $("#captchaInput").val();


  if (captcha !== $("#captchaImage").attr("alt")) {
    $(".invalidCredentials").text("Invalid Captcha");
    $(".invalidCredentials").show();
    return;
  }


  axios.post('/validate/userCredentials', { params: userData })
    .then(function (response) {
      // console.log(response);
      if (response.data.msg == 'ValidUser') {
        $(".invalidCredentials").hide();
        loginModel.hide();
        $(".loginBtns").hide();
        $(".logoutBtns").show();
        $(".cartDialog").hide();
        loadSelectedPage('productDetails');

                // Store credentials in local storage if "Remember me" checkbox is checked
                if ($("#rememberMeCheckbox").is(":checked")) {
                  localStorage.setItem("userId", userData.userId);
                  localStorage.setItem("acctPassword", userData.password);
                }

        // clear the fields
        document.querySelector("#userId").value = "";
        document.querySelector("#acctPassword").value = "";
        document.querySelector("#captchaInput").value = "";

      } else {
        // invalid user
        $(".invalidCredentials").text("Invalid Credentials");
        $(".invalidCredentials").show();
      }
    })
    .catch(function (error) {
      console.log(error);
    })

  document.querySelector("#navBurgerButton").classList.add("collapsed");
  document.querySelector("#navbarNav").classList.remove("show");

}

var closeBtn = () => {
  // document.querySelector("#closeButton").setAttribute("data-bs-dismiss", "modal");
  document.querySelector("#userId").value = "";
  document.querySelector("#acctPassword").value = "";
  document.querySelector("#captchaInput").value = "";
  document.querySelector("#navBurgerButton").classList.add("collapsed");
  document.querySelector("#navbarNav").classList.remove("show");
}

var signUpCloseBtn = () => {
  document.querySelector("#signUpId").value = "";
  document.querySelector("#signUpPwd").value = "";
  document.querySelector("#signUpRepPwd").value = "";
  document.querySelector("#signUpMail").value = "";
  document.querySelector("#signUpCaptcha").value = "";
  document.querySelector(".passwordValidation").style.display = "none";
  document.querySelector(".repPassValidation").style.display = "none";
  document.querySelector(".emailValidation").style.display = "none";
}

var signUpModal;

var signUp = () => {
   var captcha = generateCaptcha();
  document.querySelector("#captchaImageInSignup").src = "https://dummyimage.com/200x80/000/fff&text=" + captcha;
  document.querySelector("#captchaImageInSignup").alt = captcha; // Set captcha as the alt attribute

  // for hamburger menu
  document.querySelector("#navBurgerButton").classList.add("collapsed");
  document.querySelector("#navbarNav").classList.remove("show");
}

var loginModel;


var showLoginDialog = () => {
  openCaptcha();
  loginModel = new bootstrap.Modal('#loginDialog');

    // Retrieve credentials from localStorage
    var storedUserId = localStorage.getItem("userId");
    var storedAcctPassword = localStorage.getItem("acctPassword");
  
    // Set the stored credentials in the input fields
    document.querySelector("#userId").value = storedUserId;
    document.querySelector("#acctPassword").value = storedAcctPassword;
    
  loginModel.show();
}



var loginInSignUp = () => {
  openCaptcha();
  document.querySelector("#signUpId").value = "";
  document.querySelector("#signUpPwd").value = "";
  document.querySelector("#signUpRepPwd").value = "";
  document.querySelector("#signUpMail").value = "";
  document.querySelector("#signUpCaptcha").value = "";
}

var signUpInLogin = () => {
  refreshCaptchaOnSignUp();
  document.querySelector("#userId").value = "";
  document.querySelector("#acctPassword").value = "";
  document.querySelector("#captchaInput").value = "";
}

var forgotPwdInLogin = () => {
  var captcha = generateCaptcha();
  document.querySelector("#captchaImageInForgot").src = "https://dummyimage.com/200x80/000/fff&text=" + captcha;
  document.querySelector("#captchaImageInForgot").alt = captcha; // Set captcha as the alt attribute

  // clear the login fields
  document.querySelector("#userId").value = "";
  document.querySelector("#acctPassword").value = "";
  document.querySelector("#captchaInput").value = "";
}

var closeBtnOnForgotPwd = () => {
  document.querySelector("#userIdInForgot").value = "";
  document.querySelector("#mailIdInForgot").value = "";
  document.querySelector("#captchaInForgot").value = "";
}

var refreshCaptchaOnSignUp = () => {
  var captcha = generateCaptcha();
  document.querySelector("#captchaImageInSignup").src = "https://dummyimage.com/200x80/000/fff&text=" + captcha;
  document.querySelector("#captchaImageInSignup").alt = captcha; // Set captcha as the alt attribute
  document.querySelector("#signUpCaptcha").value = "";
}

var refreshCaptchaOnForgot = () => {
  var captcha = generateCaptcha();
  document.querySelector("#captchaImageInForgot").src = "https://dummyimage.com/200x80/000/fff&text=" + captcha;
  document.querySelector("#captchaImageInForgot").alt = captcha; // Set captcha as the alt attribute
  document.querySelector("#captchaInForgot").value = "";
}

var logOutYesBtn = () => {
  loadSelectedPage('wlcmPage');
  $(".loginBtns").show();
  $(".logoutBtns").hide();
  
}

var cart =() => {
  $(".cartDialog").hide();
}

// simple validation
var validatePasswordSimple = (event) => {

  var userInputPwd = document.querySelector("#signUpPwd").value;

  var noCount = 0;
  var lowerCount = 0;

  // first alphabet not an uppercase
  if (userInputPwd.length == 0) {
    // if we speedily click backspace the color of all qualifications is red
    document.querySelector("#num2").style.color = 'red';
    document.querySelector("#low2").style.color = 'red';
  }

  for (var i = 0; i < userInputPwd.length; i++) {

    // should have 2 numbers 
    if (userInputPwd.charCodeAt(i) >= 48 && userInputPwd.charCodeAt(i) <= 57) {
      noCount++;
    }
    applyColorBasedOnType('#num2', noCount >= 2);

    // should have 2 lowercase alphabets
    if (userInputPwd.charCodeAt(i) >= 97 && userInputPwd.charCodeAt(i) <= 122) {
      lowerCount++;
    }
    applyColorBasedOnType("#low2", lowerCount >= 2);
  }

  if (document.querySelector("#num2").style.color == 'green' && document.querySelector("#low2").style.color == 'green') {
    document.querySelector(".passwordValidation").style.display = "none";
    document.getElementById("signUpRepPwd").disabled = false;
  } else {
    document.getElementById("signUpRepPwd").disabled = true;
  }

}

var applyColorBasedOnType = (selector, isValid) => {
  if (isValid) {
    document.querySelector(selector).style.color = 'green';
  } else {
    document.querySelector(selector).style.color = 'red';
  }
}


var validateRePassword = (event) => {
  var rePassword = document.getElementById("signUpRepPwd").value;
  var stringSizeRepeat = rePassword.length;

  var userInputPwdRe = document.querySelector("#signUpPwd").value;
  var userInputPwdRepeat = document.querySelector("#signUpRepPwd").value;

  if (userInputPwdRe == userInputPwdRepeat) {
    document.querySelector(".repPassValidation").style.display = "none";
  } else {
    document.querySelector(".repPassValidation").style.display = "block";
  }
}

var showValidationDialogue = () => {
  document.querySelector(".passwordValidation").style.display = "block";
  if (document.querySelector("#num2").style.color == 'green' && document.querySelector("#low2").style.color == 'green') {
    document.querySelector(".passwordValidation").style.display = "none";
  }
}


var ValidateEmail = (mail) => {
  var mail = document.querySelector("#signUpMail").value;
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (mail.match(validRegex)) {
    document.querySelector(".emailValidation").style.display = "none";
  } else {
    document.querySelector(".emailValidation").style.display = "block";
  }
}


var checkUserLoginstatus = () => {
  axios.get("/user/validateSession").then((response) => {
    console.log(response);
    if (response.data.isUserLoggedin) {
      // show directly the product details page
      loadSelectedPage('productDetails');
      $(".loginBtns").hide();
      $(".logoutBtns").show();
    }
  })
}


document.addEventListener("DOMContentLoaded", () => {
  checkUserLoginstatus();
})