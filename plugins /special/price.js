exports.run = {
   usage: ['premium'],
   category: 'special',
   async: async (m, {
      client,
      isPrefix
   }) => {
      client.reply(m.chat, `🏷️ Upgrade to premium, contact *${isPrefix}owner*`, m)
   },
   error: false,
   cache: true,
   location: __filename
}