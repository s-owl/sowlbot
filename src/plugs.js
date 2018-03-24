exports.runPlugs = (rtm, msg, channel)=>{
  require("./weather").run(rtm, msg, channel);
}
