const contentful = require('contentful-management')
const keys = require('./assets/keys')
const urls = require('./assets/urls')
const ids = require('./assets/ids')

const client = contentful.createClient({
    accessToken: keys["cma_token"],
    host: urls["preview"]
})

main()

async function main() {
    const space = await client.getSpace(keys["space"])
    const environment = await space.getEnvironment(keys["environment"])

    createNewsItem(environment, "Test News Item", "QnLjzHiLv3BTeY89lvrmt", "body", "2023-11-21T00:00:00Z", "2JqRkP2fBh0EEWy4mwiyL4")
}

async function createNewsItem(environment, title, image, body, publicationDate, link) {
    const result = await environment.createEntry(ids["news_item_key"], {
        fields: {
            title: { "en-US": title },
            image: { "en-US": {
                sys: {
                    type: "Link",
                    linkType: "Asset",
                    id: image
                }
            }},
            body: { "en-US": body },
            publicationDate: { "en-US": publicationDate },
            link: { "en-US": {
                sys: {
                    type: "Link",
                    linkType: "Entry",
                    id: link,
                }
            }}
        }
    })
    console.info("SUCCESS: CREATED THE FOLLOWING ENTRY")
    console.log(result)
    return result["id"]
}
