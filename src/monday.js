const schedule = require('node-schedule');
let channels = [];
let itIsMonday = `월!월!월!월!월!:dog:월!월!월!월!월!:dog:월!월!월!월!월!:dog:월!월!월!월!월!:dog:월!월!월!월!월!:dog:월!월!월!월!월!:dog:월!월!월!월!월!:dog:월!월!월!월!월!:dog:월!월!월!월!월!:dog:월!월!월!월!월!:dog:월!월!월!월!월!:dog:월!월!월!월!월!:dog:월!월!월!월!월!:dog:월!월!월!월!월!:dog:월!월!월!월!월!:dog:월!월!월!월!월!:dog:월!월!월!월!월!:dog:월!월!월!월!월!:dog:월!월!월!월!월!:dog:월!월!월!월!월!:dog:\n
월!월월!!월월월!!!월월월월!!!!월월월월월!!!!!월월월월월월!!!!!!:dog:월!월월!!월월월!!!월월월월!!!!월월월월월!!!!!월월월월월월!!!!!!:dog:월!월월!!월월월!!!월월월월!!!!월월월월월!!!!!월월월월월월!!!!!!:dog:월!월월!!월월월!!!월월월월!!!!월월월월월!!!!!월월월월월월!!!!!!:dog:월!월월!!월월월!!!월월월월!!!!월월월월월!!!!!월월월월월월!!!!!!:dog:\n
월요일!월요일!월요일!:dog:월요일!월요일!월요일!:dog:월요일!월요일!월요일!:dog:월요일!월요일!월요일!:dog:월요일!월요일!월요일!:dog:월요일!월요일!월요일!:dog:월요일!월요일!월요일!:dog:월요일!월요일!월요일!:dog:월요일!월요일!월요일!:dog:월요일!월요일!월요일!:dog:월요일!월요일!월요일!:dog:월요일!월요일!월요일!:dog:월요일!월요일!월요일!:dog:월요일!월요일!월요일!:dog:월요일!월요일!월요일!:dog:월요일!월요일!월요일!:dog:월요일!월요일!`
exports.registerMondayNotify = (web, channel)=>{
  if(!channels.includes(channel)){
    console.log(`Registering monday notify event for ${channel}`);
    schedule.scheduleJob({hour: 0, minute: 0, dayOfWeek: 1}, ()=>{
      let msgObj = { channel: channel, text: itIsMonday,
                    username: "월요병에 걸려 월요일 마다 짖는 개",
                    as_user: false, icon_emoji:":dog:" }

      web.chat.postMessage(msgObj)
      .then((res) => {
        // `res` contains information about the posted message
        console.log('Message sent: ', res.ts);
      })
      .catch(console.error);
    });
    channels.push(channel);
  }

}
