const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./data/config.json');
const member = require('./data/rastaDate.json');
const cron = require('node-cron');
const fs = require('fs');
const prefix = config.prefix;
 
client.commands = new Discord.Collection();

client.once('ready',()=>{
    console.log('BOT IS ONLINE!')
})

const months = ["JAN","FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const checkBirthDay= () => {
    var time = new Date();
    var date = time.getDate();
    var month = months[time.getMonth()];
    var year = time.getFullYear();
    var membersName = member[month][date];
    
    if(membersName!=undefined){
        link = encodeURIComponent(`Halo ${membersName}, selamat ulang tahun ya buat kamu. Semoga semakin sukses. Jaga kesehatan ya, jangan lupa minum air`);
        return(`${membersName} sedang berulang tahun hari ini, Ayo ucapkan lewat link ini : \n https://wa.me/?text=${greeting}`);
    } else {
        return `Hari ini per ${date}/${month}/${year} : Tidak Ada Ulang Tahun`
    }
}

client.on('message',(message)=>{
    if(!message.content.startsWith(prefix) || message.author.bo){
        return;
    }

    const [CMD_NAME, ...args] = message.content.trim().substring(prefix.length).split(/\s+/);
    switch(CMD_NAME){
        case "help" :
            message.channel.send({embed: {
                title: 'List Perintah BOT',
                description: "Berikut list perintah untuk bot ini",
                color: 3447003,
                fields: [{
                    name: "> $kick <@member>",
                    value: "Kick member dari voice chat"
                  },
                  {
                    name: "> $mute <@member>",
                    value: "Mute member di voice chat"
                  },
                  {
                    name: "> $unmute <@member>",
                    value: "coba tebak"
                  },
                  {
                    name: "> $unkick <@member>",
                    value: "ini command boongan"
                  },
                  {
                    name: "> $muteall",
                    value: "mute all (pretty straight forward isn't it)"
                  },
                  {
                    name: "> $unmuteall <@member>",
                    value: "mute all (pretty straight forward isn't it)"
                  },
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
              }});
        break;
        case "kick" :
            if(args.length == 0){
                message.reply(config.messages.error_message)
            }else{
                const user = message.mentions.users.first();
                if(user){
                    const member = message.guild.member(user);
                    if(member && member.voice.channel!=null){
                        member.voice.kick().then((member)=>message.channel.send(`Dadah ${member}`)).catch((err)=>console.log(err));
                    }else{
                        message.reply(config.messages.user_disconnect_message);
                    }
                }else{
                    message.reply(config.messages.undefiend_user)
                }
            }
        break;
        case "unkick":
            let authorInfo = message.guild.members.cache.get(message.author.id);
            message.channel.send(`[PENGUMUMAN] \n @${authorInfo.nickname} adalah penyuka sesama jenis \n :clap: :clap:`)
        break
        case "mute" :
            if(args.length == 0){
                message.reply(config.messages.error_message)
            }else{
                const user = message.mentions.users.first();
                if(user){
                    const member = message.guild.member(user);
                    if(member && member.voice.channel!=null){
                        member.voice.setMute(true,'iseng').then((member)=>message.channel.send(`${member} berisik`)).catch((err)=>console.log(err));
                    }else{
                        message.reply(config.messages.user_disconnect_message)    
                    }
                }else{
                    message.reply("mute siapa?")
                }
            }
        break;
        case "unmute" :
            if(args.length == 0){
                message.reply(config.messages.user_disconnect_message)
            }else{
                const user = message.mentions.users.first();
                if(user){
                    const member = message.guild.member(user);
                    if(member && member.voice.channel!=null){
                        member.voice.setMute(false,'iseng').then((member)=>message.channel.send(`${member} silahkan berbicara`)).catch((err)=>console.log(err));
                    }else{
                        message.reply(config.messages.user_disconnect_message)    
                    }
                }else{
                    message.reply("unmute siapa?")
                }
            }
        break;
        case "muteall" :
            var channel = message.member.voice.channel;
            channel.members.forEach(async(memberInfo,index)=>{
                const member = message.guild.member(memberInfo.user);
                await member.voice.setMute(true,'iseng').then().catch((err)=>console.log(err));
            })
            message.channel.send("AMONG US IS STARTING \n GOOD LUCK, HAVE FUN!");
        break;
        case "unmuteall" :
            var channel = message.member.voice.channel;
            channel.members.forEach(async(memberInfo,index)=>{
                const member = message.guild.member(memberInfo.user);
                await member.voice.setMute(false,'iseng').then().catch((err)=>console.log(err));
            })
            message.channel.send("DISCUSS!");
        break;
        case "rastaultah" :
            var result = checkBirthDay();
            message.channel.send(result);
        break;
    }

    //cron job    
    cron.schedule('0 1 * * *', () => {
        var result = checkBirthDay();
        message.channel.send(result);
      }, {
        scheduled: true,
        timezone: "Asia/Jakarta"
      });
    
})

client.login(config.token)