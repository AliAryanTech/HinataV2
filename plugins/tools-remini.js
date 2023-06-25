import fetch from "node-fetch"
import uploadImage from "../lib/uploadImage.js"
const { NeoxrApi } = await(await import('../lib/neoxr.js'))
import fs from "fs"

let handler = async (m, { conn }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || ''
	if (/image/g.test(mime) && !/webp/g.test(mime)) {
		await m.reply(wait)
		try {
		let img = await q.download?.()
			let out = await uploadImage(img)
let neo = new NeoxrApi('kyaOnechan')
let sauce = await neo.remini(out)
		await conn.sendFile(m.chat, sauce.data.url, '', '*[ REMINI ]*', m)
		} catch (e) {
		await m.reply(eror)
		}
	} else throw 'Reply imagenya'
}
handler.help = ["remini"]
handler.tags = ["tools"]
handler.command = ["remini"]
export default handler
