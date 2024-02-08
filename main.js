const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./data/config.json');
const member = require('./data/rastaDate.json');
const prefix = config.prefix;

client.commands = new Discord.Collection();

client.once('ready', () => {
    console.log('BOT IS ONLINE!')
})

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const checkBirthDay = () => {
    var time = new Date();
    var date = time.getDate();
    var month = months[time.getMonth()];
    var year = time.getFullYear();
    var membersName = member[month][date];

    if (membersName != undefined) {
        link = encodeURIComponent(`Halo ${membersName}, selamat ulang tahun ya buat kamu. Semoga semakin sukses. Jaga kesehatan ya, jangan lupa minum air`);
        return (`${membersName} sedang berulang tahun hari ini, Ayo ucapkan lewat link ini : \n https://wa.me/?text=${greeting}`);
    } else {
        return `Hari ini per ${date}/${month}/${year} : Tidak Ada Ulang Tahun`
    }
}

client.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bo) {
        return;
    }

    const [CMD_NAME, ...args] = message.content.trim().substring(prefix.length).split(/\s+/);
    switch (CMD_NAME) {
        case "help":
            message.channel.send({
                embed: {
                    title: 'List Perintah BOT',
                    description: "Berikut list perintah untuk bot ini",
                    color: 3447003,
                    fields: [
                        {
                            name: "> $rastaultah",
                            value: "Ada yang ultah ga ya hari ini?"
                        },
                        {
                            name: "> $help",
                            value: "Membuka list perintah BOT"
                        }
                    ],
                    footer: {
                        text: "Silahkan dipakai sesuka hati"
                    }
                }
            });
            break;
        case "rastaultah":
            var result = checkBirthDay();
            message.channel.send(result);
            break;
    }

})

client.login(process.env.token || config.token)