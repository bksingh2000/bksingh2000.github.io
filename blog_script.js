var title = document.getElementById('title')
var img = document.getElementById('img')
var info = document.getElementById('info')
var content = document.getElementById('content')
    // Comments by user
var userComments = document.getElementById('userComments')
var commenet_count = document.getElementById('commenet_count')
    // Comment Form
var err = document.getElementById("alert");
// utils
var url = window.location.href;
var captured = /id=([^&]+)/.exec(url)[1]; // Value is in [1] ('384' in our case)
var result = captured ? captured : 'myDefaultValue';

function blogById(id) {
    $.ajax({
        type: 'GET',
        url: link + id + '/',
        dataType: 'json',
        success: function(data) {
            img.src = data.img
            title.innerText = data.title
            info.innerHTML = capitalizeFirstLetter(data.owner) + ", <span class='w3-opacity'>" + data.created_at + "</span>"
            content.innerText = data.content
            commenet_count.innerHTML = "Comments <span class='w3-tag'>" + data.comment + "</span>"
        },
    })
}

function create_comment(id) {
    $.ajax({
        url: link + "comment/",
        type: "POST",
        data: {
            post: id,
            name: $('#name').val().trim(),
            email: $('#email').val().trim(),
            body: $('#body').val().trim(),
        },
        success: function(json) {
            $('#name').val('');
            $('#email').val('');
            $('#body').val('');
            err.innerHTML = "<span class='closebtn'>&times;</span>Comment Posted successfully! Refresh the page to see."
            err.style.backgroundColor = "#4CAF50"
            err.style.display = "block"
        },

        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if (XMLHttpRequest.readyState == 4) {
                console.log(XMLHttpRequest.status + " " + XMLHttpRequest.error)
            } else if (XMLHttpRequest.readyState == 0) {
                err.innerText = "<span class='closebtn'>&times;</span>Network Error"
            } else {
                console.log("something weird is happening")
            }
        }
    });
};

function showComment(id) {
    $.ajax({
        type: 'GET',
        url: link + 'comment/' + id + '/',
        dataType: 'json',
        success: function(data) {
            $.each(data, function(k, v) {
                userComments.innerHTML += "<li class='w3-padding-16'><span class='w3-large'><b>" + v.name + "</b></span><br><span>" + v.body + "</span></li>"
            })
        },
    })
}

$(document).ready(function() {
    blogById(result)
    showComment(result)
    $('#alert').on('click', '.closebtn', function() {
        $('#alert').fadeOut('fast')
    })
    $("#submit").click(function() {
        n = $('#name').val().trim();
        e = $('#email').val().trim();
        m = $('#body').val().trim();
        if (n == '' || e == '' || m == '') {
            err.innerHTML = "<span class='closebtn'>&times;</span>Fill all the details"
            err.style.backgroundColor = "#ff9800"
            err.style.display = "block"
        } else if (!isValidEmailAddress(e)) {
            err.innerHTML = "<span class='closebtn'>&times;</span>Email is not valid"
            err.style.backgroundColor = "#ff9800"
            err.style.display = "block"
        } else {
            create_comment(result)
        }
    });
});
