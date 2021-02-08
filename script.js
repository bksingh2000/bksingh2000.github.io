const app = document.getElementById('root')
const container = document.createElement('div')
container.setAttribute('class', 'container')
app.appendChild(container)
    // Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://blogsadda.herokuapp.com/api/', true)

request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
        data.forEach((blog) => {
            const card = document.createElement('div')
            card.setAttribute('class', 'card')

            const h1 = document.createElement('h1')
            h1.textContent = blog.title

            const p = document.createElement('p')
            blog.content = blog.content.substring(0, 300)
            p.textContent = `${blog.content}...`

            const author = document.createElement('p')
            author.textContent = blog.owner

            container.appendChild(card)
            card.appendChild(h1)
            card.appendChild(p)
            card.appendChild(author)
        })
    } else {
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `Gah, it's not working!`
        app.appendChild(errorMessage)
    }
}

request.send()
