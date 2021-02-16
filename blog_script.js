var page_title = document.getElementById('page_title')
var title = document.getElementById('title')
var img = document.getElementById('img')
var info = document.getElementById('info')
var content = document.getElementById('content')
    // Comments by user
var commentBox = document.getElementById('commentBox')
var userComments = document.getElementById('userComments')
var commenet_count = document.getElementById('commenet_count')
    // Comment Form
var err = document.getElementById("alert");
// utils
var url = window.location.href;
try {
    var captured = /id=([^&]+)/.exec(url)[1]; // Value is in [1] ('384' in our case)
    var result = captured ? captured : '';
} catch (error) {
    console.log('err: 404')
}


function blogById(id) {
    $.ajax({
        type: 'GET',
        url: link + id + '/',
        dataType: 'json',
        beforeSend: function() {
            $('#loader').removeClass('hidden')
        },
        success: function(data) {
            page_title.innerText = data.title
            img.src = data.img
            title.innerText = data.title
            info.innerHTML = capitalizeFirstLetter(data.owner) + ", <span class='w3-opacity'>" + data.created_at + "</span>"
            content.innerText = data.content
            commentBox.innerHTML = "<h3>Comment</h3><input type='text' placeholder='Name' id='name' name='name'><input type='text' placeholder='Email address' id='email' name='email'><textarea name='msg' placeholder='Write something..' style='height:200px' id='body' name='msg'></textarea><div class='alert success' id='alert'></div><input type='submit' id='submit' value='Add Comment'>"
            commenet_count.innerHTML = "Comments <span class='w3-tag'>" + data.comment + "</span>"
        },
        complete: function() {
            $('#loader').addClass('hidden')
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if (XMLHttpRequest.readyState == 4) {
                // console.log(XMLHttpRequest.status + " " + XMLHttpRequest.statusText)
                page_title.innerText = "Blog not found"
                title.innerHTML = "<p>Error 404!!</p>Possible reason<ul><li>No blog available or blog has been removed</li><li>You are seeing blog.html homepage<br>Note: blog.html requires one id parameter to work<br>eg. blog.html?id=blog_id</li></ul>Solution<ul><li>Read blog from <a href='index.html'>Home page</a> only</li></ul><form action='index.html' method='POST'><button class='w3-button w3-padding-large w3-white w3-border'><b>HOME</b></button></form>"
            } else if (XMLHttpRequest.readyState == 0) {
                console.log("Netwrok error")
            } else {
                console.log("something weird is happening")
            }
        }
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
            $('#alert').html("<span class='closebtn'>&times;</span>Comment Posted successfully! Refresh the page to see.")
            $('#alert').css("background-color", "#4CAF50");
            $('#alert').css("display", "block");
            // userComments.innerHTML = ''
            // showComment(id)
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
    $("#commentBox").on('click', '#submit', function() {
        n = $('#name').val().trim();
        e = $('#email').val().trim();
        m = $('#body').val().trim();
        if (n == '' || e == '' || m == '') {
            $('#alert').html("<span class='closebtn'>&times;</span>Fill all the details")
            $('#alert').css("background-color", "#ff9800");
            $('#alert').css("display", "block");
        } else if (!isValidEmailAddress(e)) {
            $('#alert').html("<span class='closebtn'>&times;</span>Email is not valid")
            $('#alert').css("background-color", "#ff9800");
            $('#alert').css("display", "block");
        } else {
            create_comment(result)
        }
    });
    $('#commentBox').on('click', '.closebtn', function() {
        $('#alert').fadeOut('fast')
    })
});
