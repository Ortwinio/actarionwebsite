
const { JSDOM } = require("jsdom");

async function checkUrl(url) {
    try {
        const res = await fetch(url);
        const text = await res.text();
        const dom = new JSDOM(text);
        const doc = dom.window.document;

        const titlesInHead = doc.head.getElementsByTagName("title").length;
        const titlesInBody = doc.body.getElementsByTagName("title").length;
        const allTitles = doc.getElementsByTagName("title").length;

        console.log(`URL: ${url}`);
        console.log(`Titles in HEAD: ${titlesInHead}`);
        console.log(`Titles in BODY: ${titlesInBody}`);
        console.log(`Total Titles: ${allTitles}`);

        if (titlesInBody > 0) {
            console.log("FAIL: Title found in body!");
            // Print context
            const bodyTitle = doc.body.querySelector("title");
            console.log("Context:", bodyTitle.parentElement.outerHTML.substring(0, 200));
        } else {
            console.log("PASS: No title in body.");
        }
    } catch (e) {
        console.error("Error fetching " + url, e);
    }
}

checkUrl("http://localhost:3000/en/privacy");
checkUrl("http://localhost:3000/en");
