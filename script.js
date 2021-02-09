const app = document.getElementById('root')

var request = new XMLHttpRequest()

request.open('GET', 'https://blogsadda.herokuapp.com/api/', true)

request.onload = function() {
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
        data.forEach((blog) => {
            const main = document.createElement('div')
            main.setAttribute('class', 'card')

            const title = document.createElement('h2')
            title.setAttribute('class', 't-capital')
            title.textContent = blog.title

            const author = document.createElement('h5')
            author.setAttribute('class', 'capital')
            author.textContent = "By " + blog.owner + " on " + blog.created_at

            const image = document.createElement('div')
            image.setAttribute('class', 'fakeimg')
            image.setAttribute("style", "height:200px;background:url('" + blog.img + "');background-position: center;background-size: cover;")

            const content = document.createElement('p')
            content.setAttribute('class', 'capital')
            blog.content = blog.content.substring(0, 300)
            content.textContent = `${blog.content}...`

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
