var something = window.location.pathname; // creates url access
var pieces = something.split('/'); // creates array
var id = pieces[2]; // creates id

var $chirpButton = $('#chirp-btn');
var $chirpField = $('#chirp-field');
var $chirpList = $('#chirp-list');
var $userSelector = $('#user-selector');

//ajax request b/c server request
//needs object literal
$.ajax({
    method: 'GET',
    url: '/api/chirps/' + id
}).then(function(chirp) {
    addChirpDiv(chirp);
}, function(err) {
    console.log(err);
});

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
    // var $edit = $top;
    var $bottom = $('<div id="bottom"></div>');
    var $topLeft = $('<div id="top-left"></div>');
    var $topRight = $('<div id="top-right"></div>');
    var $bottomLeft = $('<div id="bottom-left"></div>');
    var $bottomRight = $('<div id="bottom-right"></div>');
    var $timestamp = $('<li class="date"><h5></h5></li>');
    var $delete = $('<h5 class="nav-option">delete</h5>');
    var $edit = $('<h5 class="nav-option-top">edit</h5>')
    var $link = $('<a></a>');
    $link.attr('href', '/chirps/' + chirp.id); // built in function

    $delete.click(function () {
        if (confirm('Are you sure you want to delete this chirp?'));
        $.ajax({
            method: 'DELETE',
            url: '/api/chirps/' + id
        }).then(function() {
            window.location.replace('/chirps');
        }, function(err) {
            console.log(err);
        });
    });

    $edit.click(function() {
        window.location.pathname = '/chirps/' + id + '/update/';
    });

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
    $edit.appendTo($top);
    $delete.appendTo($bottom);
    //$delButton.appendTo($chirpDiv);
    
    $chirpGrid.appendTo($chirpList);
    // $link.appendTo($chirpList);
}

// function addChirpDiv(chirp) {
//     var $chirpDiv = $('<div class="chirp"></div>');
//     var $message = $('<p></p>');
//     var $user = $('<h4></h4>');
//     var $container = $('<div class="container"></div>')
//     var $navbar = $('<ul></ul>')
//     var $timestamp = $('<li class="date"><h5></h5></li>');
//     var $singleview = $('<li><button id="single">Details</button></li>');
//     var $edit = $('<li><button id="edit">Edit</button></li>');
//     var $delButton = $('<li><button class="delete-button">Delete</button></li>');

//     $delButton.click(function () {
//         if (confirm('Are you sure you want to delete this chirp?'));
//         $.ajax({
//             method: 'DELETE',
//             url: '/api/chirps/' + id
//         }).then(function() {
//             window.location.replace('/chirps');
//         }, function(err) {
//             console.log(err);
//         });
//     });

//     $edit.click(function() {
//         window.location.pathname = '/chirps/' + id + '/update/';
//     });

//     $message.text(chirp.message);
//     $user.text(chirp.userName);
//     $timestamp.text(new Date(chirp.timestamp).toLocaleString());

//     $user.appendTo($chirpDiv);
//     $message.appendTo($chirpDiv);
//     $container.appendTo($chirpDiv);
//     $navbar.appendTo($container);
//     $edit.appendTo($navbar);
//     $timestamp.appendTo($navbar);
//     // $singleview.appendTo($navbar);
//     $delButton.appendTo($navbar);

//     $chirpDiv.appendTo('#chirp-list');
// }