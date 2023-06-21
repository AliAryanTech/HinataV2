import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hotp/i.test(m.quoted.text) || /.*hotp/i.test(m.text))
        return !0
    this.emailotp = this.emailotp ? this.emailotp : {}
    if (!(id in this.emailotp))
        return conn.sendButton(m.chat, 'OTP itu telah berakhir', author, null, buttonemailotp, m)
    if (m.quoted.id == this.emailotp[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.emailotp[id][3])
            delete this.emailotp[id]
            return conn.sendButton(m.chat, '*Yah Menyerah :( !*', author, null, buttonemailotp, m)
        }
        let json = JSON.parse(JSON.stringify(this.emailotp[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.emailotp[id][2]
            conn.sendButton(m.chat, `*OTP Benar!*\n+${this.emailotp[id][2]} XP`, author, null, buttonemailotp, m)
            clearTimeout(this.emailotp[id][3])
            delete this.emailotp[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
            m.reply(`*Dikit Lagi!*`)
        else
            conn.sendButton(m.chat, `*OTP Salah!*`, author, null, [
                ['Hint', '/hotp'],
                ['Nyerah', 'menyerah']
            ], m)
    }
    return !0
}
export const exp = 0

const buttonemailotp = [
    ['emailotp', '/emailotp']
]