var loadSelectedPage = (type) => {
    var templateUrl;
    switch (type) {
        case 'wlcmPage':
            templateUrl = 'templates/welcomePage.htm';
            break;
        case 'productDetails':
            templateUrl = 'templates/productDetailsPage.htm';
            break;
    }

    axios.get(templateUrl)
    .then(function (response) {
        // handle success
        $('main').html(response.data);

        if (type == 'productDetails') {
            loadPDetails();
        }
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
}

document.addEventListener("DOMContentLoaded", () => {
    loadSelectedPage('wlcmPage')
});

