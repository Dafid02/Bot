exports.run = {
   usage: ['owner'],
   category: 'special',
   async: async (m, {
      client
   }) => {
      client.sendContact(m.chat, [{
         name: global.owner_name,
         number: global.owner,
         about: '-'
      }], m, {
         org: '-',
         website: '-',
         email: '-'
      })
   },
   error: false,
   cache: true,
   location: __filename
}