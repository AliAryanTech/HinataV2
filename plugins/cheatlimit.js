import fetch from 'node-fetch'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
let cheat = ['money',
'limit',
'level',
'limit',
'exp',
'potion',
'aqua',
'trash',
'wood',
'rock',
'string',
'iron',
'diamond',
'emerald',
'gold',
'coal',
'common',
'uncommon',
'mythic',
'legendary',
'foodpet',
'Fox',
'naga',
'pet',
'anggur',
'apel',
'batu',
'berlian',
'bibitanggur',
'bibitapel',
'bibitjeruk',
'bibitmangga',
'bibitpisang',
'botol',
'centaur',
'eleksirb',
'emasbatang',
'emasbiasa',
'exp',
'gardenboc',
'gardenboxs',
'griffin',
'healtmonster',
'jeruk',
'kaleng',
'kardus',
'kayu',
'ketake',
'koinexpg',
'kucing',
'kuda',
'kyubi',
'makanancentaur',
'makanangriffin',
'makanankyubi',
'makanannaga',
'makananpet',
'makananphonix',
'mangga',
'pancingan',
'phonix',
'pisang',
'rubah',
'sampah',
'serigala',
'sword',
'tiketcoin',
'umpan']
let user = global.db.data.users[m.sender];
let MaxCheat = 999999999;

let input = args[0]; // Ganti dengan input yang diinginkan
let count = args[1]; // Ganti dengan jumlah count yang diinginkan

if (!cheat.includes(input)) {
  const availableCheats = cheat.map((c, index) => `${index + 1}. ${c}`).join('\n');
  await m.reply(`Tersedia: list cheat dengan nomor\n${availableCheats}\n\nContoh format: command tipe jumlah`);
} else {
  if (!isNaN(count)) {
    count = parseInt(count);
    if (count) {
      user[input] += count;
    } else {
      user[input] = MaxCheat;
    }

    let cheatResults = user[input];
    await m.reply(`Cheat "${input}" telah dieksekusi.\n\nJumlah cheat saat ini:\n${cheatResults}`);
  } else {
    await m.reply('Format jumlah tidak valid.\n\nContoh format: command tipe jumlah');
  }
}

if (count && input > MaxCheat) {
  await m.reply('Lebih');
}

}
handler.help = ['ngechit'].map(v => v + ' *hehe..*')
handler.tags = ['xp']
handler.command = /^(ngech(ea|i)t|c(((he(ater|t)|iter)|(hea|i)t)|hit))$/i
handler.private = true

export default handler
