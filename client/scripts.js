var $chirpButton = $('#chirp-btn');
var $chirpField = $('#chirp-field');
var $chirpList = $('#chirp-list');
var $userSelector = $('#user-selector');

$chirpField.on('input', function () {
    var isEmpty = $chirpField.val().length === 0;
    $chirpButton.prop('disabled', isEmpty);
});
$chirpButton.click(postChirp);

function postChirp() {
    var chirp = {
        message: $chirpField.val(),
        userid: $userSelector.val()
        // user: 'userAdmin',
        // timestamp: new Date().toISOString()
    };
    $.ajax({
        method: 'POST',
        url: '/api/chirps',
        contentType: 'application/json',
        data: JSON.stringify(chirp)
    }).then(function (success) {
        $chirpField.val('');
        $chirpButton.prop('disabled', true);
        getChirps();
    }, function (err) {
        console.log(err);
    });
}


function getChirps() {
    $.ajax({
        method: 'GET',
        url: '/api/chirps'
    }).then(function (chirps) {
        $chirpList.empty();
        for (var i = 0; i < chirps.length; i++) {
            addChirpDiv(chirps[i]); // passing in entire object
        }
    }, function (err) {
        console.log(err);
    })
}
getChirps();

function deleteChirps(id) {
    $.ajax({
        method: 'DELETE',
        url: '/api/chirps/' + id
    }).then(function() {
        getChirps();
    }, function(err) {
        console.log(err);
    })
}

function addChirpDiv(chirp) {
    var $chirpGrid = $('<div id="chirp-grid"></div>');
    var $containerL = $('<div class="container-l"></div>');
    var $containerR = $('<div class="container-r"></div>');
    var $chirpDrawerTop = $('<div class="chirp-drawer-top"></div>');
    var $chirpDrawerBottom = $('<div class="chirp-drawer-bottom"></div>');
    var $message = $('<p></p>');
    var $chirpMessage = $('<div id="chirp-message"></div>');
    var $user = $('<h4></h4>');
    // var $container = $('<div class="container"></div>')
    var $chirpNav = $('<div class="chirp-nav"></div>');
    var $top = $('<div id="top"></div>');
    var $bottom = $('<div id="bottom"></div>');
    var $topLeft = $('<div id="top-left"></div>');
    var $topRight = $('<div id="top-right"></div>');
    var $bottomLeft = $('<div id="bottom-left"></div>');
    var $bottomRight = $('<div id="bottom-right"></div>');
    var $timestamp = $('<li class="date"><h5></h5></li>');
    var $singleview = $('<h5 class="nav-option">details</h5>');
    var $shareBtn = $('<h5 class="nav-option-top">share</h5>')
    var $link = $('<a></a>');
    $link.attr('href', '/chirps/' + chirp.id); // built in function

    $message.text(chirp.message);
    $user.text(chirp.userName);
    $timestamp.text(new Date(chirp.timestamp).toLocaleString());

    $containerL.appendTo($chirpGrid);
    $containerR.appendTo($chirpGrid);

    $chirpDrawerTop.appendTo($containerL);
    $chirpMessage.appendTo($containerL);
    $chirpDrawerBottom.appendTo($containerL);

    $chirpNav.appendTo($containerR);
    $top.appendTo($chirpNav);
    $bottom.appendTo($chirpNav);

    $topLeft.appendTo($chirpDrawerTop);
    $topRight.appendTo($chirpDrawerTop);
    $bottomLeft.appendTo($chirpDrawerBottom);
    $bottomRight.appendTo($chirpDrawerBottom);

    $user.appendTo($topLeft);
    $message.appendTo($chirpMessage);
    $timestamp.appendTo($bottomRight);
    $shareBtn.appendTo($top);
    $singleview.appendTo($bottom);
    //$delButton.appendTo($chirpDiv);
    
    $chirpGrid.appendTo($link);
    $link.appendTo($chirpList);
}

// function addChirpDiv(chirp) {
//     var $chirpDiv = $('<div class="chirp"></div>');
//     var $message = $('<p></p>');
//     var $user = $('<h4></h4>');
//     var $container = $('<div class="container"></div>')
//     var $navbar = $('<ul></ul>')
//     var $timestamp = $('<li class="date"><h5></h5></li>');
//     var $singleview = $('<li><button id="single">Details</button></li>')
//     var $link = $('<a></a>');
//     $link.attr('href', '/chirps/' + chirp.id); // built in function
//     /*var $delButton = $('<button class="delete-button">Delete</button>');
//     $delButton.click(function () {
//         deleteChirp(chirp.id);
//     });*/

//     $message.text(chirp.message);
//     $user.text(chirp.userName);
//     $timestamp.text(new Date(chirp.timestamp).toLocaleString());

//     $user.appendTo($chirpDiv);
//     $message.appendTo($chirpDiv);
//     $container.appendTo($chirpDiv);
//     $navbar.appendTo($container);
//     $timestamp.appendTo($navbar);
//     $singleview.appendTo($navbar);
//     //$delButton.appendTo($chirpDiv);

//     $chirpDiv.appendTo($link);
//     $link.appendTo($chirpList);
// }

// function editChirp (id) {
//     var $chirpDiv = $('<div class="chirp"></div>')
//     addEventListener

    
//     $.ajax({
//         method: 'GET',
//         url: '/api/chirps/' + '*[@id="chirp-list"]/div[]',
//     }).then(function (success) {
//         $chirpDiv.click(function() {
//             var pieces = something.split('/');
//             var divId = pieces[2];
//         })
//     }, function (err) {
//         console.log(err);
//     });
// }

function populateUsers() {
    $.ajax({
        method: 'GET',
        url: '/api/users'
    }).then(function (users) {
        for (var i = 0; i <
            users.length; i++) {
            var $userOption = $('<option value="' + users[i].id + '">' + users[i].name + '</option>');
            $userSelector.append($userOption);
        }
    }, function (err) {
        console.log(err);
    });
}
populateUsers();