exports.runPlugs = (rtm, msg, channel)=>{
  require("./weather").run(rtm, msg, channel);
  require("./aqicn").run(rtm, msg, channel);
  require("./help").run(rtm, msg, channel);
}
