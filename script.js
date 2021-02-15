const root = document.getElementById('root')
var err = document.getElementById("alert");

function allBlogs() {
    $.ajax({
        type: 'GET',
        url: link,
        dataType: 'json',
        beforeSend: function() {
            $('#loader').removeClass('hidden')
        },
        success: function(data) {
            $.each(data.results, function(k, v) {
                root.innerHTML += "<div class='w3-card-4 w3-margin w3-white'><img src='' style='width:100%;'><div class='w3-container'><h3><b>" + v.title + "</b></h3><h5>" + capitalizeFirstLetter(v.owner) + ", <span class='w3-opacity'>" + v.created_at + "</span></h5></div><div class='w3-container'><p>" + v.content.substring(0, 300) + "...</p><div class='w3-row'><div class='w3-col m6 s5'><p><form action='blog.html' method='GET'><input type='hidden' name='id' value='" + v.id + "'><button class='w3-button w3-padding-large w3-white w3-border'><b>READ MORE »</b></button></form></p></div><div class='w3-col m6 s7'><p><span class='w3-padding-large w3-right'><b>Comments  </b> <span class='w3-tag'>" + v.comment + "</span></span></p></div></div></div></div><hr>"
            })
        },
        complete: function() {
            $('#loader').addClass('hidden')
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if (XMLHttpRequest.readyState == 4) {
                root.innerHTML = "<div class='w3-card-4 w3-margin w3-white'><div class='w3-container'><h3><b>" + XMLHttpRequest.status + " " + XMLHttpRequest.statusText + "</b></h3></div></div><hr>"
            } else if (XMLHttpRequest.readyState == 0) {
                root.innerHTML = "<div class='w3-card-4 w3-margin w3-white'><div class='w3-container'><h3><b>Network error!!</b></h3></div></div><hr>"
            } else {
                console.log("something weird is happening")
            }
        }
    })
}

function create_post() {
    $.ajax({
        url: link + "contact/",
        type: "POST",
        data: {
            name: $('#name').val().trim(),
            email: $('#email').val().trim(),
            msg: $('#msg').val().trim(),
        },
        success: function(json) {
            $('#name').val('');
            $('#email').val('');
            $('#msg').val('');
            err.innerHTML = "<span class='closebtn'>&times;</span>Message sent successfully!"
            err.style.backgroundColor = "#4CAF50"
            err.style.display = "block";
        },

        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if (XMLHttpRequest.readyState == 4) {
                console.log(XMLHttpRequest.status)
            } else if (XMLHttpRequest.readyState == 0) {
                err.innerText = "<span class='closebtn'>&times;</span>Network Error"
            } else {
                console.log("something weird is happening")
            }
        }
    });
};

$(document).ready(function() {
    allBlogs()
    $('#alert').on('click', '.closebtn', function() {
        $('#alert').fadeOut('fast')
    })
    $("#submit").click(function() {
        n = $('#name').val().trim();
        e = $('#email').val().trim();
        m = $('#msg').val().trim();
        if (n == '' || e == '' || m == '') {
            err.innerHTML = "<span class='closebtn'>&times;</span>Fill all the details"
            err.style.backgroundColor = "#ff9800"
            err.style.display = "block"
        } else if (!isValidEmailAddress(e)) {
            err.innerHTML = "<span class='closebtn'>&times;</span>Email is not valid"
            err.style.backgroundColor = "#ff9800"
            err.style.display = "block"
        } else {
            create_post()
        }
    });
});
