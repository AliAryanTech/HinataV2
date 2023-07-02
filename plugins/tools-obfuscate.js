import JavaScriptObfuscator from "javascript-obfuscator"

let handler = async (m, {
    args,
    command,
    usedPrefix
}) => {
   try {
        const usage = "*Example:*\n" + usedPrefix + command + " (reply to enc code)"
        if (!m.quoted) return m.reply(usage)
        const message = await Encrypt(m.quoted.text)
        if (args.length >= 2) {
            const texts = args.slice(1).join(" ")
            const response = await Encrypt(texts)
            return m.reply(response)
        }
        return m.reply(message)
   } catch (e) {
       await m.reply(eror)
    }
}
handler.command = /^(obfus(cate)?|enc)$/i
export default handler

async function Encrypt(query) {
    const obfuscationResult = JavaScriptObfuscator.obfuscate(query, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        stringArrayShuffle: true,
        splitStrings: true,
        stringArrayThreshold: 1,
        sourceMap: false,
        sourceMapMode: "separate",
    })

    return obfuscationResult.getObfuscatedCode()
}