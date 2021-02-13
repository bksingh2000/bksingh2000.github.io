function capitalizeFirstLetter(string) {
    // return string && string[0].toUpperCase() + string.slice(1); //for empty string
    return string[0].toUpperCase() + string.slice(1);
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}
const app = document.getElementById('root')

var request = new XMLHttpRequest()
var link = 'https://blogsadda.herokuapp.com/api/'
request.open('GET', link, true)

request.onload = function() {
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
        data.results.forEach((blog) => {
            const main = document.createElement('div')
            main.setAttribute('class', 'card')

            const title = document.createElement('h2')
            title.setAttribute('class', 't-capital')
            title.textContent = blog.title

            const author = document.createElement('h5')
            author.textContent = "Puplished by " + capitalizeFirstLetter(blog.owner) + " on " + blog.created_at

            const image = document.createElement('div')
            image.setAttribute('class', 'img')
            image.setAttribute("style", "height:200px;background:url('" + blog.img + "');background-position: center;background-size: cover;")

            const content = document.createElement('p')
            content.setAttribute('class', 'capital content')
            blog.content = blog.content.substring(0, 300)
            content.textContent = `${blog.content}...`
            content.innerHTML += "<a href='#!' data-identity='" + blog.id + "'>Read More</a>"

            app.appendChild(main)
            main.appendChild(title)
            main.appendChild(author)
            main.appendChild(image)
            main.appendChild(content)
        })
    } else {
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `Gah, it's not working!`
        app.appendChild(errorMessage)
    }
}

request.send()
