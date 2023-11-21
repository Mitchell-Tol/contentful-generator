const ids = require('../assets/ids')

class ContentManager {
    #environment

    constructor(environment) {
        this.#environment = environment
    }

    async createNewsItem(newsItem) {
        const result = await this.#environment.createEntry(ids["news_item_key"], {
            fields: {
                title: { "en-US": newsItem.title },
                image: { "en-US": {
                    sys: {
                        type: "Link",
                        linkType: "Asset",
                        id: newsItem.image
                    }
                }},
                body: { "en-US": newsItem.body },
                publicationDate: { "en-US": newsItem.publicationDate },
                link: { "en-US": {
                    sys: {
                        type: "Link",
                        linkType: "Entry",
                        id: newsItem.link,
                    }
                }}
            }
        })
        let success = false
        if (result.status == undefined) {
            console.log("SUCCESS")
            success = true
        } else {
            console.log("FAILURE")
            sleep()
        }
        return { "success": success, "result": result }
    }
}

exports.ContentManager = ContentManager
