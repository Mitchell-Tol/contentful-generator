const contentful = require('contentful-management')
const keys = require('./assets/keys')
const urls = require('./assets/urls')
const ids = require('./assets/ids')
const HtmlFetcher = require('./controllers/HtmlFetcher').HtmlFetcher
const NewsItem = require('./models/NewsItem').NewsItem

const client = contentful.createClient({
    accessToken: keys["cma_token"],
    host: urls["preview"]
})

main()

async function main() {
    const fetcher = new HtmlFetcher()
    const newsItems = await fetcher.fetchNewsItems(urls["news_page_1"])

    const space = await client.getSpace(keys["space"])
    const environment = await space.getEnvironment(keys["environment"])
}

async function createNewsItem(environment, newsItem) {
    const result = await environment.createEntry(ids["news_item_key"], {
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
    console.info("SUCCESS: CREATED THE FOLLOWING ENTRY")
    console.log(result)
    return result["id"]
}
