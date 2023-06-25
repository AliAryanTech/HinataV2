import axios from "axios"
import fetch from "node-fetch"
import {
    googleIt
} from "@bochilteam/scraper"
const GoogleIt = await (await import("google-it")).default

let handler = async (m, {
    conn,
    text
}) => {
    if (!text) throw "Input Query"
    let ss = flaaa.getRandom() + "Google"
    await m.reply(wait)
    try {
        if (!text) return conn.reply(m.chat, "Input Query", m)
        let url = "https://google.com/search?q=" + encodeURIComponent(text)
        let search = await GoogleIt({
            query: text
        })
        let msg = search.map((v, index) => `${htki + " " + ++index + " " + htka}\n*${v.title}*\n  *○ Link:* ${v.link}\n  *○ Snippet:* ${v.snippet}`).join("\n\n")
        await conn.sendFile(m.chat, ss, "", msg, m)
    } catch (e) {
        try {
            let data = await googleIt(text)
            let msg = data.articles.map((v, index) => `${htki + " " + ++index + " " + htka}\n*${v.title}*\n  *○ Link:* ${v.url}\n  *○ Snippet:* ${v.description}`).join("\n\n")
            if (!msg.length) throw `Query "${text}" Not Found`
        await conn.sendFile(m.chat, ss, "", msg, m)
        } catch (e) {
            try {
                var query = text
                var API_KEY = "7d3eb92cb730ed676d5afbd6c902ac1f"
                var url = "http://api.serpstack.com/search?access_key=" + API_KEY + "&type=web&query=" + query
                let a = await (await fetch(url)).json()
                let b = a.organic_results
                let c = b.map((v, index) => `${htki + " " + ++index + " " + htka}\n*${v.title}*\n  *○ Link:* ${v.url}\n  *○ Snippet:* ${v.snippet}`).join("\n\n")
        await conn.sendFile(m.chat, ss, "", msg, m)
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["google", "googlef"].map(v => v + " <pencarian>")
handler.tags = ["internet"]
handler.command = /^googlef?$/i
export default handler