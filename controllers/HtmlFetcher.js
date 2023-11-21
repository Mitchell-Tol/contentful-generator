const JSDOM = require('jsdom').JSDOM
const NewsItem = require('../models/NewsItem').NewsItem

class HtmlFetcher {
    
    async fetchNewsItems(url) {
        const result = await fetch(url)
        const resultAsString = await result.text()
        const body = new JSDOM(resultAsString)
        const newsItems = body.window._document.querySelector(".sfnewsList").children
        return this.#mapToNewsItemModel(newsItems)
    }

    #mapToNewsItemModel(list) {
        let mapped = []
        for (let i = 0; i < list.length; i++) {
            const date = this.#processDate(list[i].querySelector("div").innerHTML)
            const anchor = list[i].querySelector("a")
            const title = anchor.innerHTML
            const externalLink = anchor.getAttribute("href")
            mapped.push(new NewsItem(title, "", "", date, externalLink))
        }
        return mapped
    }

    #processDate(unprocessedDate) {
        const split = unprocessedDate.trim().replaceAll(":", "").replaceAll(",", "").split(" ")
        const month = this.#mapMonthToNumber(split[0])
        return `${split[2]}-${month}-${split[1]}T00:00:00Z`
    }

    #mapMonthToNumber(month) {
        switch (month) {
            case "Jan":
                return "01"
            case "Feb":
                return "02"
            case "Mar":
                return "03"
            case "Apr":
                return "04"
            case "May":
                return "05"
            case "Jun":
                return "06"
            case "Jul":
                return "07"
            case "Aug":
                return "08" 
            case "Sep":
                return "09"
            case "Oct":
                return 10
            case "Nov":
                return 11
            case "Dec":
                return 12
        }
    }
}

exports.HtmlFetcher = HtmlFetcher
