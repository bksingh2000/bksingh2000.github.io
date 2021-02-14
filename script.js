function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}
var link = 'https://blogsadda.herokuapp.com/api/'

const root = document.getElementById('root')
var loader = document.getElementById('loader')
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
var title = document.getElementById("title");
var details = document.getElementById("details");
var author = document.getElementById("author");
var owner = document.getElementById("owner");
var alert = document.getElementById("alert");
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

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
                root.innerHTML += "<div class='card'><h2 class='t-capital'>" + v.title + "</h2><h5 class='author'>" + "Puplished by " + capitalizeFirstLetter(v.owner) + " on " + v.created_at + "</h5><div class='img' style='background:url('" + v.img + "');background-position: center;background-size: cover;'></div><p class='capital content'>" + v.content.substring(0, 300) + "...<a href='#!' data-identity='" + v.id + "'>Read More</a></p></div>"
            })
        },
        complete: function() {
            $('#loader').addClass('hidden')
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if (XMLHttpRequest.readyState == 4) {
                root.innerHTML = "<div class='card'><p>" + XMLHttpRequest.status + " " + XMLHttpRequest.statusText + "</p></div>"
            } else if (XMLHttpRequest.readyState == 0) {
                root.innerHTML = "<div class='card'><p>Network Error!!</p></div>"
            } else {
                console.log("something weird is happening")
            }
        }
    })
}

function findById(id) {
    $.ajax({
        type: 'GET',
        url: link + id + '/',
        dataType: 'json',
        success: function(data) {
            title.innerText = data.title
            details.innerText = data.content
            owner.innerText = "Puplished by " + capitalizeFirstLetter(data.owner) + " on " + data.created_at
            modal.style.display = "block"
        },
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
            alert.innerHTML = "<span class='closebtn'>&times;</span>Message sent successfully!"
            alert.style.backgroundColor = "#4CAF50"
            alert.style.display = "block";
        },

        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if (XMLHttpRequest.readyState == 4) {
                console.log(XMLHttpRequest.status)
            } else if (XMLHttpRequest.readyState == 0) {
                alert.innerText = "<span class='closebtn'>&times;</span>Network Error"
            } else {
                console.log("something weird is happening")
            }
        }
    });
};

$(document).ready(function() {
    allBlogs()
    $('#root').on('click', '.card .content a', function() {
        findById($(this).data('identity'));
    })
    $('#alert').on('click', '.closebtn', function() {
        $('#alert').fadeOut('fast')
    })
    $("#submit").click(function() {
        n = $('#name').val().trim();
        e = $('#email').val().trim();
        m = $('#msg').val().trim();
        if (n == '' && e == '' && m == '') {
            alert.innerHTML = "<span class='closebtn'>&times;</span>Fill all the details"
            alert.style.backgroundColor = "#ff9800"
            alert.style.display = "block"
        } else if (!isValidEmailAddress(e)) {
            alert.innerHTML = "<span class='closebtn'>&times;</span>Email is not valid"
            alert.style.backgroundColor = "#ff9800"
            alert.style.display = "block"
        } else {
            create_post()
        }
    });
});
