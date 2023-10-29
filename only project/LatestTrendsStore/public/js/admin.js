var productImagePath = '';
var readProductDetails = () => {

    if ($("#productId").val() == "" || $("#productCategory").val() == "" || $("#productName").val() == "" || $("#productPrice").val() == "" || $("#productManu").val() == "" || $("#productSeller").val() == "" || $("#productRating").val() == "" || productImagePath == "") {
        $("#fieldValidation").show();
    } else {
        $("#fieldValidation").hide();
        $("#imgSuccessMsg").hide();        


        var productData = {}
        productData.productId = $("#productId").val();
        productData.category = $("#productCategory").val();
        productData.name = $("#productName").val();
        productData.price = $("#productPrice").val();
        productData.manufacturer = $("#productManu").val();
        productData.seller = $("#productSeller").val();
        productData.image = productImagePath;
        productData.rating = $("#productRating").val();

        console.log(productData);

        var apiEndPoint = '/new/addProduct';
        axios.post(apiEndPoint, productData).then((response) => {
            console.log(response);
            if (response.data.msg == "Done") {
                document.querySelector("#addedSuccess").style.display = "block";
                setTimeout(() => {
                    document.querySelector("#addedSuccess").style.display = "none";
                }, 3000);
                console.log("added successfully");
            } else {
                document.querySelector("#addedFailure").style.display = "block";
                setTimeout(() => {
                    document.querySelector("#addedFailure").style.display = "none";
                }, 3000);
            }
        }).catch((error) => {

        })

        var productData = {}
        $("#productId").val("");
        $("#productCategory").val("Electronics");
        $("#productName").val("");
        $("#productPrice").val("");
        $("#productManu").val("");
        $("#productSeller").val("");
        $("#productRating").val("");
    }


}

var uploadProductImage = () => {
    console.log($("input[name=prodImage]"));
    var fileInfo = $("input[name=prodImage]")[0].files[0];
    // if (fileInfo.size >= 1024){ //1MB size
    //     alert("size issue")
    // } else {
    //     alert("all good")
    // }
    if (fileInfo == undefined) {
        $("#upload").show();
    } else if (fileInfo.type == "image/jpeg" || fileInfo.type == "image/jpg" || fileInfo.type == "image/png" || fileInfo.type == "image/gif") {

        let uploadfile = $("input[name=prodImage]")[0].files[0] // file from input
        let formData = new FormData();
        formData.append("prodImage", uploadfile);

        var imageUploadReq = $.ajax({
            url: '/upload/productImage',
            type: 'POST',
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            dataType: 'JSON'
        });
        imageUploadReq.done((response) => {
            console.log("uplod doness");
            $("#upload").hide();
            $("#imgSuccessMsg").show();
            $("#imgValidation").hide();
            productImagePath = response.file_path;
        })

        // axios.post("/upload/productImage", {
        //         data: formData,
        //         enctype: 'multipart/form-data',
        //         processData: false,
        //         contentType: false,
        //         dataType: 'JSON'

        // }).then((response) => {
        //     console.log(response)
        // }).catch((error) => {
        //     console.log(error);
        // })

    } else {
        $("#imgValidation").show();
    }

}

var validateeAdminCredentials = () => {

    $(".invalidCredentials").hide();
    var adminData = {};
    adminData.adminId = $("#adminId").val();
    adminData.password = $("#actPassword").val();
    var captcha = $("#captchaInput").val();
  
  
    if (captcha !== $("#captchaImage").attr("alt")) {
      $(".invalidCredentials").text("Invalid Captcha");
      $(".invalidCredentials").show();
      return;
    }
  
  
    axios.post('/validate/adminCredentials', { params: userData })
      .then(function (response) {
        // console.log(response);
        if (response.data.msg == 'Validadmin') {
          $(".invalidCredentials").hide();
          loginModel.hide();
          $(".loginBtns").hide();
          $(".logoutBtns").show();
          loadSelectedPage('productDetails');
  
                  // Store credentials in local storage if "Remember me" checkbox is checked
                  if ($("#rememberMeCheckbox").is(":checked")) {
                    localStorage.setItem("adminId", adminData.adminId);
                    localStorage.setItem("actPassword", adminData.password);
                  }
  
          // clear the fields
          document.querySelector("#adminId").value = "";
          document.querySelector("#actPassword").value = "";
          document.querySelector("#captchaInput").value = "";
  
        } else {
          // invalid admin
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