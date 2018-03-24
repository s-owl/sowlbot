const { RTMClient, WebClient } = require('@slack/client');
const monday = require('./src/monday');
const plugs = require('./src/plugs');

// An access token (from your Slack app or custom integration - usually xoxb)
// const token = process.env.SLACK_TOKEN;
const token = process.env.SLACK_TOKEN;
// The client is initialized and then started to get an active connection to the platform
const rtm = new RTMClient(token);
const web = new WebClient(token);

rtm.start();


rtm.on('message', (event) => {
  // For structure of `event`, see https://api.slack.com/events/message

  // Skip messages that are from a bot or my own user ID
  if ( (event.subtype && event.subtype === 'bot_event') ||
       (!event.subtype && event.user === rtm.activeUserId) ) {
    return;
  }
  monday.registerMondayNotify(web, event.channel);
  plugs.runPlugs(rtm, event.text, event.channel);
  // Log the event
  console.log(`(channel:${event.channel}) ${event.user} says: ${event.text}`);

});
