import {Client, Message} from 'discord.js'
import {readFileSync} from 'fs'
import {join} from 'path'
import { inspect } from 'util'

const discord = new Client()

discord.once('ready', () => {
  console.log(`Logged in as ${discord.user?.tag}!`)
})

discord.on('message', (message: Message) => {
  if (/i\suse\s(they\/them|she\/her|he\/him)/gi.test(message.content)) {
    const guild = message.guild
    const member = message.member
    const pronouns = /they\/them|she\/her|he\/him/i.exec(message.content)?.toString().toLowerCase()
    const role = guild?.roles.cache.find(role => role.name.toLowerCase() === pronouns);
    if (role && member) {
      message.channel.send(`${member.nickname || member.user.username} uses ${pronouns} pronouns`)
      member.roles.add(role)
    }
  }
  if (/i\sdo(\snot|n'?t)\suse\s(they\/them|she\/her|he\/him)/gi.test(message.content)) {
    const guild = message.guild
    const member = message.member
    const pronouns = /they\/them|she\/her|he\/him/i.exec(message.content)?.toString().toLowerCase()
    const role = guild?.roles.cache.find(role => role.name.toLowerCase() === pronouns);
    if (role && member) {
      message.channel.send(`${member.nickname || member.user.username} does not use ${pronouns} pronouns`)
      member.roles.remove(role)
    }
  }
})

discord.login(readFileSync(join(__dirname, '../discord.token')).toString())
