var addNewUser = () => {
    var userData = {};
    userData.account_id = $("#signUpId").val();
    userData.password =  $("#signUpPwd").val();
    userData.mailId =  $("#signUpMail").val();

    var captchaSignUp = $("#signUpCaptcha").val();


    if (captchaSignUp !== $("#captchaImageInSignup").attr("alt")) {
    //   $(".invalidCredentialsInSignUp").text("Invalid Captcha");
    //   $(".invalidCredentials").show();
    document.querySelector(".invalidCredentialsInSignUp").style.display = "block";
      return;
    } 

    document.querySelector(".invalidCredentialsInSignUp").style.display = "none";
    console.log(userData);

    axios.post("/new/user/signup", userData).then((response) => {
        console.log(response)
        if (response.data.msg == 'Done') {
            $(".successSignup").show();
            setTimeout(() => {
                $(".successSignup").hide();
            }, 3000);
        } else {
            // handle error communication
        }
    }).catch((error) => {
        console.log("its error")
    })

    document.querySelector("#signUpId").value = "";
    document.querySelector("#signUpPwd").value = "";
    document.querySelector("#signUpRepPwd").value = "";
    document.querySelector("#signUpMail").value = "";
    document.querySelector("#signUpCaptcha").value = "";
    signUpCloseBtn();
}

