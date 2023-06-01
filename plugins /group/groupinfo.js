const moment = require('moment-timezone')
moment.tz.setDefault(global.timezone)
exports.run = {
   usage: ['groupinfo'],
   hidden: ['gcinfo'],
   category: 'group',
   async: async (m, {
      client,
      participants
   }) => {
      try {
         let setting = global.db.groups.find(v => v.jid == m.chat)
         let pic = await Func.fetchBuffer('./media/image/default.jpg')
         let meta = await (await client.groupMetadata(m.chat))
         let admin = await client.groupAdmin(m.chat)
         let member = participants.map(u => u.id)
         try {
            pic = await Func.fetchBuffer(await client.profilePictureUrl(m.chat, 'image'))
         } catch {} finally {
            let caption = `👥  *G R O U P - I N F O*\n\n`
            caption += `	◦  *Name* : ${meta.subject}\n`
            caption += `	◦  *Member* : ${member.length}\n`
            caption += `	◦  *Admin* : ${admin.length}\n`
            caption += `	◦  *Created* : ${moment(meta.creation * 1000).format('DD/MM/YY HH:mm:ss')}\n`
            caption += `	◦  *Owner* : ${meta.owner ? '@' + meta.owner.split('@')[0] : m.chat.match('-') ? '@' + m.chat.split('-')[0] : ''}\n\n`
            caption += `乂  *M O D E R A T I O N*\n\n`
            caption += `	◦  ${Func.switcher(setting.antidelete, '[ √ ]', '[ × ]')} Anti Delete\n`
            caption += `	◦  ${Func.switcher(setting.antilink, '[ √ ]', '[ × ]')} Anti Link\n`
            caption += `	◦  ${Func.switcher(setting.antivirtex, '[ √ ]', '[ × ]')} Anti Virtex\n`
            caption += `	◦  ${Func.switcher(setting.filter, '[ √ ]', '[ × ]')} Filter\n`
            caption += `	◦  ${Func.switcher(setting.game, '[ √ ]', '[ × ]')} Games\n`
            caption += `	◦  ${Func.switcher(setting.left, '[ √ ]', '[ × ]')} Left Message\n`
            caption += `	◦  ${Func.switcher(setting.localonly, '[ √ ]', '[ × ]')} Localonly\n`
            caption += `	◦  ${Func.switcher(setting.welcome, '[ √ ]', '[ × ]')} Welcome Message\n\n`
            caption += `乂  *G R O U P - S T A T U S*\n\n`
            caption += `	◦  *Muted* : ${Func.switcher(setting.mute, '√', '×')}\n`
            caption += `	◦  *Stay* : ${Func.switcher(setting.stay, '√', '×')}\n`
            caption += `	◦  *Expired* : ${setting.expired == 0 ? 'NOT SET' : Func.timeReverse(setting.expired - new Date * 1)}\n\n`
            caption += global.footer
            client.sendMessageModify(m.chat, caption, m, {
               largeThumb: true,
               thumbnail: pic,
            })
         }
      } catch (e) {
         console.log(e)
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   group: true,
   cache: true,
   location: __filename
}