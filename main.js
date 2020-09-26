const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

const prefix = config.prefix;

const fs = require('fs');
 
client.commands = new Discord.Collection();

client.once('ready',()=>{
    console.log('BOT IS ONLINE!')
})

client.on('message',(message)=>{
    if(!message.content.startsWith(prefix) || message.author.bot){
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
                message.reply('KALO GA TAU TANYA! atau ketik #help')
            }else{
                const user = message.mentions.users.first();
                if(user){
                    const member = message.guild.member(user);
                    if(member && member.voice.channel!=null){
                        member.voice.kick().then((member)=>message.channel.send(`Dadah ${member}`)).catch((err)=>console.log(err));
                    }else{
                        message.reply("Coba khe kasi tau aku cara ngekick orang yang ga konek!");
                    }
                }else{
                    message.reply("kick siapa?")
                }
            }
        break;
        case "unkick":
            let authorInfo = message.guild.members.cache.get(message.author.id);
            message.channel.send(`[PENGUMUMAN] \n @${authorInfo.nickname} is now have the big Gay \n :clap: :clap:`)
        break
        case "mute" :
            if(args.length == 0){
                message.reply('KALO GA TAU TANYA! atau ketik #help')
            }else{
                const user = message.mentions.users.first();
                if(user){
                    const member = message.guild.member(user);
                    if(member && member.voice.channel!=null){
                        member.voice.setMute(true,'iseng').then((member)=>message.channel.send(`${member} berisik`)).catch((err)=>console.log(err));
                    }else{
                        message.reply("Kan orangnya belum konek")    
                    }
                }else{
                    message.reply("mute siapa?")
                }
            }
        break;
        case "unmute" :
            if(args.length == 0){
                message.reply('KALO GA TAU TANYA! atau ketik #help')
            }else{
                const user = message.mentions.users.first();
                if(user){
                    const member = message.guild.member(user);
                    if(member && member.voice.channel!=null){
                        member.voice.setMute(false,'iseng').then((member)=>message.channel.send(`${member} silahkan berbicara`)).catch((err)=>console.log(err));
                    }else{
                        message.reply("Belum konek")    
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
    }
})

client.login(config.token)