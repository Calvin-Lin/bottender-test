require('dotenv').config();

const B = require('bottender-compose');
const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/express');

const config = require('./bottender.config.js').messenger;

const bot = new MessengerBot({
  accessToken: config.accessToken,
  appSecret: config.appSecret,
  verifyToken: config.verifyToken,
});

bot.onEvent(
  B.condition([
    [
      B.isTextMatch(/優拓資訊/),
      B.series([
        B.sendText('www.yoctol.com'),
        B.sendImage('https://www.yoctol.com/images/case_yoctol.png'),
        B.sendButtonTemplate('這是按鈕範本', [
          { type: 'postback', title: '更多介紹', payload: 'MORE_INTRO' },
          { type: 'web_url', title: '優拓官網', url: 'https://www.yoctol.com' },
        ]),
      ]),
    ],
    [B.isPayloadMatch('MORE_INTRO'), B.sendText('下次再跟你說')],
    [
      context => true,
      B.random([B.sendText('Hello World'), B.sendText('Hi World')]),
    ],
  ])
);

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
