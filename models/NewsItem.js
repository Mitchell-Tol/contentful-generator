class NewsItem {
    title
    image
    body
    publicationDate
    link

    constructor(title, image, body, publicationDate, link) {
        this.title = title
        this.image = image
        this.body = body
        this.publicationDate = publicationDate
        this.link = link
    }
}

exports.NewsItem = NewsItem
