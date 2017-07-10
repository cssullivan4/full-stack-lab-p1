var something = window.location.pathname; // creates url access
var pieces = something.split('/'); // creates array
var id = pieces[2]; // creates id

var $chirpButton = $('#chirp-btn');
var $chirpField = $('#chirp-field');
var $chirpList = $('#chirp-list');
var $userSelector = $('#user-selector');

$.ajax({
    method: 'GET',
    url: '/api/chirps/' + id
}).then(function(chirp) {
    addChirpDiv(chirp);
    $('#chirp-message').val(chirp.message) // pass current value (what's typed in there)
    $('#top-btn').click(function() {
    var payload = {
        message: $('#chirp-message').val()
    };
    $.ajax({
        method: 'PUT',
        url: '/api/chirps/' + id,
        contentType: 'application/json',
        data: JSON.stringify(payload)
    }).then(function() {
        window.location.replace('/chirps/' + id);
    }, function(err) {
        console.log(err);
    })
});
 $('.nav-option-top').click(function() {
    var payload = {
        message: $('#chirp-message').val()
    };
    $.ajax({
        method: 'PUT',
        url: '/api/chirps/' + id,
        contentType: 'application/json',
        data: JSON.stringify(payload)
    }).then(function() {
        // window.history.back();
        window.location.replace('/chirps/' + id);
    }, function(err) {
        console.log(err);
    })
});
}, function (err) {
    console.log(err);
});



function addChirpDiv(chirp) {
    var $chirpGrid = $('<div id="chirp-grid"></div>');
    var $containerL = $('<div class="container-l"></div>');
    var $containerR = $('<div class="container-r"></div>');
    var $chirpDrawerTop = $('<div class="chirp-drawer-top"></div>');
    var $chirpDrawerBottom = $('<div class="chirp-drawer-bottom"></div>');
    var $message = $('<p></p>');
    var $chirpMessage = $('<textarea rows="4" wrap: "soft" maxlength="140" id="chirp-message" cols="50"></textarea>');
    var $user = $('<h4></h4>');
    // var $container = $('<div class="container"></div>')
    var $chirpNav = $('<div class="chirp-nav"></div>');
    var $editBtn = $('<div id="top-btn"></div>');
    // var $edit = $top;
    var $bottom = $('<div id="bottom"></div>');
    var $topLeft = $('<div id="top-left"></div>');
    var $topRight = $('<div id="top-right"></div>');
    var $bottomLeft = $('<div id="bottom-left"></div>');
    var $bottomRight = $('<div id="bottom-right"></div>');
    var $timestamp = $('<li class="date"><h5></h5></li>');
    var $delete = $('<h5 class="nav-option">delete</h5>');
    var $editText = $('<h5 class="nav-option-top">update</h5>')
    var $link = $('<a></a>');
    // $link.attr('href', '/chirps/' + chirp.id); // built in function

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

    $editBtn.click(function() {
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
    
    $editText.appendTo($editBtn);
    $chirpNav.appendTo($containerR);
    // $top.appendTo($chirpNav);
    $editBtn.appendTo($chirpNav);
    $delete.appendTo($bottom);
    $bottom.appendTo($chirpNav);

    $topLeft.appendTo($chirpDrawerTop);
    $topRight.appendTo($chirpDrawerTop);
    $bottomLeft.appendTo($chirpDrawerBottom);
    $bottomRight.appendTo($chirpDrawerBottom);

    $user.appendTo($topLeft);
    $message.appendTo($chirpMessage);
    $timestamp.appendTo($bottomRight);

    
    $chirpGrid.appendTo($chirpList);
    // $link.appendTo($chirpList);
}