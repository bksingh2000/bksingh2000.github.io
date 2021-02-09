const app = document.getElementById('container')
const header = document.createElement('div')
header.setAttribute('class', 'page-header')

const page_header = document.createElement('h1')
page_header.textContent = "Hello World"
header.appendChild(page_header)
app.appendChild(header)
var request = new XMLHttpRequest()

request.open('GET', 'https://blogsadda.herokuapp.com/api/', true)

request.onload = function() {
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
        data.forEach((blog) => {
            const main = document.createElement('main')
            main.setAttribute('class', 'container')

            const main_area = document.createElement('div')
            main_area.setAttribute('class', 'jumbotron')

            const title = document.createElement('h2')
            title.textContent = blog.title

            const content = document.createElement('p')
            content.setAttribute('class', 'lead')
            blog.content = blog.content.substring(0, 300)
            content.textContent = `${blog.content}...`

            const author = document.createElement('p')
            author.setAttribute('style', 'font-size: 1.6rem;color: grey;')
            author.textContent = blog.owner

            container.appendChild(main)
            main.appendChild(main_area)
            main_area.appendChild(title)
            main_area.appendChild(content)
            main_area.appendChild(author)
        })
    } else {
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `Gah, it's not working!`
        app.appendChild(errorMessage)
    }
}

request.send()
