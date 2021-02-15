var title = document.getElementById('title')
var img = document.getElementById('img')
var info = document.getElementById('info')
var content = document.getElementById('content')
var link = 'https://blogsadda.herokuapp.com/api/'

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
        },
    })
}
