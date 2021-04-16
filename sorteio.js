let Discord = require('discord.js');
const prefix = 'a!'

module.exports = {
    name: 'giveaway',
    execute(client, message){
        if (!message.guild) return;
        async function giveaway() {
          if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Você não tem permissao');
          if (message.content === `${prefix}giveaway`) return message.channel.send(`Voce não colocou nome no sorteio ou tempo`)
          message.channel.send(`Menciona o canal para o sorteio`).then(async msg => {
          var time = '';
          var time2 = '';
          var time3 = '';
            const filter = m => m.author.id === message.author.id;
            msg.channel.awaitMessages(filter, {
              max: 1,
              time: 100000
            }).then(async collected => {
              let nomec = collected.first().content
              let nomec1 = nomec.replace("<#","")
              let nomeconfig = nomec1.replace(">","")

          if(!isNaN(nomeconfig) === false){
            message.channel.send(`canal não encontrado`)
           }else if(!isNaN(nomeconfig) === true){
            if (message.content !== `${prefix}giveaway`) {
              const stated_duration_hours = message.content.split(' ')[1];
              const stated_duration_hours2 = stated_duration_hours.toLowerCase();
              if (stated_duration_hours2.includes('s')) {
                  var time = 's';
              }
              if (stated_duration_hours2.includes('m')) {
                  var time = 'm';
              }
              if (stated_duration_hours2.includes('h')) {
                  var time = 'h';
              }
              if (stated_duration_hours2.includes('d')) {
                  var time = 'd';
              }
              const stated_duration_hours3 = stated_duration_hours2.replace(time, '');
              if (stated_duration_hours3 === '0') {
                  message.channel.send('A duração deve ser pelo menos um.');
              }
              if (isNaN(stated_duration_hours3)) {
                  message.channel.send('A duração deve ser uma variável de tempo válida.');
              }
              if (stated_duration_hours3 > 1) {
                  var time3 = 's';
              }
              if (time === 's') {
                  var actual_duration_hours = stated_duration_hours3 * 1000;
                  var time2 = 'second';
              }
              if (time === 'm') {
                  var actual_duration_hours = stated_duration_hours3 * 60000;
                  var time2 = 'minute';
              }
              if (time === 'h') {
                  var actual_duration_hours = stated_duration_hours3 * 3600000;
                  var time2 = 'hour';
              }
              if (time === 'd') {
                  var actual_duration_hours = stated_duration_hours3 * 86400000;
                  var time2 = 'day';
              }
              if (!isNaN(stated_duration_hours3)) {
                  const prize = message.content.split(' ').slice(2).join(' ');
                  if (prize === '') return message.channel.send('Você tem que entrar em um prêmio.');
                  if (stated_duration_hours3 !== '0') {
                      const embed = new Discord.MessageEmbed()
                      .setTitle(`${prize}`)
                      .setColor('36393F')
                      .setDescription(`Reagir com 😌 para entrar!\nDuração: **${stated_duration_hours3}** ${time2} \nCriador: ${message.author}`)
                      .setTimestamp(Date.now() + (actual_duration_hours))
                      .setFooter('Termina em')
                      let msg = await client.channels.cache.get(nomeconfig).send('🥶 **SORTEIO** 🥶', embed)
                      await msg.react('😌')
                      setTimeout(() => {
                          msg.reactions.cache.get('😌').users.remove(client.user.id)
                          setTimeout(() => {
                              let winner = msg.reactions.cache.get('😌').users.cache.random();
                              if (msg.reactions.cache.get('😌').users.cache.size < 1) {
                                  const winner_embed = new Discord.MessageEmbed()
                                  .setTitle(`${prize}`)
                                  .setColor('36393F')
                                  .setDescription(`Ninguém entrou no sorteio.\nCriador: ${message.author}`)
                                  .setTimestamp()
                                  .setFooter('Terminou')
                                  msg.edit('😎 **SORTEIO ACABOU** 😎', winner_embed);
                              }
                              if (!msg.reactions.cache.get('😌').users.cache.size < 1) {
                                  const winner_embed = new Discord.MessageEmbed()
                                  .setTitle(`${prize}`)
                                  .setColor('36393F')
                                  .setDescription(`Ganhador:\n${winner}\nCriador: ${message.author}`)
                                  .setTimestamp()
                                  .setFooter('Terminou')
                                  msg.edit('😎 **SORTEIO ACABOU** 😎', winner_embed);
                              }
                          }, 1000);
                      }, actual_duration_hours);
                  }
              }
          }
           }
            })
          
          })
      }
        giveaway();
    }
}