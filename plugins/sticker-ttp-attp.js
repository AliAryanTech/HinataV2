import { createSticker } from 'wa-sticker-formatter'
import { createCanvas, registerFont } from 'canvas';
import fs from 'fs';
import { execSync } from 'child_process';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    text = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.quoted && m.quoted.caption ? m.quoted.caption : m.quoted && m.quoted.description ? m.quoted.description : ''
    if (!text) throw `Example : ${usedPrefix + command} Lagi Ruwet`
    const res = `https://api.lolhuman.xyz/api/${command}?apikey=${global.lolkey}&text=${encodeURIComponent(text.substring(0, 151))}`
    const res2 = `https://xteam.xyz/attp?file&text=${encodeURIComponent(text.substring(0, 151))}`
    try {
        if (command == 'attp') {
            let stiker = await createSticker(res, { pack: packname, author: author })
            await conn.sendFile(m.chat, stiker, 'atet.webp', '', m)
        } else if (command == 'attp2') {
        let url = await fetch(global.API('https://salism3api.pythonanywhere.com', '/text2gif/', { text: text }))
        let res = await url.json()
        let stick = res.image
            let stiker = await createSticker(stick, { pack: packname, author: author })
            await conn.sendFile(m.chat, stiker, 'atet.webp', '', m)
        } else if (command == 'ttp7') {
        let url = await fetch(global.API('https://salism3api.pythonanywhere.com', '/text2img/', { text: text }))
        let res = await url.json()
        let stick = res.image
            let stiker = await createSticker(stick, { pack: packname, author: author })
            await conn.sendFile(m.chat, stiker, 'atet.webp', '', m)
        } else if (command == 'ttp8') {
        let url = await fetch(global.API('https://salism3api.pythonanywhere.com', '/text2img/', { text: text, outlineColor: '255,0,0,255', textColor: '0,0,0,255' }))
        let res = await url.json()
        let stick = res.image
            let stiker = await createSticker(stick, { pack: packname, author: author })
            await conn.sendFile(m.chat, stiker, 'atet.webp', '', m)
        } else if (command == 'attp3') {
            let stiker = await createSticker(res2, { pack: packname, author: author })
            await conn.sendFile(m.chat, stiker, 'atet.webp', '', m)
        } else if (command == 'attp4') {
            const videoBuffer = await createColorfulTextAnimation(text);
await conn.sendMessage(m.chat, {
                    sticker: videoBuffer
                }, {
                    quoted: m,
                    mimetype: 'image/webp',
                    ephemeralExpiration: 86400
                })
        } else {
            let stiker = await createSticker(res, { pack: packname, author: author })
            await conn.sendFile(m.chat, stiker, 'atet.webp', '', m)
        }
    } catch (e) {
        console.log(e)
        throw eror
    }
  
}
handler.help = ['ttp','ttp2 -> ttp8','attp','attp2','attp3']
handler.tags = ['creator']
handler.command = /^((ttp(2|3|4|5|6|7|8)?)|(attp(2|3|4)?))$/i
handler.limit = true
export default handler

async function getRandomFont() {
  const fonts = fs.readdirSync('./src/font').filter(file => file.endsWith('.ttf'));
  if (fonts.length === 0) throw new Error('Tidak ada font tersedia di folder font.');
  return './src/font/' + fonts[Math.floor(Math.random() * fonts.length)];
}

async function createColorfulTextAnimation(text) {
  const width = 400, height = 200;
  const animationDuration = 5, totalFrames = 60, frameDuration = animationDuration / totalFrames;
  const canvas = createCanvas(width, height), context = canvas.getContext('2d');

  context.clearRect(0, 0, width, height);

  const frames = [];

  for (let i = 0; i < totalFrames; i++) {
    const progress = i / totalFrames;
    const hue = (progress * 360) % 360;

    context.fillStyle = `hsl(${hue}, 100%, 50%)`;
    const font = await getRandomFont();
    registerFont(font, { family: 'CustomFont' });

    context.font = '48px CustomFont';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, width / 2, height / 2);

    frames.push(canvas.toDataURL().replace(/^data:image\/png;base64,/, ''));

    await new Promise(resolve => setTimeout(resolve, frameDuration * 1000));
  }

  const frameDir = './tmp/frames';
  if (!fs.existsSync(frameDir)) fs.mkdirSync(frameDir);
  else fs.readdirSync(frameDir).forEach(file => fs.unlinkSync(`${frameDir}/${file}`));

  frames.forEach((frame, index) => fs.writeFileSync(`${frameDir}/frame_${index}.png`, Buffer.from(frame, 'base64')));

  const outputFilePath = './tmp/output.webp';
  execSync(`ffmpeg -r 30 -f image2 -s ${width}x${height} -i ${frameDir}/frame_%d.png -c:v libwebp -pix_fmt yuva420p ${outputFilePath}`);

  const data = fs.readFileSync(outputFilePath);

  fs.readdirSync(frameDir).forEach(file => fs.unlinkSync(`${frameDir}/${file}`));
  fs.rmdirSync(frameDir);
  fs.unlinkSync(outputFilePath);

  return Buffer.from(data);
}