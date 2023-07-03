import uploadImage from "../lib/uploadImage.js"
import uploadFile from "../lib/uploadFile.js"
import {
    Sticker,
    StickerTypes
} from "wa-sticker-formatter"
import {
    sticker
} from "../lib/sticker.js"
import wibusoft from "wibusoft"
import got from "got"
import cheerio from "cheerio"
let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let stiker
    let out
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

    if (!args[0]) {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || q.mediaType || ""
        if (getEmojiFromQuotedText(q.text)) {
            await m.reply(wait)
            try {
                let cari = await semoji(getEmojiFromQuotedText(q.text))
                let emj = getUrlByName(cari, "whatsapp")
                out = await wibusoft.tools.makeSticker(emj, {
                    author: packname,
                    pack: m.name,
                    keepScale: true
                })
                stiker = out


                if (stiker) await conn.sendMessage(m.chat, {
                    sticker: stiker
                }, {
                    quoted: m,
                    mimetype: 'image/webp',
                    ephemeralExpiration: 86400
                })
            } catch (e) {
                await m.reply(eror)
            }
        } else
        if (/webp|image|video|gif|viewOnce/g.test(mime)) {
            await m.reply(wait)
            try {
                let img = await q.download?.()

                if (/webp/g.test(mime)) {
                    out = await wibusoft.tools.makeSticker(img, {
                        author: packname,
                        pack: m.name,
                        keepScale: true
                    })
                } else if (/image/g.test(mime)) {
                    out = await wibusoft.tools.makeSticker(img, {
                        author: packname,
                        pack: m.name,
                        keepScale: true
                    })
                } else if (/video/g.test(mime)) {
                if ((q.msg || q).seconds > 11) return m.reply("Maksimal 10 detik!")
                    out = await sticker(img, false, packname, m.name)
                } else if (/gif/g.test(mime)) {
                    out = await wibusoft.tools.makeSticker(img, {
                        author: packname,
                        pack: m.name,
                        keepScale: true
                    })
                } else if (/viewOnce/g.test(mime)) {
                    out = await wibusoft.tools.makeSticker(img, {
                        author: packname,
                        pack: m.name,
                        keepScale: true
                    })
                }
                stiker = out


                if (stiker) await conn.sendMessage(m.chat, {
                    sticker: stiker
                }, {
                    quoted: m,
                    mimetype: 'image/webp',
                    ephemeralExpiration: 86400
                })
            } catch (e) {
                await m.reply(eror)
            }
        } else throw "Reply media!"

    } else {
        if (isUrl(args[0])) {
            await m.reply(wait)
            try {
                stiker = await createSticker(false, args[0], packname, m.name, 60)
                if (stiker) await conn.sendMessage(m.chat, {
                    sticker: stiker
                }, {
                    quoted: m,
                    mimetype: 'image/webp',
                    ephemeralExpiration: 86400
                })
            } catch (e) {
                await m.reply(eror)
            }
        } else throw "URL tidak valid!"
    }
}
handler.help = ["stiker (caption|reply media)", "stiker <url>", "stikergif (caption|reply media)", "stikergif <url>"]
handler.tags = ["sticker"]
handler.command = /^s(ti(c?k(er(gif)?)?|c)|gif)?$/i

export default handler

const isUrl = (text) => {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, "gi"))
}

function getEmojiFromQuotedText(text) {
    const emojiRegex = /\p{Emoji}/u;
    const matches = text.match(emojiRegex);

    if (matches && matches.length > 0) {
        return matches[0];
    }

    return null;
}

async function createSticker(img, url, packName, authorName, quality) {
    let stickerMetadata = {
        type: StickerTypes.FULL,
        pack: packName,
        author: authorName,
        quality
    }
    return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}

async function createStickerV(img, url, packName, authorName, quality) {
    let stickerMetadata = {
        type: StickerTypes.CROPPED,
        pack: packName,
        author: authorName,
        quality
    }
    return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}

async function semoji(hem) {
    const result = []
    const data = await got(encodeURI("https://emojipedia.org/" + hem), {
        method: "GET",
        headers: {
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
        }
    })
    const $ = cheerio.load(data.body)
    $("body > div.container > div.content > article > section.vendor-list > ul").each(function(asu, chuwi) {
        $(chuwi).find("li").each(function(sa, na) {
            const res = {
                nama: $(na).find("div > div.vendor-info > h2 > a").text().trim().toLowerCase(),
                url: $(na).find("div > div.vendor-image > img").attr("src")
            }
            result.push(res)
        })
    })
    const data2 = []
    result.map(Data => {
        if (Data.nama == undefined) return;
        if (Data.url == undefined) return;
        data2.push(Data)
    })
    return data2
}

function getUrlByName(data, nama) {
    const matchedObject = data.find(item => item.nama === nama);

    if (matchedObject) {
        return matchedObject.url;
    }

    return null;
}