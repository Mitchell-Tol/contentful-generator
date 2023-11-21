const contentful = require('contentful-management')
const keys = require('./assets/keys')
const urls = require('./assets/urls')
const HtmlFetcher = require('./controllers/HtmlFetcher').HtmlFetcher
const ContentManager = require("./controllers/ContentManager").ContentManager

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
    const contentManager = new ContentManager(environment)

    for (let i = 0; i < newsItems.length; i++) {
        let result = await contentManager.createNewsItem(newsItems[i])
        if (!result["success"]) { i-- }
    }
}
