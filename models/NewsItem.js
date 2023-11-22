class NewsItem {
    title
    image
    body
    publicationDate

    constructor(title, image, body, publicationDate) {
        this.title = title
        this.image = image
        this.body = body
        this.publicationDate = publicationDate
    }
}

exports.NewsItem = NewsItem
