const request = require('request');

exports.run = (rtm, msg, channel)=>{
  if(msg.startsWith("!도움말") ||
    msg.startsWith("!help") ||
    msg.startsWith("!帮助")){
      let helpStr = "아래와 같은 명령어를 사용하실 수 있습니다.\n"
      + "`!날씨 (장소 이름)` - 현재 정해진 장소의 날씨를 조회합니다. 예시 `!날씨 성공회대학교`\n"
      + "`!공기 (장소 이름)` - 현재 정해진 장소의 공기 질을 조회합니다. 예시 `!공기 온수역`";
      rtm.sendMessage(helpStr, channel)
      .then((res) => {
        // `res` contains information about the posted message
        console.log('Message sent: ', res.ts);
      })
      .catch(console.error);



  }
  return;

}
